import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppAppBar from '../components/AppAppBar.tsx';
import MainContent from '../components/MainContent.tsx';
import Latest from '../components/Latest.tsx';
import Footer from '../components/Footer.tsx';

export default function Blog() {
    return (
        <>
            <CssBaseline enableColorScheme/>
            <AppAppBar/>
            <Container
                maxWidth="lg"
                component="main"
                sx={{display: 'flex', flexDirection: 'column', my: 16, gap: 4}}
            >
                <MainContent/>
                <Latest/>
            </Container>
            <Footer/>
        </>
    );
}
