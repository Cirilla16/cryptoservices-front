import React, {useState} from "react";
import dayjs, {Dayjs} from 'dayjs';
import {Typography, Paper, Select, SelectChangeEvent} from "@mui/material";
import {crypto_daily_data} from "../api/fake_data.ts";
import CurrencySelection from "../components/CurrencySelection.tsx";
import CurrencyLineGraph from "../components/CurrencyLineGraph.tsx";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
interface DigitalCurrencyData {
    "Meta Data": Record<string, string>;
    "Time Series (Digital Currency Daily)": Record<string, { [key: string]: string }>;
}

const data: DigitalCurrencyData = crypto_daily_data

const LineGraph: React.FC = () => {
    const [digitalCurrency, setDigitalCurrency] = useState<string>("EUR");
    const [physicalCurrencies, setPhysicalCurrencies] = useState<string>("USD");
    const [startDate, setStartDate] = React.useState<Dayjs | null>(dayjs('2024-01-01'));
    const [endDate, setEndDate] = React.useState<Dayjs | null>(dayjs('2024-12-31'));
    const [timeSpan, setTimeSpan] = useState<string>("day");
    const timeSpanOptions = [
        {value: "day", label: "day"},
        {value: "week", label: "week"},
        {value: "month", label: "month"},
    ];
    const handleDigitalCurrencySelect = (selectedCurrency: string) => {
        setDigitalCurrency(selectedCurrency)
    };
    const handlePhysicalCurrencySelect = (selectedCurrency: string) => {
        setPhysicalCurrencies(selectedCurrency)
    };

    return (
        <Paper elevation={3} sx={{padding: 30}}>
            <div style={{width: "100vw"}}>

            </div>
            <Typography variant="h5" gutterBottom>
                {data["Meta Data"]["3. Digital Currency Name"]} Price Chart
            </Typography>
            <Select
                labelId="Time Span"
                id="select"
                value={timeSpan}
                onChange={(event: SelectChangeEvent)  => setTimeSpan(event.target.value as string)}
                fullWidth
            >
                {timeSpanOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
            <CurrencySelection currency_type={0} onCurrencySelect={handleDigitalCurrencySelect}/>
            <CurrencySelection currency_type={1} onCurrencySelect={handlePhysicalCurrencySelect}/>
            <Divider  />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                />
                <DatePicker
                    label="End Date"
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)}
                />
            </LocalizationProvider>
            <CurrencyLineGraph time_span={timeSpan} from_currency={digitalCurrency} to_currency={physicalCurrencies} start_date={startDate} end_date={endDate}/>
        </Paper>
    );
};

export default LineGraph;
