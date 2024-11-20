import React, {useEffect, useState} from "react";
import ReactECharts from "echarts-for-react";
import {Box, Select, MenuItem, Typography, Paper, FormControl, InputLabel, CircularProgress} from "@mui/material";
import {getCryptocurrencyData} from "../api/apiService.ts";
import {Dayjs} from "dayjs";



interface CurrencyLineGraphProps {
    time_span:string
    from_currency: string,
    to_currency: string,
    start_date: Dayjs | null,
    end_date: Dayjs | null
}
const CurrencyLineGraph: React.FC<CurrencyLineGraphProps> = ({time_span,from_currency,to_currency,start_date,end_date}) => {
    const [data, setData] = useState<Record<string, { [key: string]: string }>|null>(null);
    const [priceType, setPriceType] = useState<string>("close");

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                if(start_date && end_date){
                    const result = await getCryptocurrencyData(time_span,from_currency, to_currency, start_date, end_date);
                    setData(result);
                }

            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [time_span, from_currency, to_currency, start_date, end_date]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Typography variant="h6" color="error">
                {error}
            </Typography>
        );
    }
    if (!data) {
        return (
            <Typography variant="h6">
                No data available.
            </Typography>
        );
    }

    // Extract data
    const timeSeries = data;
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
            text: `Daily Prices of ${from_currency} to ${to_currency}`,
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
        <Paper elevation={3} sx={{padding: 30}}>


            <Typography variant="h5" gutterBottom>
                {from_currency}-{to_currency} Price Chart
            </Typography>
            <Box>
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
                <div style={{width: "100vw"}}></div>
                <ReactECharts key={priceType} option={options}/>
            </Box>
        </Paper>
    );
};

export default CurrencyLineGraph;
