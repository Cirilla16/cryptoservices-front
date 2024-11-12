
import RootRouter from "./router.tsx"
import './App.css'
import {BrowserRouter} from "react-router-dom";

function App() {

    return (
        <BrowserRouter>
            <RootRouter/>
        </BrowserRouter>
    )

}

export default App
