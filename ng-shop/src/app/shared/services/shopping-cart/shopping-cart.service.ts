import { Injectable } from '@angular/core';

export interface ShoppingCartState {
  [key: string]: number;
}

const SHOPPING_CART_KEY = 'ngs_shopping_cart';

@Injectable()
export class ShoppingCartService {

  private state: ShoppingCartState;

  constructor() {
    this.state = this.loadState() || {};
  }

  private loadState(): ShoppingCartState {
    return JSON.parse(localStorage.getItem(SHOPPING_CART_KEY));
  }

  private saveState(): void {
    localStorage.setItem(SHOPPING_CART_KEY, JSON.stringify(this.state));
  }

  get totalQuantity(): number {
    return Object.keys(this.state).reduce((total, productId) => {
      return total + this.state[productId];
    }, 0);
  }

  getItems(): ShoppingCartState {
    // Return a copy of the shopping cart's state.
    return {...this.state};
  }

  setItems(items: ShoppingCartState): void {
    this.state = items;
    this.saveState();
  }

  addItem(productId: string, quantity: number): void {
    if (quantity > 0) {
      this.state[productId] = (this.state[productId] || 0) + quantity;
      this.saveState();
    }
  }

  removeItem(productId: string): void {
    delete this.state[productId];
    this.saveState();
  }

  setQuantity(productId: string, quantity: number): void {
    if (quantity > 0) {
      this.state[productId] = quantity;
      this.saveState();
    } else {
      this.removeItem(productId);
    }
  }

}
