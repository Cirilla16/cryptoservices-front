import React, {useEffect, useState} from "react";
import {fetchDigitalCurrencies, fetchPhysicalCurrencies} from "../api/apiService.ts";
import {Autocomplete, Box, TextField, Typography} from "@mui/material";

interface CurrencySelectionProps {
  currency_type: number; // 0 digital,1 physical, 2 all
    default_value:string;
  onCurrencySelect: (selectedCurrency: string) => void;
}
const CurrencySelection:React.FC<CurrencySelectionProps> = ({currency_type,default_value,onCurrencySelect }) => {
  const [selectedCurrency, setSelectedCurrency] = useState<string>("");
  const [physicalCurrencies, setPhysicalCurrencies] = useState<
      { code: string; name: string }[]
  >([]);
  const [digitalCurrencies, setDigitalCurrencies] = useState<
      { code: string; name: string }[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        if(currency_type === 0){
            const digital = await fetchDigitalCurrencies();
            setDigitalCurrencies(digital);
        }
        else if(currency_type === 1){
            const physical = await fetchPhysicalCurrencies();
            setPhysicalCurrencies(physical);
        }
        else{
            const physical = await fetchPhysicalCurrencies();
            const digital = await fetchDigitalCurrencies();
            setPhysicalCurrencies(physical);
            setDigitalCurrencies(digital);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "Failed to load currencies.");
        } else {
          setError("An unknown error occurred.");
        }
      }
    };

    fetchCurrencies();
  }, [currency_type]);
  const allCurrencies = [...physicalCurrencies, ...digitalCurrencies];
  const label:string=currency_type === 0 ? "Digital Currency" : currency_type === 1 ? "Physical Currency" : "Currency"
  const handleCurrencyChange = (_:React.SyntheticEvent, newValue: { code: string; name: string } | null) => {
    const selectedCode = newValue ? newValue.code : "";
    setSelectedCurrency(selectedCode);
    onCurrencySelect(selectedCode); // Call the parent handler
  };
  console.log(label)
  return (

        <Box display="flex" flexDirection="column" gap={2}>
          <Autocomplete
              options={allCurrencies}
              getOptionLabel={(option) => `${option.code} - ${option.name}`}
              value={
                  allCurrencies.find((currency) => currency.code === selectedCurrency) ||
                  null
              }
              onChange={handleCurrencyChange}
              renderInput={(params) => (
                  <TextField
                      {...params}
                      label={default_value}
                      fullWidth
                  />
              )}
          />

          {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
          )}
        </Box>
  );
};
export default CurrencySelection;