import { LoadProducts, LoadProductsSuccess} from '../actions';
import { initialState, reducer } from './products';

describe('Home page', () => {
  describe('product reducer', () => {
    it('sets the flag for a progress indicator while loading products', () => {
      const loadAction = new LoadProducts();
      const loadSuccessAction = new LoadProductsSuccess({ products: [] });

      const beforeLoadingState = reducer(initialState, {} as any);
      expect(beforeLoadingState.loading).toBe(false);

      const whileLoadingState = reducer(beforeLoadingState, loadAction);
      expect(whileLoadingState.loading).toBe(true);

      const afterLoadingState = reducer(whileLoadingState, loadSuccessAction);
      expect(afterLoadingState.loading).toBe(false);
    });
  });
});
