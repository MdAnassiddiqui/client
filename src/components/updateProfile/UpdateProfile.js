import React, { useEffect, useState } from 'react'
import './UpdateProfile.scss';
import dummyuserImg from "../../assets/user.png";
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, setLoading, updateMyProfile } from '../../redux/slices/appConfigSlice';
const UpdateProfile = () => {
    const myProfile =useSelector(state => state.appConfigReducer.myProfile);
    const [name ,setName] =useState('');
    const [bio , setBio] =useState('');
    const [userImg ,setUserImg] =useState('');
    const dispatch =useDispatch();

    useEffect(() =>{
        setName(myProfile?.name || '');
        setBio(myProfile?.bio || '');
        setUserImg(myProfile?.avatar?.url )
    },[myProfile]);

    // we can change the image with the help of FileReader
    function handleImageChange(e){
           const file =e.target.files[0];
           //file Reader send the file to backend to change the image
           const fileReader =new FileReader();
           fileReader.readAsDataURL(file);
           fileReader.onload =() =>{
            if(fileReader.readyState ===fileReader.DONE){
                setUserImg(fileReader.result)

            }
           }
    }
    function handleSubmit(e){
        e.preventDefault();
       dispatch(updateMyProfile({
        name ,
        bio,
        userImg
       }));
    }
    function handleDelete(e){
        e.preventDefault();
        dispatch(deleteUser({
            name ,
            bio,
            userImg  
        }));
    }
  return (
    <div
    className ="updateProfile">
    <div className='container'>
    <div className='left-part'>
        <div className='input-user-img'>
            <label htmlFor='inputImg' className='labelImg'>
            <img  src={userImg ? userImg : dummyuserImg} alt={name}/>
            </label>
            
            <input className='inputImg' id="inputImg" type ="file" accept='image/*' onChange={handleImageChange}/>
        </div>
        
    </div>
    <div className='right-part'>
        <form onSubmit={handleSubmit}>
            <input value ={name} type="text" placeholder='Your Name' onChange= {(e) => setName(e.target.value)}/>
            <input value ={bio} type ="text" placeholder='Your Bio' onChange= {(e) => setBio(e.target.value)}/>
            <input type ="submit" className='btn-primary' onClick={handleSubmit}/>
        </form>
        <button className='delete-account btn-primary' onClick={handleDelete}>Delete Account</button>
    </div>
    </div>
    </div>
  )
}

export default UpdateProfile;
