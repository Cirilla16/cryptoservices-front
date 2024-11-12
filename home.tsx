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
        <>
            <CssBaseline enableColorScheme/>
            <AppAppBar/>
            <Outlet/>
            {/*<Container*/}
            {/*    maxWidth="lg"*/}
            {/*    component="main"*/}
            {/*    sx={{display: 'flex', flexDirection: 'column', my: 16, gap: 4}}*/}
            {/*>*/}
            {/*    <div>*/}
            {/*        <a href="https://vite.dev" target="_blank">*/}
            {/*            <img src={viteLogo} className="logo" alt="Vite logo"/>*/}
            {/*        </a>*/}
            {/*        <a href="https://react.dev" target="_blank">*/}
            {/*            <img src={reactLogo} className="logo react" alt="React logo"/>*/}
            {/*        </a>*/}
            {/*    </div>*/}
            {/*    <h1>Vite + React</h1>*/}
            {/*    <div className="card">*/}
            {/*        <Button variant="contained" onClick={() => setCount((count) => count + 1)}>count is {count}</Button>;*/}
            {/*        <p>*/}
            {/*            Edit <code>src/App.tsx</code> and save to test HMR*/}
            {/*        </p>*/}
            {/*    </div>*/}
            {/*    <p className="read-the-docs">*/}
            {/*        Click on the Vite and React logos to learn more*/}
            {/*    </p>*/}
                <Copyright/>
            {/*</Container>*/}
            {/*<Footer/>*/}

        </>
    )
}

export default Home