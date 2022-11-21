import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const registerUser = createAsyncThunk('user/register',
async(info,{rejectWithValue})=>{
    try {
        const {data} = await axios.post(
            '/api/user/register',
            info.data);
            info.navigate('/login')
        return data;
    } catch (errors) {
        return rejectWithValue(errors.response.data.msg)
    }
});

export const loginUser = createAsyncThunk('user/loginUser', 
async(info,{rejectWithValue})=>{
    try {
        const {data} = await axios.post(
            '/api/user/login',
            info.data);
            data.role === 'user' ? info.navigate('/Profile') 
            : data.role === 'manager' && info.navigate('/Dashboard');
        return data;
    } catch (errors) {
        return rejectWithValue(errors.response.data.msg)
    }
});

export const loadUserInfo = createAsyncThunk('user/loadUserInfo'
, async(info,{rejectWithValue})=>{
    try {
        const {data} = await axios.get(
            '/api/user', {
                headers: { 
                    token: localStorage.getItem('token'),
                },
            }
           );
        return data;
    } catch (errors) {
        return rejectWithValue(errors.response.data.msg)
    }
});

export const loadUserById = createAsyncThunk('user/loadUserById'
, async(info,{rejectWithValue})=>{
    try {
        const {data} = await axios.get(
            `/api/user/${info}`, {
                headers: { 
                    token: localStorage.getItem('token'),
                },
            }
           );
        return data;
    } catch (errors) {
        return rejectWithValue(errors.response.data.msg)
    }
});

export const getallUsers = createAsyncThunk('user/getallUsers'
, async(info,{rejectWithValue})=>{
    try {
        const {data} = await axios.get(
            '/api/user/all/users', {
                headers: { 
                    token: localStorage.getItem('token'),
                },
            }
           );
        return data;
    } catch (errors) {
        return rejectWithValue(errors.response.data.msg)
    }
});

export const managerUpListProjectUser = createAsyncThunk('project/managerUpListProjectUser', 
async(info,{rejectWithValue, dispatch})=>{
    try {
        console.log(info.userId)
        console.log(info.projectId)
        const {data} = await axios.put(
            `/api/user/projectList/${info.userId}`, info,
            {headers: { 
                token: localStorage.getItem('token'),
            }},);
           return (data)  
    } catch (errors) {
        return rejectWithValue(errors.response.data.msg)
    }
});

const userSlice = createSlice({
    name:'user',
    initialState:{
        loading: false,
        listUsers:[],
        userInfo:{},
        token:localStorage.getItem('token') || null,
        isAuth:Boolean(localStorage.getItem('isAuth')) || null,
        role:localStorage.getItem('role') || '',
        errors:null,
    },
    reducers:{
        logout: (state)=> {
            state.token = null;
            state.isAuth = false;
            state.role = '';
            localStorage.removeItem('token');
            localStorage.removeItem('isAuth');
            localStorage.removeItem('role');
    },   
    },
    extraReducers:{
        [registerUser.fulfilled]:(state, action)=>{
            state.msg = action.payload.msg
        }
        ,
        [registerUser.rejected]:(state, action)=>{
            state.errors = action.payload
        },
        [loginUser.fulfilled]:(state,action)=>{
            state.isAuth= true;
            localStorage.setItem('isAuth', true);
            state.token = action.payload.token;
            state.role= action.payload.role;
            localStorage.setItem('role', action.payload.role)
            localStorage.setItem('token',action.payload.token)
        },
        [loginUser.rejected]:(state, action)=>{
            state.errors = action.payload
        },
        [loadUserInfo.fulfilled]:(state,action)=>{
            state.userInfo = action.payload
        },
        [loadUserInfo.rejected]:(state, action)=>{
            state.errors = action.payload
        },
        [loadUserById.fulfilled]:(state,action)=>{
            state.userInfo = action.payload
        },
        [loadUserById.rejected]:(state, action)=>{
            state.errors = action.payload
        },
        [getallUsers.fulfilled]:(state,action)=>{
            state.listUsers = action.payload
        },
        [getallUsers.rejected]:(state, action)=>{
            state.errors = action.payload
        },
        [managerUpListProjectUser.rejected]:(state, action)=>{
            state.errors = action.payload
        },
    }
});
export default userSlice.reducer;
export const {logout} = userSlice.actions;
