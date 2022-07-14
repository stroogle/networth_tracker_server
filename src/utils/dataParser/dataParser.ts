import { balanceItem, AdvancedBalanceItem } from '../pdfManager/pdfManager';

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
    liabilities: AdvancedBalanceItem,
    numOfYears: number,
  ): number[] {
    const nums: number[] = [];

    return nums;
  }
}

export default dataParser;
