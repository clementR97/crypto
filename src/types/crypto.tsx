export interface Crypto{
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    markert_cap_rank: number;
    fully_diluted_valuation: number | null;
    total_volum: number;
    high_24h: number;
    low_24h: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    circulation_supply: number;
    total_supply: number | null;
    max_supply: number | null;
    ath: number;
    ath_change_percentage: number;
    ath_date: string;
    atl: number;
    atl_change_percentage: number;
    atl_date: string;
    last_updated: string;
}

export interface CryptoDetails extends Crypto{
    descrition?: {
        en: string;
    };
    links?:{
        homepage: string[];
        blockchain_site: string[]
    };
    market_date?:{
        price_change_percentage_7d: number;
        price_change_percentage_30d: number;
    };
}
export interface MarketChartData{
    prices: [number, number][];//[timestamp, price]
    market_caps: [number, number][];
    total_volumes: [number, number][];
}
export interface ChartData{
    labels: string[];
    datasets:{
        label: string;
        data: number[];
        borderColor?: string;
        backgroundColor?: string | string[];
        fill?: boolean;
        tension?:number; 
    }[];
}

export type TimeRange = '1' | '7' | '30' | '90' | '365';

export interface cryptoApiParams{
    vs_currency?: string;
    order?: string;
    per_page?: number;
    page?: number;
    sparkline?: boolean;
    price_change_percentage?: string;
}
