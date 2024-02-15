import { createSlice } from "@reduxjs/toolkit";

const initialState={
    recieved:[],
    sent:[],
    mail:{},
}
const mailSlice=createSlice({
    name:'mails',
    initialState,
    reducers:{
        setinbox(state,action){
            state.recieved=action.payload
        },
        setsent(state,action){
            state.sent=action.payload
        },
        setmail(state,action){
            state.mail=action.payload
        },
    }
})

export const mailActions=mailSlice.actions;

export const fetchmails=(a)=>{
    if(a===1)
    return async(dispatch)=>{
        const myemail=window.localStorage.getItem('useremail').replace('@','').replace('.','');
        const recieverurl=`https://react-prep-2265-default-rtdb.asia-southeast1.firebasedatabase.app/mailbox/users/${myemail}/inbox.json`
    
        const requstmails=async()=>{
            const res=await fetch(recieverurl)
            if(!res.ok){
                console.log('got error ....')
                throw new Error('Something went wrong!');
            }
            // console.log('res ok',res)
            const data=await res.json()
            // console.log('got:',data)

            if(data){
                // return data;
                const loadedmail=[]
                for (const key in data){
                    loadedmail.push({
                    id:key,
                    to:data[key].to,
                    from:data[key].from,
                    message:data[key].message,
                    subject:data[key].subject,
                    read:data[key].read,
                    })
                }
                return loadedmail;
            }
        }

        try {
            const mails=await requstmails()
                dispatch(mailActions.setinbox(mails))
        } catch (error) {
            console.log(error)
        }
    }
    else
    return async(dispatch)=>{
        const myemail=window.localStorage.getItem('useremail').replace('@','').replace('.','');
        const senturl=`https://react-prep-2265-default-rtdb.asia-southeast1.firebasedatabase.app/mailbox/users/${myemail}/sent.json`
    
        const requstmails=async()=>{
            const res=await fetch(senturl)
            if(!res.ok){
                console.log('got error ....')
                throw new Error('Something went wrong!');
            }
            // console.log('res ok',res)
            const data=await res.json()
            // console.log('got:',data)

            if(data){
                // return data;
                const loadedmail=[]
                for (const key in data){
                    loadedmail.push({
                    id:key,
                    to:data[key].to,
                    from:data[key].from,
                    message:data[key].message,
                    subject:data[key].subject,
                    read:data[key].read,
                    })
                }
                return loadedmail;
            }
        }

        try {
            const mails=await requstmails()
                dispatch(mailActions.setsent(mails))
        } catch (error) {
            console.log(error)
        }
    }
}

export default mailSlice.reducer