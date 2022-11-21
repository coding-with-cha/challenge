import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const createTask = createAsyncThunk('task/createTask', 
async(info,{rejectWithValue})=>{
    try {
        const {data} = await axios.post(
            `/api/task/${info._id}`,
            info.data,
            {
                headers: { 
                    token: localStorage.getItem('token'),
                },
            });
        return data;
    } catch (errors) {
        return rejectWithValue(errors.response.data.msg)
    }
});

export const getMyTasks = createAsyncThunk('task/getMyTasks', 
async(info,{rejectWithValue})=>{
    try {
        const {data} = await axios.get(
            '/api/task',
            {headers: { 
                token: localStorage.getItem('token'),
            }},);
        return data;
    } catch (errors) {
        return rejectWithValue(errors.response.data.msg)
    }
});

export const getTasksIdProject = createAsyncThunk('task/getTasksIdProject', 
async(info,{rejectWithValue})=>{
    try {        
        const {data} = await axios.get(
            `/api/task/tasksOFProject/${info}`,
            {headers: { 
                token: localStorage.getItem('token'),
            }},);
        return data;
    } catch (errors) {
        return rejectWithValue(errors.response.data.msg)
    }
});

export const addAssignedToTask = createAsyncThunk('task/addAssignedToTask', 
async(taskInfo,{rejectWithValue, dispatch})=>{
    try {
        const {data} = await axios.put(
            `/api/task/${taskInfo._id}`, taskInfo,
            {headers: { 
                token: localStorage.getItem('token'),
            }},);
           return data;  
    } catch (errors) {
        return rejectWithValue(errors.response.data.msg)
    }
});

export const updateTask = createAsyncThunk('task/updateTask', 
async(taskInfo,{rejectWithValue, dispatch})=>{
    try {
        const {data} = await axios.put(
            `/api/task/${taskInfo._id}`, taskInfo,
            {headers: { 
                token: localStorage.getItem('token'),
            }},);
           return data;  
    } catch (errors) {
        return rejectWithValue(errors.response.data.msg)
    }
});

export const updateTaskDone = createAsyncThunk('task/updateTaskDone', 
async(taskInfo,{rejectWithValue, dispatch})=>{
    try {
        const {data} = await axios.put(
            `/api/task//done/${taskInfo._id}`,
            {headers: { 
                token: localStorage.getItem('token'),
            }},);
           return data;  
    } catch (errors) {
        return rejectWithValue(errors.response.data.msg)
    }
});

export const deleteTask = createAsyncThunk('task/deleteTask', 
async(taskId,{rejectWithValue, dispatch})=>{
    try {
        const {data} = await axios.delete(
            `/api/task/${taskId}`,
            {headers: { 
                token: localStorage.getItem('token'),
            }},);
            return data
    } catch (errors) {
        return rejectWithValue(errors.response.data.msg)
    } 
});

const taskSlice = createSlice({
    name:'task',
    initialState:{
        loading: false,
        taskList: [],
        errors: null,
    },
    extraReducers:{
        [createTask.rejected]:(state, action)=>{
            state.errors = action.payload
        },
        [getMyTasks.pending]:(state)=>{
            state.loading= true
        },   
        [getMyTasks.fulfilled]:(state, action)=>{
            state.taskList= action.payload
            state.errors= null
            state.loading= false
        }, 
        [getMyTasks.rejected]:(state, action)=>{
            state.errors = action.payload
            state.loading= false
        },
        [getTasksIdProject.pending]:(state)=>{
            state.loading= true
        },   
        [getTasksIdProject.fulfilled]:(state, action)=>{
            state.taskList= action.payload
            state.errors= null
            state.loading= false
        }, 
        [addAssignedToTask.rejected]:(state, action)=>{
            state.errors = action.payload
        },
        [updateTask.rejected]:(state, action)=>{
            state.errors = action.payload
        },
        [updateTaskDone.rejected]:(state, action)=>{
            state.errors = action.payload
        },
        [deleteTask.rejected]:(state, action)=>{
            state.errors = action.payload
        },
    }
})
export default taskSlice.reducer;