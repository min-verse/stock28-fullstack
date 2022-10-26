import React, {useState, useEffect} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart({chartData}) {

    // const [chartData, setChartData] = useState({});

    // useEffect(() => {
    //     let token = localStorage.getItem("jwt");
    //     if (token) {
    //       fetch(`http://localhost:5000/myportfolio`, {
    //         headers: {
    //           token: token,
    //           'Content-Type': 'application/json'
    //         }
    //       })
    //         .then(res => res.json())
    //         .then((data) => {
    //           const tickers = [];
    //           const prices = [];
    //           data.map((item) => {
    //             tickers.unshift(item['ticker']);
    //             prices.unshift(item['history'][0]['price']);
    //             return null;
    //           });
    //           console.log(data);
    //           console.log(tickers);
    //           setChartData({ tickers, prices });
    //         });
    //     }
    //   }, []);

    const { tickers, prices } = chartData;

    const data = {
        labels: tickers,
        datasets: [
            {
                label: '# of Votes',
                data: prices,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div style={{height:"10vh"}}>
            <Doughnut
                data={data}
            />
        </div>);
}

export default DoughnutChart;