import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slice/counterSlice'

import dataReducer from './slice/dataSlice'
import jobReducer from './slice/jobSlice'
export default configureStore({
  reducer: {
    job: jobReducer,
    yourFeature:dataReducer
  }
})