import { configureStore } from "@reduxjs/toolkit";
import mailSlice from './MailReducer'

const store=configureStore({
    reducer:{
        mails:mailSlice,
        
    }
})

export default store;