import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const getHistorical = createAsyncThunk('historical/getHistorical',
async(info,{rejectWithValue})=>{
    try{
        const {data} = await axios.get(
            '/api/historical',
            {headers:{
                token: localStorage.getItem('token')
            }}
            )
            return data
    }catch(errors){
        return rejectWithValue(errors.response.data.msg)
    }
}
)

const historicalSlice = createSlice({
    name:'historical',
    initialState:{
        loading: false,
        historicalList: [],
        errors: null,
    },
    extraReducers:{
        [getHistorical.pending]:(state)=>{
            state.loading = true
        },
        [getHistorical.fulfilled]:(state, action)=>{
            state.historicalList = action.payload
            state.errors = null
            state.loading = false
        },
        [getHistorical.rejected]:(state, action)=>{
            state.errors = action.payload
            state.loading = false
        }
    }
})
export default historicalSlice.reducer;