import express from 'express';
import { validationResult, checkSchema, Schema } from 'express-validator';
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
};

router.post(
  '/create',
  checkSchema(bodySchema),
  async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const sheet: string = await PdfManager.create(req.body.assets, req.body.liabilities);
    await PdfManager.save(sheet);
    return res.json(req.body);
  },
);

export default router;