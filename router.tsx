import {Routes, Route} from "react-router-dom";
import Home from "./home.tsx";
import Blog from "./Blog.tsx";
import CurrencyExchange from "./currencyConverter.tsx";

function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} >
                <Route path="/exchange-rate" element={<CurrencyExchange  />} />
                <Route path="/crypto-data" element={<Blog />} />
            </Route>
        </Routes>
    );
}

export default Router;