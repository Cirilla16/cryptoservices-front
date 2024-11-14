import React, { useState } from "react";
import ReactECharts from "echarts-for-react";
import { Box, Select, MenuItem, Typography, Paper, FormControl, InputLabel } from "@mui/material";
import {crypto_daily_data} from "../api/fake_data.ts";
interface DigitalCurrencyData {
    "Meta Data": Record<string, string>;
    "Time Series (Digital Currency Daily)": Record<string, { [key: string]: string }>;
}

const data: DigitalCurrencyData = crypto_daily_data

const LineGraph: React.FC = () => {
    // State to manage selected price type
    const [priceType, setPriceType] = useState<string>("close");

    // Extract data
    const timeSeries = data["Time Series (Digital Currency Daily)"];
    const dates = Object.keys(timeSeries).reverse(); // Reverse for chronological order

    // Extract prices for all types
    const priceTypes = ["1. open", "2. high", "3. low", "4. close"];
    const series = priceTypes.map((type) => ({
        name: type.replace(/[0-9]+\. /, ""), // Format name (e.g., "open", "high")
        data: dates.map((date) => parseFloat(timeSeries[date][type])),
        type: "line",
        smooth: true,
        lineStyle: { width: 2 },
    }));

    // Filter series based on selected priceType
    const filteredSeries =
        priceType === "all"
            ? series
            : series.filter((s) => s.name.toLowerCase() === priceType);
    console.log(filteredSeries)
    // ECharts configuration
    const options = {
        title: {
            text: `Daily Prices of ${data["Meta Data"]["3. Digital Currency Name"]}`,
            left: "center",
        },
        tooltip: {
            trigger: "axis",
        },
        legend: {
            data: priceType === "all" ? priceTypes.map((type) => type.replace(/[0-9]+\. /, "")) : [priceType],
            top: "10%",
        },
        xAxis: {
            type: "category",
            data: dates,
            name: "Date",
            nameLocation: "middle",
            nameGap: 25,
        },
        yAxis: {
            type: "value",
            name: "Price (EUR)",
            nameLocation: "middle",
            nameGap: 50,
        },
        series: filteredSeries,
        toolbox: {
            feature: {
                saveAsImage: {},
                dataZoom: {},
            },
        },
    };

    return (
        <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h5" gutterBottom>
                {data["Meta Data"]["3. Digital Currency Name"]} Price Chart
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
                <FormControl fullWidth>
                    <InputLabel id="price-type-label">Price Type</InputLabel>
                    <Select
                        labelId="price-type-label"
                        value={priceType}
                        onChange={(e) => setPriceType(e.target.value)}
                    >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="open">Open</MenuItem>
                        <MenuItem value="high">High</MenuItem>
                        <MenuItem value="low">Low</MenuItem>
                        <MenuItem value="close">Close</MenuItem>
                    </Select>
                </FormControl>
                <ReactECharts key={priceType} option={options} style={{ height: "400px", width: "100%" }} />
            </Box>
        </Paper>
    );
};

export default LineGraph;
