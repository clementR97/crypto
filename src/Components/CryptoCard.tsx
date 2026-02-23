import {Card, CardContent, Typography, Box, Avatar} from '@mui/material';
import {TrendingUp, TrendingDown} from '@mui/icons-material';
import type {Crypto} from '../types/crypto.tsx';

interface CryptoCardProps{
    crypto: Crypto;
    onClick?: ()=> void
};

export const CryptoCard: React.FC<CryptoCardProps> = ({crypto, onClick})=>{
    const isPositive = crypto.price_change_percentage_24h >= 0;
    const changeColor = isPositive ? '#4caf50' : '#f44336';

    return (
        <Card sx= {{ cursor: onClick ? 'pointer' : 'default',
            '&:hover':onClick ? {
                boxShadow: 6,
                transform: 'translateY(-4px)',
                transition: 'all 0.3s'
            } : {}
        }}
        onClick={onClick}
        >
            <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    {/* img + name */}
                    <Box display="flex" alignItems="center" gap={2}>
                        <Avatar 
                        src={crypto.image}
                        alt={crypto.name}
                        sx={{width:40, height:40}}
                        />
                        <Box>
                            <Typography variant="h6" fontWeight="bold">
                                {crypto.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {crypto.symbol.toUpperCase()}
                            </Typography>
                        </Box>
                    </Box>

                    {/* price + variation */}
                    <Box textAlign="right">
                        <Typography variant="h6" fontWeight="bold">
                            {crypto.current_price.toLocaleString('fr-FR',{
                                style: 'currency',
                                currency: 'EUR',
                            })}
                        </Typography>
                        <Box display="flex" alignItems="center" justifyContent="flex-end" gap={0.5}>
                            {isPositive? (
                                <TrendingUp sx={{fontSize: 16, color: changeColor}}/>
                            ):(
                            <TrendingDown sx={{fontSize: 16, color: changeColor}}/>
                            )}
                            <Typography
                            variant="body2"
                            sx={{color: changeColor, fontWeight:"bold"}}>
                                {isPositive? '+' : ''}
                                {crypto.price_change_percentage_24h.toFixed(2)}%
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                {/* Market Cap */}
                <Box mt={2} display="flex" justifyContent="space-between">
                    <Typography variant="caption" color="text.secondary">
                        Market Cap
                    </Typography>
                    <Typography variant="caption" fontWeight="bold">
                        {(crypto.market_cap / 1_000_000_000).toFixed(2)}B €
                    </Typography>
                </Box>
                {/* volume 24h */}
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="caption" color="text.secondary">
                            Volume 24h
                    </Typography>
                    <Typography variant="caption" fontWeight="bold">
                        {(crypto.total_volum / 1_000_000).toFixed(0)}M €
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};