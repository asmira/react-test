import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import reducer from '../reducers/rootReducer'

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,//{ignoredActionPaths: ['meta.arg','payload.successFn','modal.modal.content','payload.content']}
    }).concat(logger)
  },
})