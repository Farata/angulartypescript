import * as fs from 'fs';
import * as util from 'util';

type DB = Product[];

export interface Product {
  id: number;
  title: string;
  description: string;
  categories: string[];
  imageUrl: string;
  price: number;
}

export interface ProductSearchParams {
  title?: string;
  minPrice?: string;
  maxPrice?: string;
}

const readFile = util.promisify(fs.readFile);
const db$: Promise<DB> = readFile('./data/products.json', 'utf8')
  .then(JSON.parse, console.error);

export async function getAllCategories(): Promise<string[]> {
  const allCategories = (await db$)
    .map(p => p.categories)
    .reduce((all, current) => all.concat(current), []);

  return [...new Set(allCategories)];
}

export async function getProducts(params: ProductSearchParams = {}): Promise<Product[]> {
  return filterProducts(await db$, params);
}

export async function getProductById(productId: number): Promise<any> {
   return (await db$).find(p => p.id === productId);
}

export async function getProductsByCategory(category: string): Promise<any[]> {
  return (await db$).filter(p => p.categories.includes(category));
}

export async function updateProductBidAmount(productId: number, price: number): Promise<any> {
  const products = await db$;
  const product = products.find(p => p.id === productId);
  if (product) {
    product.price = price;
  }
}

function filterProducts(products: Product[], params: ProductSearchParams): Product[] {
  return products.filter(p => {
    if (params.title && !p.title.toLowerCase().includes(params.title.toLowerCase())) {
      return false;
    }
    if (params.minPrice && p.price < parseInt(params.minPrice)) {
      return false;
    }
    if (params.maxPrice && p.price > parseInt(params.maxPrice)) {
      return false;
    }
    return true;
  });
}
