import express from 'express';
import {
  validationResult, checkSchema, Schema,
} from 'express-validator';
import pdf from 'html-pdf';
import PdfManager from '../utils/pdfManager/pdfManager';

const router = express.Router();

const bodySchema: Schema = {
  assets: {
    isArray: true,
    errorMessage: 'assets must be a non-empty array',
    isLength: {
      options: {
        min: 1,
      },
    },
  },
  'assets.*.name': {
    isString: true,
    isLength: {
      options: {
        min: 1,
      },
    },
  },
  'assets.*.value': {
    isNumeric: true,
  },
  'liabilities.*.name': {
    isString: true,
    isLength: {
      options: {
        min: 1,
      },
    },
  },
  'liabilities.*.value': {
    isNumeric: true,
  },
  currencySymbol: {
    isString: true,
    isLength: {
      options: {
        min: 1,
        max: 1,
      },
    },
    errorMessage: 'Request must have currency symbol',
  },
};

router.post(
  '/create',
  checkSchema(bodySchema),
  async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const sheet: string = await PdfManager.create(
      req.body.assets,
      req.body.liabilities,
      req.body.currencySymbol,
    );
    const fileInfo: pdf.FileInfo | Error = await PdfManager.save(sheet);
    if (fileInfo instanceof Error) {
      return res.status(500).json({
        error: 'Something went wrong on the server',
      });
    }
    return res.json(fileInfo);
  },
);

const advancedBodySchema: Schema = {
  ...bodySchema,
  'assets.*.direction': {
    custom: {
      options: (value: number) => value == -1 || value == 1,
      errorMessage: 'Direction must be either 1 or -1',
    },
  },
  'assets.*.rateOfChange': {
    custom: {
      options: (value: number) => value >= 0 && value <= 1,
      errorMessage: 'Rate of change must be in range [0...1]',
    },
  },
  'liabilities.*.direction': {
    custom: {
      options: (value: number) => value == -1 || value == 1,
      errorMessage: 'Direction must be either 1 or -1',
    },
  },
  'liabilities.*.rateOfChange': {
    custom: {
      options: (value: number) => value >= 0 && value <= 1,
      errorMessage: 'Rate of change must be in range [0...1]',
    },
  },
};

router.post(
  '/create-advanced',
  checkSchema(advancedBodySchema),
  async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const sheet: string = await PdfManager.createAdvanced(
      req.body.assets,
      req.body.liabilities,
      req.body.currencySymbol,
    );
    const fileInfo: pdf.FileInfo | Error = await PdfManager.save(sheet);
    if (fileInfo instanceof Error) {
      return res.status(500).json({
        error: 'Something went wrong on the server',
      });
    }
    return res.json(fileInfo);
  },
);

export default router;
