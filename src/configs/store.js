import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import reducer from './rootReducer'

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})