import ReactECharts from "echarts-for-react";
import {crypto_daily_data} from "../api/fake_data.ts";

interface DigitalCurrencyData {
    "Meta Data": Record<string, string>;
    "Time Series (Digital Currency Daily)": Record<string, { [key: string]: string }>;
}

const Simple = () => {
    const data: DigitalCurrencyData = crypto_daily_data
    // Extract data
    const timeSeries = data["Time Series (Digital Currency Daily)"];
    const dates = Object.keys(timeSeries).reverse(); // Reverse for chronological order

    // Extract prices for all types
    const priceTypes = ["1. open", "2. high", "3. low", "4. close"];
    const priceType: string = "open"
    const series = priceTypes.map((type) => ({
        name: type.replace(/[0-9]+\. /, ""), // Format name (e.g., "open", "high")
        data: dates.map((date) => parseFloat(timeSeries[date][type])),
        type: "line",
        smooth: true,
        lineStyle: {width: 2},
    }));
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
        series: series,
        toolbox: {
            feature: {
                saveAsImage: {},
                dataZoom: {},
            },
        },
    };
    return (
        <div>

            <div style={{width: "100vw"}}></div>
            <ReactECharts option={options} style={{width: "inherit"}}/>
        </div>
    );
};
export default Simple;