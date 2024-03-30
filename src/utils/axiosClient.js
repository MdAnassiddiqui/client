import axios from 'axios'
import { KEY_ACCESS_TOKEN, getItem, removeItem, setItem } from './localStorageManager'
import store from "../redux/store";
import { setLoading, showToast } from '../redux/slices/appConfigSlice';
import { TOAST_FAILURE } from '../App';

let baseURL = 'http://localhost:4000/';
console.log('env is ', process.env.NODE_ENV);
if(process.env.NODE_ENV === 'production') {
    baseURL = process.env.REACT_APP_SERVER_BASE_URL
}

export const axiosClient =axios.create({
    baseURL,
    // credentials is used to send the cookies from frontend to backend
    withCredentials:true
});


//Interceptor is a used after front-end request and when Api call then it add authentic token of that request then middleware understand that it is authentic user and given him a response
axiosClient.interceptors.request.use(
    (request) =>{
        const accessToken =getItem(KEY_ACCESS_TOKEN);
        // accesstoken send to the header 
        request.headers["Authorization"] =`Bearer ${accessToken}`;
        store.dispatch(setLoading(true));
        return request;
    }
)
axiosClient.interceptors.response.use(
   async (respone)=>{
        store.dispatch(setLoading(false));
        const data =respone.data;
        if(data.status ==='ok'){
            return data;
        }
        //agr refresh token expire the it response
        const originalRequest=  respone.config;
        const statusCode= data.statusCode;
        const error =data.message
        store.dispatch(showToast({
        type: TOAST_FAILURE,
        message:error
    }))
       

       
        // when accesstoken expires and refresh key call automatically call
        if(statusCode===401 && !originalRequest._retry){
             originalRequest._retry =true;
            const response =await axios.create({
                withCredentials:true,

            }).get(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`)
            // console.log('response from backend', response)
             // if accesskey expire then client send the refresh token then it give again access token
             if(response.data.status ==='ok'){
                setItem(KEY_ACCESS_TOKEN ,
                   // response give new access token 
                    response.data.result.accessToken);
                    // original request me key daal dia and wo token le kar backend se new access key de dega
                originalRequest.headers['Authorization']=`Bearer ${response.data.result.accessToken}`;
                return axios(originalRequest);
             }
              // when refresh token expires ,send user to login page // when refresh token expires ,send user to login page
             else{
        
                removeItem(KEY_ACCESS_TOKEN);
        
                window.location.replace('/login' ,'_self');
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    },
    // it koi aur error hoga jo server is ni aa rha like network error
    async(error) =>{
        store.dispatch(setLoading(false));
        store.dispatch(showToast({
            type:TOAST_FAILURE,
            message:error.message
        }))
        return Promise.reject(error);
    }

);