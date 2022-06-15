import ejs from 'ejs';
import pdf from 'html-pdf';
import path from 'path';

export interface balanceItem {
    name: string;
    value: number;
}

class PdfManager {
  /**
     * Async function that creates an html string from the ejs template
     * @param assets an array of balance items
     * @param liabilities an array of balance items
     * @returns html string, or if params are invalid and empty string
     */
  static async create(assets: balanceItem[], liabilities: balanceItem[]): Promise<string> {
    if (assets.length == 0 || liabilities.length == 0) return '';
    const assetTotal: number = assets.reduce((pV, cV) => pV + cV.value, 0);
    const liabilityTotal: number = liabilities.reduce((pV, cV) => pV + cV.value, 0);
    const total: number = assetTotal - liabilityTotal;
    const file: string = await ejs.renderFile(path.join(__dirname, 'template.ejs'), { assets, liabilities, total }).catch((e) => e);
    return file;
  }

  /**
   * Saves pdf document based on html string
   * @param data an html string
   * @returns true if pdf document is created, false otherwise
   */
  static async save(data: string): Promise<boolean> {
    return new Promise((resolve) => {
      if (data == '') resolve(false);
      pdf.create(data, { format: 'A4' }).toFile('./public/pdf/item.pdf', (err, res) => {
        if (err || res == null) resolve(false);
        resolve(true);
      });
    });
  }
}

export default PdfManager;
