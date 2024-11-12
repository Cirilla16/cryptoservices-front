import axios from "axios";

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

