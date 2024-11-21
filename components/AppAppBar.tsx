import * as React from 'react';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {AttachMoney} from "@mui/icons-material";
// import Sitemark from './SitemarkIcon';
import {Link} from 'react-router-dom';
import ThreeDRotation from '@mui/icons-material/ThreeDRotation';

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <AttachMoney />
            <ThreeDRotation />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button variant="text" color="info" size="small">
                <Link to="/exchange-rate">Currency Exchange Rate</Link>
              </Button>
              <Button variant="text" color="info" size="small">
                <Link to="/cryptocurrencies-historical-data">Historical data</Link>
              </Button>
              <Button variant="text" color="info" size="small" sx={{ minWidth: 0 }}>
                <Link to="/blog">Blog</Link>
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            <Button color="primary" variant="text" size="small">
              Sign in
            </Button>
            <Button color="primary" variant="contained" size="small">
              Sign up
            </Button>

          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <MenuItem>
                  <Button variant="text" color="info" size="small">
                    <Link to="/exchange-rate">Currency Exchange Rate</Link>
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button variant="text" color="info" size="small">
                    <Link to="/cryptocurrencies-historical-data">Historical data</Link>
                  </Button>
                </MenuItem>
                <Divider sx={{ my: 3 }} />
                {/*<MenuItem>*/}
                {/*  <Button color="primary" variant="contained" fullWidth>*/}
                {/*    Sign up*/}
                {/*  </Button>*/}
                {/*</MenuItem>*/}
                {/*<MenuItem>*/}
                {/*  <Button color="primary" variant="outlined" fullWidth>*/}
                {/*    Sign in*/}
                {/*  </Button>*/}
                {/*</MenuItem>*/}
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
