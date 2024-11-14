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
        <div style={{width:"100%"}}>
            <CssBaseline enableColorScheme/>

            Store. Gift magic this holiday.

            Need shopping help?
            Ask a Specialist (Opens in a new window)
            Visit an Apple Store
            Find one near youVisit an Apple Store(opens in a new window)

            Mac

            iPhone

            iPad

            Apple Watch

            Apple Vision Pro

            AirPods

            AirTag

            Apple TV 4K

            HomePod

            Accessories

            Apple Gift Card

            <AppAppBar />
            <div style={{width:"100%"}}>
                <Outlet/>
            </div>

            <Copyright/>
        </div>
    )
}

export default Home