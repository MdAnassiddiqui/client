import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { axiosClient } from '../../utils/axiosClient';
import { setLoading } from './appConfigSlice';
//thunkAPI is use to call multiple action inside action
export const getUserProfile = 
createAsyncThunk('user/getUserProfile' ,async(body) =>{
    try{
        
        const response =await axiosClient.post('/user/getUserProfile' ,body);
        console.log('api called userProfile' ,response);
        return response.result;
    }
    catch (error){
        return Promise.reject (error);
    }
   
});

export const likeAndUnlikePost =createAsyncThunk(
    "post/likeAndUnlike",
    async(body)=>{
        try{
           
        const response =await axiosClient.post('/posts/like' ,body);


        console.log('api called likeandUnlike' ,response);
        return response.result.post;
        }
        catch (error){
           return Promise.reject(error);
        }
       
    }
)


const postsSlice =createSlice ({
    name:'postsSlice',
    initialState:{
       userProfile:{}
    },
  
    // when user data millega then update the myprofile
    extraReducers :(builder) =>{
        builder
        .addCase(getUserProfile.fulfilled ,(state ,action) =>{
            // action.payload show an result
            console.log("getUserProfile.fulfilled payload:", action.payload);
          
                state.userProfile = action.payload;
            
        })
        // userprofile ke under post hoga then
        .addCase(likeAndUnlikePost.fulfilled,(state ,action) =>{
            const post =action.payload;
            // it increase the count of post
            const index =state?.userProfile?.posts?.findIndex(item => item._id == post._id)
            console.log('like post' ,post ,index);
            // -1 means post kahi aur like ki gyi then
            if(index!=undefined && index != -1){
            // userProfile ki post per again like ho then map 
            state.userProfile.posts[index] =post;
            }

        })
    
     
    }
});
export default postsSlice.reducer;
