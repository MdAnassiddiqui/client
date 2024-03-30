import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { axiosClient } from '../../utils/axiosClient';
//thunkAPI is use to call multiple action inside action
export const getMyInfo = createAsyncThunk('user/getMyInfo' ,async() =>{
    try{
        
        const response =await axiosClient.get('./user/getMyInfo');
        console.log('api called data' ,response);
        return response.result;
    }
    catch (error){
        return Promise.reject (error);
    }
   
});
export const updateMyProfile = createAsyncThunk(
    "user/updateMyProfile",
    async (body) => {
        try {
           
            // body me millega new user name , bio, userImg
            const response = await axiosClient.put("/user/", body);
            return response.result;
        } catch (error) {
            return Promise.reject(error);
        } 
        
    }
);
export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (body) => {
        try {
           
            // body me millega new user name , bio, userImg
            const response = await axiosClient.delete("/user/deleteUser", body);
            return response.result;
        } catch (error) {
            return Promise.reject(error);
        } 
        
    }
);
const appConfigSlice =createSlice ({
    name:'appConfigSlice',
    initialState:{
        isLoading :false,
        toastData: {},
        myProfile :null
    },
    reducers: {
        setLoading: (state ,action) => {
            state.isLoading =action.payload;
        },
        showToast: (state ,action) =>{
            state.toastData =action.payload;
        }
    },
    // when user data millega then update the myprofile
    extraReducers :(builder) =>{
        builder
        .addCase(getMyInfo.fulfilled ,(state ,action) =>{
            // action.payload show an result
            console.log("getMyInfo.fulfilled payload:", action.payload);
            
                state.myProfile = action.payload.user;
            
        })
        //updateProfile my new user
        .addCase(updateMyProfile.fulfilled ,(state ,action) =>{
            // action.payload show an result
            state.myProfile =action.payload.user;
        })
        .addCase(deleteUser.fulfilled ,(state ,action) =>{
            // action.payload show an result
            state.myProfile =action.payload.user;
        })
    }
})
export default appConfigSlice.reducer;
export const {setLoading ,showToast} =appConfigSlice.actions;