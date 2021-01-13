import { configureStore } from '@reduxjs/toolkit'
import entities from './entities'
import api from './middleware/api'
export default function () {
  const store = configureStore({
    reducer: entities,
    middleware: [api],
  })

  return store
}
