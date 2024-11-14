import {Routes, Route} from "react-router-dom";
import Home from "./home.tsx";
import CurrencyExchange from "./pages/CurrencyExchange.tsx";
import LineGraph from "./pages/LineGraph.tsx";
import Blog from "./Blog.tsx";

function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} >
                <Route path="/exchange-rate" element={<CurrencyExchange  />} />
                <Route path="/crypto-data" element={<LineGraph />} />
                <Route path="*" element={<Blog />} />
            </Route>
        </Routes>
    );
}

export default Router;