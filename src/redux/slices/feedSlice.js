import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { axiosClient } from '../../utils/axiosClient';

import { likeAndUnlikePost } from './postsSlice';
//import { followOrUnfollowUserController } from '../../../../server/controllers/userController';
//thunkAPI is use to call multiple action inside action
export const getFeedData = 
createAsyncThunk('user/getFeedData' , async() =>{
    try{
       
        const response =await axiosClient.get('/user/getFeedData');
        console.log('api called FeedData' ,response);
        return response.result;
    }
    catch (error){
        return Promise.reject (error);
    }
   
});

export const followAndUnfollowUser =createAsyncThunk(
    "user/follow",
    async (body ) =>{
        try{
          
          const response=  await axiosClient.post('/user/follow' ,body);
           console.log('follow data' ,response);
            return response.result.user;
        }
        catch (error){
            return Promise.reject (error);
        }
        
    }
)


const feedSlice =createSlice ({
    name:'feedSlice',
    initialState:{
       feedData:{},
    },
  
    // when user data millega then update the myprofile
    extraReducers :(builder) =>{
        builder
        .addCase(getFeedData.fulfilled ,(state ,action) =>{
            // action.payload show an result
            console.log("getFeedData.fulfilled payload:", action.payload);
          
                state.feedData = action.payload;
            
        })
        // userprofile ke under post hoga then
        .addCase(likeAndUnlikePost.fulfilled,(state ,action) =>{
            const post =action.payload;
           // it increase the count of post and find post in feedData
            const index =state?.feedData?.posts?.findIndex((item) => item._id == post._id)
            console.log('like post' ,post ,index);
            // if index is undefined or -1 the post ke index ko update na karro
            if(index != undefined && index != -1){
            // FeedData ki post ke index ko update  karna hai
            state.feedData.posts[index] =post;
            }
             
        })
       .addCase(followAndUnfollowUser.fulfilled,(state ,action) =>{
            const user =action.payload;
            const index =state?.feedData?.followings.findIndex(item => item._id == user._id);
            if(index !=-1){
            // it means  user ki id present THEN  hata dia maine
                state?.feedData.followings.splice(index ,1);
            }
            else{
            // it means user ki id ni present hai then add kar dia maine
                state?.feedData.followings.push(user);
            }
       })
    
     
    }
});
export default feedSlice.reducer;
