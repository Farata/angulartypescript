import * as cors from 'cors';
import * as express from 'express';
import {
  getAllCategories,
  getProducts,
  getProductById,
  getProductsByCategory
} from './db';

export const api = express.Router();

api.use(cors());

api.get('/products', async (req: express.Request, res: express.Response) => {
  res.json(await getProducts(req.query));
});

api.get('/products/:productId', async (req: express.Request, res: express.Response) => {
  const productId = parseInt(req.params.productId, 10) || -1;
  res.json(await getProductById(productId));
});

api.get('/categories', async (_, res: express.Response) => {
  res.json(await getAllCategories());
});

api.get('/categories/:category', async (req: express.Request, res: express.Response) => {
  res.json(await getProductsByCategory(req.params.category));
});
