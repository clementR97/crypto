import axios from 'axios';
import type { Crypto, CryptoDetails, MarketChartData, cryptoApiParams } from '../types/crypto';

const API_BASE_URL = 'https://api.coingecko.com/api/v3';

// base config with axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});

export const cryptoApi = {
    /**
     * Receie the liste of cryptos with datas of market
     * @param params settings of request (devise, nb page,..etc)
     * @returns Promise<Crypto[]>
     */
    getMarketData: async (params: cryptoApiParams = {}): Promise<Crypto[]> => {
        const defaultParams: cryptoApiParams = {
            vs_currency: 'eur',
            order: 'market_cap_desc',
            per_page: 50,
            page: 1,
            sparkline: false,
            price_change_percentage: '24h',
        };
        try{
            const { data } = await api.get<Crypto[]>('/coins/markets',{
                params: {...defaultParams, ...params},
            });
            return data;
        }catch(error){
            console.error('Erreur lors de la récupération des données de marché: ', error);
            throw new Error('Impossible de récupérer les données des cryptomonnaies');
        }
    },

    /**
     * Receive complets details of one crypto
     * @param coinId - Id of crypto (ex: bitcoin)
     * @returns Promise<CryptoDetails>
     */
    getCryptoDetails: async (coinId: string): Promise<CryptoDetails> =>{
        try{
            const {data} = await api.get<CryptoDetails>(`/coins/${coinId}`,{
                params: {
                    localization: false,
                    tickers: false, 
                    market_data: true,
                    community_dat: false,
                    developper_data: false,
                },
            });
            return data;
        }catch(error){
            console.error(`Erreur lors de la récupération des détails de ${coinId}: `, error);
            throw new Error(`Impossible de récupérer les détails de ${coinId}`);
        }
    },
    /**
     * receive historical  prices of crypto
     * @param coinId -id of the crypto
     * @param days -number of day about historical (1,7,30,90,365)
     * @param currency -devise (eur, usd, etc...)
     * @returns Promise<MarketChartData>
     */
    getMarketChart: async(
        coinId: string,
        days: number = 7,
        currency: string = 'eur'
    ): Promise<MarketChartData> =>{
        try{
            const {data} = await api.get<MarketChartData>(`/coins/${coinId}/market_chart`,{
                params:{
                    vs_currency: currency,
                    days,
                },
            });
            return data;
        }catch(error){
            console.error(`Erreur lors de la récupérations de l'historique de ${coinId}: `,error);
            throw new Error(`impossible lors de la récupérations de l'historique de ${coinId}`);
        }
    },
    /** search crypto by name or symbol
     * @param query term for search
     * returns Promise<Crypto[]>
     */
    searchCryptos: async (query: string): Promise<Crypto[]> =>{
        if(!query.trim()) return [];

        try{
            const cryptos = await cryptoApi.getMarketData({per_page: 250});

            const searchTerm = query.toLowerCase();
            return cryptos.filter(
                (crypto)=>
                    crypto.name.toLowerCase().includes(searchTerm)||
                    crypto.symbol.toLowerCase().includes(searchTerm)
            );
        }catch(error){
            console.error(`Erreur lors de la recherche:`, error);
            return [];
        }
    },
};
export default cryptoApi