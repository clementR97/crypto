 import { useState } from 'react'
 import {
  Container,
  Typography,
  Box,
  AppBar,
  Toolbar,
  Button,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
} from '@mui/material';
import { Refresh, TrendingUp } from '@mui/icons-material';
import { useCryptos } from './hooks/useCryptos';
import { CryptoList } from './Components/CryptoList.tsx';
import { MarketCapChart } from './Components/MarketCapChart.tsx';
import { TopMovers } from './Components/TopMovers.tsx';


function App() {
  const {cryptos, loading, error, refresh} = useCryptos(true);
  const [tabValue, setTabValue]= useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number)=>{
    setTabValue(newValue);
  };

  return (
    <>
      {/* Header */}
      <AppBar position="static" sx={{background:'linear-gradient(135deg, #61a5c2 0%, #ffd60a 100%)'}}>
        <Toolbar>
          <TrendingUp sx={{mr:1, fontSize:28}}/>
          <Typography variant="h5" component="div" sx={{flexGrow:1, fontWeight:"bold"}}>
            Crypto Dashboard
          </Typography>
          <Button
          color="inherit"
          startIcon={<Refresh/>}
          onClick={refresh}
          disabled={loading}>
            Actualiser
          </Button>
        </Toolbar>
      </AppBar>
      {/* contenue principal */}
      <Container maxWidth="xl" sx={{mt:4, mb:4}}>
        {/* title and description */}
        <Box mb={4} textAlign="center">
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Marché des Cryptomonnaies
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Prix en temps réel et statiques des principales cryptomonnaies
          </Typography>
        </Box>
        {/* Error */}
        {error && (
          <Alert severity="error" sx={{mb:3}} onClose={()=>window.location.reload()}>
            {error}
          </Alert>
        )}
        {/* loading */}
        {loading && cryptos.length === 0 ?(
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
            <CircularProgress size={60}/>
          </Box>
        ):(
          <>
          {/* top Movers */}
          <TopMovers cryptos={cryptos}/>
          {/* Onglets */}
          <Box sx={{mt:4, mb:2}}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="📊 Graphique Market Cap"/>
              <Tab label="📋 Liste complète"/>
            </Tabs>
          </Box>
          {/* contenus of onglets */}
          {tabValue === 0 ?(
            <MarketCapChart cryptos={cryptos} topN={10}/>
          ):(
            <CryptoList cryptos={cryptos}/>
          )}
          </>
        )}
        {/* Footer */}
        <Box mt={6} textAlign="center">
          <Typography variant="body2" color='text.secondary'>
          Données fournies par CoinGecko API • Actualisation automatique toutes les 60 secondes
          </Typography>
          <Typography variant="caption" color="text.secondary">
          Développé avec React + TypeScript + Material-UI + Chart.js
          </Typography>
        </Box>
      </Container>
    </>
  );
}

export default App
