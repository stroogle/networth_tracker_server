import { expect } from 'chai';
import PdfManager, { AdvancedBalanceItem, balanceItem } from './pdfManager';

describe('PdfManager Create Tests', function () {
  this.timeout(10000);
  let assets: balanceItem[];
  let liabilities: balanceItem[];
  const currencySymbol: string = '$';

  beforeEach(() => {
    assets = [
      {
        name: 'item #1',
        value: 200,
      },
      {
        name: 'item #2',
        value: 40,
      },
    ];

    liabilities = [
      {
        name: 'item #1',
        value: 100,
      },
    ];
  });

  it('Empty Parameters', async () => {
    assets = [];
    liabilities = [];
    const item: string = await PdfManager.create(assets, liabilities, currencySymbol);
    expect(item).to.be.a('string');
    expect(item).to.have.lengthOf(0);
  });

  it('Valid Parameters', async () => {
    const item: string = await PdfManager.create(assets, liabilities, currencySymbol);
    expect(item).to.be.a('string');
    expect(item.length).to.be.greaterThan(0);
    await PdfManager.save(item);
  });
});

describe('PdfManager Advanced Version Test', function () {
  this.timeout(10000);
  let assets: AdvancedBalanceItem[];
  let liabilities: AdvancedBalanceItem[];
  const currencySymbol: string = '$';

  beforeEach(() => {
    assets = [
      {
        name: 'item #1',
        value: 200,
        rateOfChange: 0.07,
        direction: 1,
      },
      {
        name: 'item #2',
        value: 40,
        rateOfChange: 0.07,
        direction: 1,
      },
    ];

    liabilities = [
      {
        name: 'item #1',
        value: 100,
        rateOfChange: 0.1,
        direction: -1,
      },
    ];
  });

  it('Empty Parameters', async () => {
    assets = [];
    liabilities = [];
    const item: string = await PdfManager.createAdvanced(assets, liabilities, currencySymbol);
    expect(item).to.be.a('string');
    expect(item).to.have.lengthOf(0);
  });

  it('Valid Parameters', async () => {
    const item: string = await PdfManager.createAdvanced(assets, liabilities, currencySymbol);
    expect(item).to.be.a('string');
    expect(item.length).to.be.greaterThan(0);
    await PdfManager.save(item);
  });
});
