import {Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Box,
    Typography,
    Chip,
  } from '@mui/material';
  import { TrendingUp, TrendingDown } from '@mui/icons-material';
  import type { Crypto } from '../types/crypto';

  interface CryptoListProps{
    cryptos: Crypto[];
    onCryptoClick?: (crypto:Crypto)=> void;
  }

  export const CryptoList: React.FC<CryptoListProps> = ({cryptos, onCryptoClick}) =>{
    const formatPrice = (price:number)=>{
        return price.toLocaleString('fr-FR',{
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits:2,
            maximumFractionDigits: price <1 ? 6: 2,
        });
    };
    const formatLargeNumber = (num: number)=>{
        if(num >= 1_000_000_000){
            return `${(num / 1_000_000_000).toFixed(2)}B €`;
        }
        if(num >= 1_000_000){
            return `${(num / 1_000_000).toFixed(2)}B €`;
        }
        return `${num.toLocaleString('fr-FR')} €`;
    };
    return(
        <TableContainer component={Paper} sx={{mt:5}}>
            <Table>
                <TableHead>
                    <TableRow sx={{backgroundColor: '#f5f5f5'}}>
                        <TableCell sx={{fontWeight:"bold"}}>#</TableCell>
                        <TableCell sx={{fontWeight:"bold"}}>Nom</TableCell>
                        <TableCell sx={{fontWeight:"bold"}} align="right">Prix</TableCell>
                        <TableCell sx={{fontWeight:"bold"}} align="right">24h %</TableCell>
                        <TableCell sx={{fontWeight:"bold"}} align="right">Market Cap</TableCell>
                        <TableCell sx={{fontWeight:"bold"}} align="right">Volume 24h</TableCell>
                    </TableRow>    
                </TableHead>
                <TableBody>
                    {cryptos.map((crypto)=>{
                        const isPositive = crypto.price_change_percentage_24h >= 0;
                        const changeColor = isPositive ? '#4caf50' : '#f44336';
                        return(
                            <TableRow
                            key={crypto.id}
                            hover
                            sx={{
                                cursor: onCryptoClick ? 'pointer' : 'default',
                                '&:hover': {backgroundColor: '#fafafa'}
                            }}
                            onClick={() => onCryptoClick?.(crypto)}>
                                {/* Rang */}
                                <TableCell>
                                    <Typography variant="body2" fontWeight="bold">
                                        {crypto.markert_cap_rank}
                                    </Typography>
                                </TableCell>

                                {/* Img + Name+ Symbole */}
                                <TableCell>
                                    <Box display="flex" alignItems="center" gap={1.5}>
                                        <Avatar
                                        src={crypto.image}
                                        alt={crypto.name}
                                        sx={{width: 32, height: 32}}
                                        />
                                        <Box>
                                            <Typography variant="body2" fontWeight="bold">
                                                {crypto.name}
                                            </Typography>
                                            <Typography variant="caption" color= "text.secondary">
                                                {crypto.symbol.toUpperCase()}
                                            </Typography>
                                        </Box>
                                    </Box>

                                </TableCell>
                                {/* price */}
                                <TableCell align="right">
                                    <Typography variant="body2" fontWeight="bold">
                                        {formatPrice(crypto.current_price)}
                                    </Typography>
                                </TableCell>
                                {/* variation 24h */}
                                <TableCell align="right">
                                    <Chip
                                    icon={isPositive ? <TrendingUp/> : <TrendingDown/>}
                                    label={`${isPositive ? '+' : ''}${crypto.price_change_percentage_24h.toFixed(2)}%`}
                                    size="small"
                                    sx={{
                                        backgroundColor: isPositive ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                                        color: changeColor,
                                        fontWeight: "bold",
                                    }}
                                    />
                                </TableCell>
                                {/* Market Cap */}
                                <TableCell align="right">
                                    <Typography variant="body2">
                                        {formatLargeNumber(crypto.market_cap)}
                                    </Typography>
                                </TableCell>
                                {/* Volume 24h */}
                                <TableCell align="right">
                                    <Typography variant="body2" color="text.secondary">
                                        {formatLargeNumber(crypto.total_volum)}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
  };