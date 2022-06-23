import { balanceItem } from '../pdfManager/pdfManager';

interface chartData {
    labels: string[];
    datasets: [
        {
            label: string;
            data: number[];
            backgroundColor: string[];
        }
    ]
}

class dataParser {
  static randomColour():string {
    const letters: string = '0123456789ABCDEF';

    let color: string = '#';

    for (let i = 0; i < 6; i += 1) color += letters[(Math.floor(Math.random() * 16))];

    return color;
  }

  static formChartData(assets: balanceItem[]): chartData | null {
    if (assets.length == 0) return null;
    const chartItems: chartData = {
      labels: [],
      datasets: [{
        label: 'Assets',
        data: [],
        backgroundColor: [],
      }],
    };

    assets.forEach((e: balanceItem) => {
      chartItems.labels.push(e.name);

      chartItems.datasets[0].data.push(e.value);

      chartItems.datasets[0].backgroundColor.push(this.randomColour());
    });

    return chartItems;
  }
}

export default dataParser;
