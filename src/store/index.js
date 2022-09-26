import { configureStore } from '@reduxjs/toolkit';
import topSalesReducer from './topSalesSlice';
import catalogReducer from './catalogSlice';

export const store = configureStore({
  reducer: {
    topSales: topSalesReducer,
    catalog: catalogReducer,
  },
});
