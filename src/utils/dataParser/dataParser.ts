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

const colourPalette = [
  '#000000',
  '#5D737E',
  '#FFF07C',
  '#F0F7EE',
  '#87BBA2',
];

let currentColours = [...colourPalette];

class dataParser {
  static randomColour():string {
    if (currentColours.length == 0) currentColours = [...colourPalette];

    const color: string = currentColours.pop() || '#000000';

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
