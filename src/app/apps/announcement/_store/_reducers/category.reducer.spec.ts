import {initialState, reducer} from 'src/app/apps/announcement/_store/_reducers/category.reducer';


describe('Category Reducer', () => {
  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
