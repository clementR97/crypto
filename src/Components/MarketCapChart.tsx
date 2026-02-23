import { useMemo } from "react";
import {Paper, Typography, Box} from '@mui/material';
import {Pie} from 'react-chartjs-2';
import {
    Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
}from 'chart.js';
import type{ChartOptions}from 'chart.js';
import type { Crypto } from "../types/crypto";

// save the componant Chart.js
ChartJS.register(ArcElement,Tooltip, Legend);

interface MarketCapChartProps{
    cryptos: Crypto[];
    topN?: number;
}

export const MarketCapChart: React.FC<MarketCapChartProps> = ({
    cryptos,
    topN = 10
})=>{
    const chartData = useMemo(()=>{
        // take first N number cryptos 
        const topCryptos = cryptos.slice(0, topN);
        // Couleurs pour chaque crypto
    const colors = [
        '#FF6384', // Rose
        '#36A2EB', // Bleu
        '#FFCE56', // Jaune
        '#4BC0C0', // Turquoise
        '#9966FF', // Violet
        '#FF9F40', // Orange
        '#FF6384', // Rose clair
        '#C9CBCF', // Gris
        '#4BC0C0', // Turquoise clair
        '#FF6384', // Rose foncé
      ];
      return{
        labels: topCryptos.map((crypto)=>crypto.name),
        datasets: [
            {
                label: 'Market Cap (€)',
                data: topCryptos.map((crypto)=>crypto.market_cap),
                backgroundColor: colors.slice(0, topN),
                borderColor:'#fff',
                borderWidth: 2,
            },
        ],
      };
    },[cryptos, topN]);

    const options: ChartOptions<'pie'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins:{
            legend:{
                position:'right',
                labels:{
                    padding: 15,
                    font:{
                        size: 12,
                    },
                    generateLabels: (chart)=>{
                        const data = chart.data;
                        if(data.labels && data.datasets.length){
                            return data.labels.map((label, i)=>{
                                const dataset = data.datasets[0];
                                const value = dataset.data[i] as number;
                                const total = (dataset.data as number[]).reduce((a,b)=>a + b, 0);
                                const percentage = ((value / total)*100).toFixed(1);

                                return{
                                    text: `${label} (${percentage}%)`,
                                    fillStyle: (dataset.backgroundColor as string[])[i],
                                    hidden: false,
                                    index: i,
                                };
                            });
                        }
                        return[];
                    },
                },
            },
            tooltip:{
                callbacks:{
                    label:(context)=>{
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        const total = (context.dataset.data as number[]).reduce((a, b)=>a + b, 0);
                        const percentage = ((value / total)* 100).toFixed(1);
                        const formatValue = (value / 1_000_000_000).toFixed(2);

                        return`${label}: ${formatValue}B € (${percentage}%)`;
                    },
                },
            },
        },
    };

    if(cryptos.length === 0){
        return(
            <Paper sx={{p:3, textAlign:"center"}}>
                <Typography variant="body1" color="text.secondary">
                    Aucune données disponible
                </Typography>
            </Paper>
        );
    }
    return(
        <Paper sx={{p:3}}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
            📊 Répartition du Market Cap - Top {topN}
            </Typography>
            <Box sx={{height:400, position:"relative"}}>
                <Pie data={chartData} options={options}/>
            </Box>
        </Paper>
    );
};