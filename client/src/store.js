import {configureStore} from '@reduxjs/toolkit'
import historicalReducer from './slices/historicalSlice'
import projectSlice from './slices/projectSlice'
import taskSlice from './slices/taskSlice'
import userSlice from './slices/userSlice'

export default configureStore({
    reducer:{
        user:userSlice, 
        project:projectSlice, 
        task:taskSlice, 
        historical:historicalReducer,}})