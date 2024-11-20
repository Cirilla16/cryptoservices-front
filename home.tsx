// import {useState} from "react";
// import viteLogo from "../public/vite.svg";
// import reactLogo from "./assets/react.svg";
// import Button from '@mui/material/Button';
import {Link, Typography} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import AppAppBar from "./components/AppAppBar.tsx";
// import Container from "@mui/material/Container";
import {Outlet} from "react-router-dom";
function Copyright() {
    return (
        <Typography
            variant="body2"
            align="center"

        >
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}.
        </Typography>
    );
}
function Home() {
    // const [count, setCount] = useState<number>(0)

    return (
        <div >
            <CssBaseline enableColorScheme/>
            <AppAppBar/>
            <Outlet/>
            <Copyright/>
        </div>
    )
}

export default Home