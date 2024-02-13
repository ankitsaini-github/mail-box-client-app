import React, { useEffect, useState } from 'react'
import { Row,Col } from 'react-bootstrap';

const Inbox = () => {
  const [mails, setmails] = useState([]);
  const myemail=window.localStorage.getItem('useremail')
  useEffect(()=>{

    const getmails=async()=>{
      const url=`https://react-prep-2265-default-rtdb.asia-southeast1.firebasedatabase.app/mailbox/mails.json`
      try {
        const res=await fetch(url)
        if(!res.ok){
          console.log('got error ....')
          throw new Error('Something went wrong!');
        }
        const data=await res.json()
        if(data){
          console.log(data)
          const loadedmail=[]
          for (const key in data){
            loadedmail.push({
              id:key,
              to:data[key].to,
              from:data[key].from,
              message:data[key].message,
              subject:data[key].subject
            })
          }
          setmails(loadedmail)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getmails();
  },[])
  const inbox=mails.filter(mail=>mail.to===myemail)
  return (
    <div className='mt-3'>
      <ul>
        {inbox.length===0?<p className='text-center mt-5 text-black-50'>Your Inbox is Empty</p>:
          inbox.map(mail=>{
            return(
              <Row xs={1} md={3} key={mail.id} className='border-bottom mt-2'>
                <Col md={4}>
                  <span className='mx-2'><input type='checkbox'/></span>
                  <span className='fw-bold'>{mail.from}</span>
                </Col>
                <Col md={4} className='fw-bold'>{mail.subject}</Col>
                <Col md={4} dangerouslySetInnerHTML={{__html:mail.message}} className='text-muted'></Col>
              </Row>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Inbox