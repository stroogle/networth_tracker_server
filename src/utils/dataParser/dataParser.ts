import { balanceItem, AdvancedBalanceItem } from '../pdfManager/pdfManager';

interface chartData {
    labels: string[];
    datasets: [
        {
            label: string;
            data: number[];
            backgroundColor?: string[];
            borderColor?: string;
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

      if (chartItems.datasets[0].backgroundColor != undefined) {
        chartItems.datasets[0].backgroundColor.push(this.randomColour());
      }
    });

    return chartItems;
  }

  /**
   * Creates and array of numbers that has the expected net position
   * of assets/liabilities over a number of years
   * @param assets - An array of advanced balance items
   * @param liabilities - An array of advanced balance items
   * @param numOfYears - The amount of years to estimate data for
   * @returns array of numbers that is the expected value over the following years
   */
  static getLineChartData(
    assets: AdvancedBalanceItem[],
    liabilities: AdvancedBalanceItem[],
    numOfYears: number,
  ): chartData {
    const nums: number[] = [];
    const years: string[] = [];

    for (let i = 0; i < numOfYears; i += 1) {
      const year = new Date().getFullYear();
      years.push((year + i).toString());

      const assetNum: number = assets.reduce((pV, cV): number => {
        const val = cV.value;
        const inside = 1 + cV.rateOfChange * cV.direction;
        return pV + (val * inside ** i);
      }, 0);

      const liabilityNum: number = liabilities.reduce((pV, cV): number => {
        const val = cV.value;
        const inside = 1 + cV.rateOfChange * cV.direction;
        const next = (val * inside ** i) > 0 ? (val * inside ** i) : 0;
        return pV + next;
      }, 0);

      nums.push(assetNum - liabilityNum);
    }

    return {
      labels: years,
      datasets: [
        {
          label: `${numOfYears} year prediction`,
          data: nums,
          borderColor: '#34D399',
        },
      ],
    };
  }
}

export default dataParser;
