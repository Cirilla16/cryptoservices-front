import {Routes, Route} from "react-router-dom";
import Home from "./pages/home.tsx";
import CurrencyExchange from "./pages/CurrencyExchange.tsx";
import LineGraph from "./pages/LineGraph.tsx";
// import Blog from "./pages/Blog.tsx";
import Simple from "./pages/Simple.tsx";

function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} >
                <Route path="/" element={<CurrencyExchange  />} />
                <Route path="/exchange-rate" element={<CurrencyExchange  />} />
                <Route path="/cryptocurrencies-historical-data" element={<LineGraph />} />
                <Route path="*" element={<CurrencyExchange />} />
            </Route>
            <Route path="/s" element={<Simple />} />
        </Routes>
    );
}

export default Router;