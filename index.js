

console.log("js running");
const domElement = document.getElementById('tvchart');


const chartOptions = { layout: { textColor: 'black', background: { type: 'solid', color: 'white' }} };

const chart = LightweightCharts.createChart(domElement, chartOptions);

const candlestickSeries = chart.addCandlestickSeries({ upColor: '#26a69a', downColor: '#ef5350', borderVisible: false, wickUpColor: '#26a69a', wickDownColor: '#ef5350' });


// async function fetchData() {
//     try {
//       const response = await fetch(
//         'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=OREEDWL5ZDOXO11R'
//       );
//       const data = await response.json();
//       console.log(data["Time Series (Daily)"]);
//       return data;
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   }
  
//   fetchData();

fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=OREEDWL5ZDOXO11R`)
.then(res => res.json())
.then(data => {
    const timeSeriesData = data['Time Series (Daily)'];

    const cdata = [];
    for (const [date, dailyData] of Object.entries(timeSeriesData)) {
 
        const openValue = parseFloat(dailyData['1. open']);
        const highValue = parseFloat(dailyData['2. high']) ;
        const lowValue = parseFloat(dailyData['3. low']);
        const closeValue = parseFloat(dailyData['4. close']);
        cdata.push({ open: openValue, high:highValue, low:lowValue, close: closeValue, time:Date.parse(date)/1000});
        
      }
    //   console.log(cdata.reverse());
      candlestickSeries.setData(cdata.reverse());

      chart.timeScale().fitContent();


})

// const data2 = [{ open: 10, high: 10.63, low: 9.49, close: 9.55, time: 1642427876 }, { open: 9.55, high: 10.30, low: 9.42, close: 9.94, time: 1642514276 }, { open: 9.94, high: 10.17, low: 9.92, close: 9.78, time: 1642600676 }, { open: 9.78, high: 10.59, low: 9.18, close: 9.51, time: 1642687076 }, { open: 9.51, high: 10.46, low: 9.10, close: 10.17, time: 1642773476 }, { open: 10.17, high: 10.96, low: 10.16, close: 10.47, time: 1642859876 }, { open: 10.47, high: 11.39, low: 10.40, close: 10.81, time: 1642946276 }, { open: 10.81, high: 11.60, low: 10.30, close: 10.75, time: 1643032676 }, { open: 10.75, high: 11.60, low: 10.49, close: 10.93, time: 1643119076 }, { open: 10.93, high: 11.53, low: 10.76, close: 10.96, time: 1643205476 }];

// candlestickSeries2.setData(data2);

//       chart2.timeScale().fitContent();