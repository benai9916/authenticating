import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import VpnLockIcon from '@mui/icons-material/VpnLock';

function Header() {
  const navigate = useNavigate()
  const logout = () => {
    localStorage.clear('isValid')
    navigate('/signin')
  }
  return (
    <Box sx={{ display: 'flex', padding: '0 40px', height: 64 }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Box>
            <VpnLockIcon />
          </Box>
          <Box sx={{ mr: 'auto', width: '100%', justifyContent: 'flex-end', display: 'flex' }}>
            <Box paddingLeft={2}>
              <a style={{textDecoration: 'none', color: 'white'}} href="/dashboard">Dashboard</a>
            </Box>
            <Box paddingLeft={3}>
              <a style={{textDecoration: 'none', color: 'white'}} href="/reservation">Reservation</a>
            </Box>
            <Box paddingLeft={3} onClick={logout} sx={{cursor: 'pointer'}}>
              <PowerSettingsNewIcon />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

export default Header