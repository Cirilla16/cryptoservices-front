import {Routes, Route} from "react-router-dom";
import Home from "./pages/home.tsx";
import CurrencyExchange from "./pages/CurrencyExchange.tsx";
import LineGraph from "./pages/LineGraph.tsx";

function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} >
                <Route path="/" element={<CurrencyExchange  />} />
                <Route path="/exchange-rate" element={<CurrencyExchange  />} />
                <Route path="/cryptocurrencies-historical-data" element={<LineGraph />} />
                <Route path="*" element={<CurrencyExchange />} />
            </Route>
        </Routes>
    );
}

export default Router;