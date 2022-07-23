import Chart from 'react-apexcharts';

export default function ResultsPage({candidatesData}) {
    const options = {
        title: {
            text: 'Elections Results',
            align: 'center',
            style: {
                fontSize: '26px'
            }
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: false,
            }
        },
        dataLabels: {
            enabled: true
        },
        tooltip: {
            enabled: false
        }
      };

    const formattedData = [{
        data: candidatesData.map(candidate => {
            return {
                x: candidate.name,
                y: candidate.voteCount
            }
        }).sort((a,b) => b.y - a.y)
    }]
    return (
        <div className='results-page-chart-container'>
            <Chart
                type='bar'
                options={{...options}}
                width={800}
                height={400}
                series={formattedData}
            />
        </div>
    )
}