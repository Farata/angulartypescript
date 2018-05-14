import * as cors from 'cors';
import * as express from 'express';
import {
  getAllCategories,
  getProducts,
  getProductById,
  getProductsByCategory
} from './db-auction';

export const router = express.Router();

router.use(cors());

router.get('/products', async (req: express.Request, res: express.Response) => {
  res.json(await getProducts(req.query));
});

router.get('/products/:productId', async (req: express.Request, res: express.Response) => {
  const productId = parseInt(req.params.productId, 10) || -1;
  res.json(await getProductById(productId));
});

router.get('/categories', async (_, res: express.Response) => {
  res.json(await getAllCategories());
});

router.get('/categories/:category', async (req: express.Request, res: express.Response) => {
  res.json(await getProductsByCategory(req.params.category));
});
