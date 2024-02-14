import React, { useEffect, useState } from 'react'
import { Row,Col } from 'react-bootstrap';

const Inbox = () => {
  const [mails, setmails] = useState([]);
  
  useEffect(()=>{

    const getmails=async()=>{
      const myemail=window.localStorage.getItem('useremail').replace('@','').replace('.','');

      const recieverurl=`https://react-prep-2265-default-rtdb.asia-southeast1.firebasedatabase.app/mailbox/users/${myemail}/inbox.json`
      try {
        const res=await fetch(recieverurl)
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
  // const inbox=mails.filter(mail=>mail.to===myemail)
  return (
    <div className='mt-3'>
      <ul>
        {mails.length===0?<p className='text-center mt-5 text-black-50'>Your Inbox is Empty</p>:
          mails.map((mail,i)=>{
            return(
              <Row xs={2} key={mail.id}  className={`border-bottom ${i%2===0?'':'bg-light'}`}>
                <Col xs={1}><span className='mx-2'><input type='checkbox'/></span></Col>
              <Col xs={11}>
              <Row xs={1} md={3}>
                <Col md={4}>
                  <span className='fw-bold'>{mail.from}</span>
                </Col>
                <Col md={4} className='fw-bold'>{mail.subject}</Col>
                <Col md={4} dangerouslySetInnerHTML={{__html:mail.message}} className='text-muted mb-0'></Col>
              </Row>
              </Col>
              </Row>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Inbox