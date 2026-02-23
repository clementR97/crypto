import { useEffect, useState, useCallback } from "react";
import {cryptoApi} from '../services/cryptoApi.tsx';
import type { Crypto } from "../types/crypto.tsx";

interface UseCryptosReturn{
    cryptos: Crypto[];
    loading: boolean;
    error: string | null;
    refresh:() => Promise<void>;
}

export const useCryptos = (autoRefresh: boolean = false): UseCryptosReturn => {
    
    const [cryptos, setCryptos] = useState<Crypto[]>([]);
    const [loading,setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCryptos = useCallback(async()=>{
        try{
            setLoading(true);
            setError(null);

            const data  = await cryptoApi.getMarketData({
                per_page: 50,
                vs_currency: 'eur',
            });
            setCryptos(data);
        }catch(error){
            setError(error instanceof Error ? error.message : 'une erreur est survenu');
            console.error('Erreur lors du changement des cryptos:', error);
        }finally{
            setLoading(false);
        }
    },[]);

    // initla loading
    useEffect(()=>{
        fetchCryptos();
    }, [fetchCryptos]);

    // auto-refresh every 60 seconds if active
    useEffect(()=>{
        if(!autoRefresh) return;
        const interval = setInterval(()=>{
            fetchCryptos();
        },60000);//60 seconds

        return() =>clearInterval(interval);
    }, [autoRefresh, fetchCryptos]);

    return{
        cryptos,
        loading,
        error,
        refresh: fetchCryptos,
    };
};