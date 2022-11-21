import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const createProject = createAsyncThunk('project/createProject', 
async(info,{rejectWithValue})=>{
    try {
        const {data} = await axios.post(
            '/api/project',
            info.data,
            {
                headers: { 
                    token: localStorage.getItem('token'),
                },
            });
            info.navigate('/Projects')
        return data;
    } catch (errors) {
        return rejectWithValue(errors.response.data.msg)
    }
});

export const getProjects = createAsyncThunk('project/getProjects', 
async(info,{rejectWithValue})=>{
    try {
        const {data} = await axios.get(
            '/api/project',
            {headers: { 
                token: localStorage.getItem('token'),
            }},);
        return data;
    } catch (errors) {
        return rejectWithValue(errors.response.data.msg)
    }
});

export const getProjectId = createAsyncThunk('project/getProjectId', 
async(info,{rejectWithValue})=>{
    try {
        const {data} = await axios.get(
            `/api/project/${info}`,
            {headers: { 
                token: localStorage.getItem('token'),
            }},);
        return data;
    } catch (errors) {
        return rejectWithValue(errors.response.data.msg)
    }
});

export const updateProject = createAsyncThunk('project/updateProject', 
async(projectInfo,{rejectWithValue, dispatch})=>{
    try {
        const {data} = await axios.put(
            `/api/project/${projectInfo._id}`, projectInfo,
            {headers: { 
                token: localStorage.getItem('token'),
            }},);
           return (data)  
    } catch (errors) {
        return rejectWithValue(errors.response.data.msg)
    }
});

export const closeProject = createAsyncThunk('project/closeProject', 
async(projectId,{rejectWithValue, dispatch})=>{
    try {
        console.log(projectId.id)
        const data = await axios.put(
            `/api/project/closeProject/${projectId.id}`, 
            {headers: { 
                token: localStorage.getItem('token'),
            }},);
           return (data)
    } catch (errors) {
        return rejectWithValue(errors.response.data.msg)
    }
});

export const adminUpAdminListProject = createAsyncThunk('project/adminListProject', 
async(projectInfo,{rejectWithValue, dispatch})=>{
    try {
        const {data} = await axios.put(
            `/api/project/adminUpAdminsList/${projectInfo._id}`, projectInfo,
            {headers: { 
                token: localStorage.getItem('token'),
            }},);
           return (data)  
    } catch (errors) {
        return rejectWithValue(errors.response.data.msg)
    }
});

export const managerUpAdminListProject = createAsyncThunk('project/managerUpAdminListProject', 
async(info,{rejectWithValue, dispatch})=>{
    try {
        const {data} = await axios.put(
            `/api/project/adminsList/${info._id}`, info,
            {headers: { 
                token: localStorage.getItem('token'),
            }},);
           return (data)  
    } catch (errors) {
        return rejectWithValue(errors.response.data.msg)
    }
});

export const usersListUpProject = createAsyncThunk('project/usersListUpProject', 
async(projectInfo,{rejectWithValue, dispatch})=>{
    try {
        const {data} = await axios.put(
            `/api/project/usersList/${projectInfo._id}`, projectInfo,
            {headers: { 
                token: localStorage.getItem('token'),
            }},);
           return (data)  
    } catch (errors) {
        return rejectWithValue(errors.response.data.msg)
    }
});

export const statusProject = createAsyncThunk('project/statusProject', 
async(info,{rejectWithValue, dispatch})=>{
    try {
        const {data} = await axios.put(
            `/api/project/status/${info}`,
            {headers: { 
                token: localStorage.getItem('token'),
            }},);
           return (data)  
    } catch (errors) {
        return rejectWithValue(errors.response.data.msg)
    }
});

const projectSlice = createSlice({
    name:'project',
    initialState:{
        loading: false,
        projectList: [],
        projectInfo:{},
        errors: null,
    },
    extraReducers:{
        [createProject.rejected]:(state, action)=>{
            state.errors = action.payload
        },
        [getProjects.pending]:(state)=>{
            state.loading = true
        },
        [getProjects.fulfilled]:(state, action)=>{
            state.projectList = action.payload
            state.errors = null
            state.loading = false
        },
        [getProjects.rejected]:(state, action)=>{
            state.errors = action.payload
            state.loading = false
        },
        [getProjectId.fulfilled]:(state, action)=>{
            state.projectInfo = action.payload
            state.errors = null
            state.loading = false
        },
        [getProjectId.rejected]:(state, action)=>{
            state.errors = action.payload
            state.loading = false
        },
        [updateProject.rejected]:(state, action)=>{
            state.errors = action.payload
        },
        [closeProject.rejected]:(state, action)=>{
            state.errors = action.payload
        },
        [adminUpAdminListProject.rejected]:(state, action)=>{
            state.errors = action.payload
        },
        [managerUpAdminListProject.rejected]:(state, action)=>{
            state.errors = action.payload
        },
        [usersListUpProject.rejected]:(state, action)=>{
            state.errors = action.payload
        },
        [statusProject.rejected]:(state, action)=>{
            state.errors = action.payload
        },
    }
})
export default projectSlice.reducer;