import { configureStore } from "@reduxjs/toolkit";
import mailSlice from './MailReducer'
import authSlice from './authReducer'

const store=configureStore({
    reducer:{
        mails:mailSlice,
        auth:authSlice,
    }
})

export default store;