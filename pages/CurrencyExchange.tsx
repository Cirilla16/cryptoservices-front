import React, { useState, useEffect } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    CircularProgress,
    Autocomplete,
} from "@mui/material";
import {
    fetchExchangeRate,
    fetchPhysicalCurrencies,
    fetchDigitalCurrencies,
} from "../api/apiService.ts";

const CurrencyExchange: React.FC = () => {
    const [amount, setAmount] = useState<number>(1);
    const [sourceCurrency, setSourceCurrency] = useState<string>("");
    const [targetCurrency, setTargetCurrency] = useState<string>("");
    const [physicalCurrencies, setPhysicalCurrencies] = useState<
        { code: string; name: string }[]
    >([]);
    const [digitalCurrencies, setDigitalCurrencies] = useState<
        { code: string; name: string }[]
    >([]);
    const [convertedAmount, setConvertedAmount] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch available currencies on component mount
    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const physical = await fetchPhysicalCurrencies();
                const digital = await fetchDigitalCurrencies();
                setPhysicalCurrencies(physical);
                setDigitalCurrencies(digital);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message || "Failed to load currencies.");
                } else {
                    setError("An unknown error occurred.");
                }
            }
        };

        fetchCurrencies();
    }, []);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(e.target.value));
    };

    const handleConvert = async () => {
        try {
            setLoading(true);
            setError(null);

            const rate = await fetchExchangeRate(sourceCurrency, targetCurrency);
            setConvertedAmount((amount * rate).toFixed(2));
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

    const allCurrencies = [...physicalCurrencies, ...digitalCurrencies];

    return (
        <Paper elevation={3} sx={{ padding: 3, maxWidth: 400, margin: "auto" }}>
            <Typography variant="h5" gutterBottom>
                Currency Exchange
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                    label="Amount"
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    fullWidth
                />
                <Autocomplete
                    options={allCurrencies}
                    getOptionLabel={(option) => `${option.code} - ${option.name}`}
                    value={
                        allCurrencies.find((currency) => currency.code === sourceCurrency) ||
                        null
                    }
                    onChange={(_, newValue) =>
                        setSourceCurrency(newValue ? newValue.code : "")
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="From"
                            fullWidth
                        />
                    )}
                />
                <Autocomplete
                    options={allCurrencies}
                    getOptionLabel={(option) => `${option.code} - ${option.name}`}
                    value={
                        allCurrencies.find((currency) => currency.code === targetCurrency) ||
                        null
                    }
                    onChange={(_, newValue) =>
                        setTargetCurrency(newValue ? newValue.code : "")
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="To"
                            fullWidth
                        />
                    )}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleConvert}
                    disabled={loading || !sourceCurrency || !targetCurrency}
                >
                    {loading ? <CircularProgress size={24} /> : "Convert"}
                </Button>
                {error && (
                    <Typography color="error" variant="body2">
                        {error}
                    </Typography>
                )}
                {convertedAmount && (
                    <Typography variant="h6">
                        Converted Amount: {convertedAmount} {targetCurrency}
                    </Typography>
                )}
            </Box>
        </Paper>
    );
};

export default CurrencyExchange;
