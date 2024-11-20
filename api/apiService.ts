import axios from "axios";
import {Dayjs} from "dayjs";

// const host ="host.docker.internal"
const host =""
const BASE_URL = `${host}/api`;
const module_prefix = `${BASE_URL}/crypto-currencies`;

axios.interceptors.request.use(config => {
    console.log(`Actual Request URL: ${config.baseURL || ''}${config.url}`);
    return config;
}, error => {
    return Promise.reject(error);
});

interface CurrencySymbolResponse {
    ["currency code"]: string;
    ["currency name"]: string;
}
export const fetchPhysicalCurrencies = async ():  Promise<{ code: string; name: string }[]> => {
    try {
        const response = await axios.get(`${module_prefix}/query_physical_currencies`);
        console.log(response.data);
        return response.data.data.map((item: CurrencySymbolResponse) => ({
            code: item["currency code"],
            name: item["currency name"],
        }));
    } catch (error) {
        console.error("Error fetching physical currencies:", error);
        throw new Error("Failed to fetch physical currencies.");
    }
};

// Function to fetch digital currencies
export const fetchDigitalCurrencies = async ():  Promise<{ code: string; name: string }[]> => {
    try {
        const response = await axios.get(`${module_prefix}/query_digital_currencies`);
        return response.data.data.map((item: CurrencySymbolResponse) => ({
            code: item["currency code"],
            name: item["currency name"],
        }));
    } catch (error) {
        console.error("Error fetching digital currencies:", error);
        throw new Error("Failed to fetch digital currencies.");
    }
};
export const fetchExchangeRate = async (
    fromCurrency: string,
    toCurrency: string
): Promise<number> => {
    try {
        const response = await axios.get(`${module_prefix}/exchange-rate/query`, {
            params: {
                from_currency: fromCurrency,
                to_currency: toCurrency,
            },
        });
        console.log(response.data);
        const rate = parseFloat(
            response.data.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]
        );

        if (isNaN(rate)) {
            throw new Error("Invalid exchange rate received from API.");
        }
        return rate;
    } catch (error) {
        console.error("Error fetching exchange rate:", error);
        throw new Error("Failed to fetch exchange rate. Please try again.");
    }
};

interface DailyCryptoDataResponse {
    err_code: number;
    message: string;
    total: number | null;
    data:Record<string, { [key: string]: string }>;
}
export const getCryptocurrencyData = async (
    timeSpan: string,
    fromSymbol: string,
    toSymbol: string,
    startDate: Dayjs,
    endDate: Dayjs
): Promise<Record<string, { [key: string]: string }>> => {
    try {
        // Convert Date objects to ISO strings
        const startDateString = startDate.format("YYYY-MM-DD");
        const endDateString = endDate.format("YYYY-MM-DD");
        let path=`${module_prefix}/fx-daily`
        if (timeSpan === "day") {
            path = `${module_prefix}/fx-daily`
        }else if (timeSpan === "week") {
            path = `${module_prefix}/fx-weekly`
        }else if (timeSpan === "month") {
            path = `${module_prefix}/fx-monthly`
        }
        const response = await axios.get<DailyCryptoDataResponse>(path, {
            params: {
                from_symbol: fromSymbol,
                to_symbol: toSymbol,
                start_date: startDateString,
                end_date: endDateString,
            },
        });
        console.log(response.data)
        // Check for API errors
        if (response.data.err_code !== 0) {
            throw new Error(
                `API Error: ${response.data.message} (err_code: ${response.data.err_code})`
            );
        }

        // Return the `data` object containing the time series
        return response.data.data;
    } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
        throw error; // Re-throw the error for further handling
    }
};

