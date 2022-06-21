import pug from 'pug';
import pdf from 'html-pdf';
import { v4 } from 'uuid';

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
    // Check args are valid
    if (assets.length == 0 || liabilities.length == 0) return '';

    // Assets totals
    const assetTotal: number = assets.reduce((pV, cV) => pV + cV.value, 0);
    const liabilityTotal: number = liabilities.reduce((pV, cV) => pV + cV.value, 0);
    const total: number = assetTotal - liabilityTotal;

    // Create html string
    const file: string = pug.renderFile('lib/pug_templates/template.pug', {
      assets, liabilities, total, assetTotal, liabilityTotal,
    });

    return file;
  }

  /**
   * Saves pdf document based on html string
   * @param data an html string
   * @returns true if pdf document is created, false otherwise
   */
  static async save(data: string): Promise<Error | pdf.FileInfo> {
    return new Promise((resolve) => {
      if (data == '') resolve(new Error('Invalid data string'));
      const fileName: string = v4();
      pdf.create(data, { format: 'A4' }).toFile(`public/pdf/${fileName}.pdf`, (err: Error, res: pdf.FileInfo) => {
        if (err || res == null) return resolve(err);
        res.filename = `${fileName}.pdf`;
        return resolve(res);
      });
    });
  }
}

export default PdfManager;
