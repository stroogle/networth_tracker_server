import pug from 'pug';
import { v4 } from 'uuid';
import puppeteer from 'puppeteer';
import dataParser from '../dataParser/dataParser';

export interface balanceItem {
    name: string;
    value: number;
}

export interface AdvancedBalanceItem extends balanceItem {
    direction: 1 | -1;
    rateOfChange: number;
}

class PdfManager {
  /**
     * Async function that creates an html string from the ejs template
     * @param assets an array of balance items
     * @param liabilities an array of balance items
     * @returns html string, or if params are invalid and empty string
     */
  static async create(
    assets: balanceItem[],
    liabilities: balanceItem[],
    currencySymbol: string,
  ): Promise<string> {
    // Check args are valid
    if (assets.length == 0 || liabilities.length == 0) return '';

    // Assets totals
    const assetTotal: number = assets.reduce((pV, cV) => pV + cV.value, 0);
    const liabilityTotal: number = liabilities.reduce((pV, cV) => pV + cV.value, 0);
    const total: number = assetTotal - liabilityTotal;

    // Organise chart data
    const chartData = dataParser.formChartData(assets);
    const liabilityChartData = dataParser.formChartData(liabilities);

    // Create html string
    const file: string = pug.renderFile('lib/pug_templates/template.pug', {
      assets,
      liabilities,
      total,
      assetTotal,
      liabilityTotal,
      currencySymbol,
      chartData,
      liabilityChartData,
      isAdvanced: false,
    });

    return file;
  }

  static async createAdvanced(
    assets: AdvancedBalanceItem[],
    liabilities: AdvancedBalanceItem[],
    currencySymbol: string,
  ): Promise<string> {
    // Check args are valid
    if (assets.length == 0 || liabilities.length == 0) return '';

    // Assets totals
    const assetTotal: number = assets.reduce((pV, cV) => pV + cV.value, 0);
    const liabilityTotal: number = liabilities.reduce((pV, cV) => pV + cV.value, 0);
    const total: number = assetTotal - liabilityTotal;

    // Organise chart data
    const chartData = dataParser.formChartData(assets);
    const liabilityChartData = dataParser.formChartData(liabilities);

    const advancedChartData = dataParser.getLineChartData(assets, liabilities, 10);

    // Create html string
    const file: string = pug.renderFile('lib/pug_templates/template.pug', {
      assets,
      liabilities,
      total,
      assetTotal,
      liabilityTotal,
      currencySymbol,
      chartData,
      liabilityChartData,
      isAdvanced: true,
      advancedChartData,
    });

    return file;
  }

  /**
   * Saves pdf document based on html string
   * @param data an html string
   * @returns true if pdf document is created, false otherwise
   */
  static async save(data: string): Promise<{filename: string}> {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      defaultViewport: null,
    });

    const page = await browser.newPage();

    await page.setContent(data, { waitUntil: ['load', 'networkidle0', 'domcontentloaded'] });

    await page.waitForSelector('#myChart', { hidden: false });

    await page.emulateMediaType('screen');

    const fileName: string = v4();

    await page.pdf({
      path: `public/pdf/${fileName}.pdf`,
      printBackground: true,
      format: 'A4',
    });

    await browser.close();

    return {
      filename: `${fileName}.pdf`,
    };
  }
}

export default PdfManager;
