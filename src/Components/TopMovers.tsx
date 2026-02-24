
import {  Paper, Typography, Box, Avatar } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import type { Crypto } from '../types/crypto';
import Grid from '@mui/material/Grid'; 
interface TopMoversPropos{
    cryptos: Crypto[];
}
export const TopMovers: React.FC<TopMoversPropos> = ({cryptos}) =>{
    // Trier par variation 24h décroissante pour les gainers
    const topGainers = [...cryptos]
        .sort((a,b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
        .slice(0,3);


  // Trier par variation 24h croissante pour les losers
  const topLosers = [...cryptos]
        .sort((a,b)=> a.price_change_percentage_24h - b.price_change_percentage_24h)
        .slice(0,3);
 
 const CryptoMoverCard = ({
    crypto,
    type
 }:{
    crypto:Crypto;
    type: 'gainer' | 'loser'
 })=>{
    const isGainer = type === 'gainer';
    const color = isGainer ? '#4caf50' : '#f44336';
    const bgColor = isGainer ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)';

    return(
        <Box
        sx={{
                display:"flex",
                alignItems:"center",
                justifyContent: "space-between",
                p:2,
                borderRadius: 2,
                backgroundColor: bgColor,
                mb: 1.5,
            }}>
    <Box display="flex" alignItems="center" gap={1.5}>
        <Avatar
        src={crypto.image}
        alt={crypto.name}
        sx={{width:36, height:36}}
        />
        <Box>
            <Typography variant="body2" fontWeight="bold">
                {crypto.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
                {crypto.symbol.toUpperCase()}
            </Typography>
        </Box>
    </Box>
    <Box display="flex" alignItems="center" gap={0.5}>
        {isGainer ?(
            <TrendingUp sx={{fontSize:20, color}}/>
        ):(
            <TrendingDown sx={{fontSize:20, color}}/>
        )}
        <Typography variant="h6" fontWeight="bold" sx={{color}}>
            {isGainer ? '+': ''}
            {crypto.price_change_percentage_24h.toFixed(2)}%
        </Typography>
    </Box>
        </Box>
    );
 };
 return(
    <Grid container spacing={3}>
        {/* top Gainers */}
        <Grid  size={{xs:12, md:6}}>
            <Paper sx={{p:3}}>
                <Typography
                 variant="h6"
                 gutterBottom
                 fontWeight="bold"
                 sx={{display:"flex", alignItems:"center", gap:1}}>
                    <TrendingUp sx={{color:'#4caf50'}}/>
                    Top Gainers 24h
                 </Typography>
                 <Box mt={2}>
                    {topGainers.map((crypto)=>(
                        <CryptoMoverCard
                        key={crypto.id}
                        crypto={crypto}
                        type="gainer"
                        />
                    ))}
                 </Box>
            </Paper>
        </Grid>
        {/* Top losers */}
        <Grid  size={{xs:12 ,md:6}}>
            <Paper sx={{p:3}}>
                <Typography
                variant="h6"
                gutterBottom
                fontWeight="bold"
                sx={{display: "flex", alignItems:"center",gap: 1}}>
                    <TrendingDown sx={{color:'#f44336'}}/>
                    Top Losers 24h
                </Typography>
                <Box mt={2}>
                    {topLosers.map((crypto)=>(
                        <CryptoMoverCard
                        key={crypto.id}
                        crypto={crypto}
                        type="loser"/>
                    ))}
                </Box>
            </Paper>
        </Grid>
    </Grid>
 )
}