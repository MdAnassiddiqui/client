import React from 'react'
import { KEY_ACCESS_TOKEN, getItem } from '../utils/localStorageManager'
import { Outlet , Navigate} from 'react-router-dom';

function RequireUser (){
    //access token get karlo when user first time login
    const user =getItem(KEY_ACCESS_TOKEN);
    return(
        // user already login hai then outlet(jaha ap bhjna chaho ) ni to login page pe bhj do
        user ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default RequireUser
