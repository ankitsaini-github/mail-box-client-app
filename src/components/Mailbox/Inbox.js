import React, { useEffect, useState } from 'react'
import { Row,Col } from 'react-bootstrap';
import Mail from './Mail';

const Inbox = () => {
  const [mails, setmails] = useState([]);
  const [showinbox, setshowinbox] = useState(true)
  const [maildetail, setmaildetail] = useState({})
  
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
              subject:data[key].subject,
              read:data[key].read,
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
  const setRead=async(mail) => {
    const myemail=window.localStorage.getItem('useremail').replace('@','').replace('.','');
    const mailurl=`https://react-prep-2265-default-rtdb.asia-southeast1.firebasedatabase.app/mailbox/users/${myemail}/inbox/${mail.id}.json`
    try {
      const res=await fetch(mailurl,{
          method: "PUT",
          body: JSON.stringify({
            from:mail.from,
            to:mail.to,
            subject:mail.subject,
            message:mail.message,
            read:true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
      })
      if(!res.ok){
        throw new Error('something went wrong')
      }
    } catch (error) {
      console.log(error)
    }
  }
  const openmail=(mail) => {
    console.log('open :',mail)
    //set mail to read
    if(!mail.read)
    setRead(mail)
    //open mail
    setmaildetail(mail)
    setshowinbox(false)
    // history.push('/mail')
  }
  function extractTextFromHtml(htmlString) {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlString;
    return tempElement.textContent || tempElement.innerText;
  }
  return (
    <div >
      {showinbox ? <><div className='d-flex justify-content-between align-items-center my-2'>
        <span className='mx-4 fw-bold fs-5'>My Inbox</span>
        <span className='mx-4'>Unread Mails : {mails.reduce((acc,cur)=>{
          if(!cur.read)
          acc++
        return acc
        },0)}</span>
      </div>
      <ul className='border-top'>
        {mails.length===0?<p className='text-center mt-5 text-black-50'>Your Inbox is Empty</p>:
          mails.map((mail,i)=>{
            return(
              <Row xs={2} key={mail.id}  className={`border-bottom py-2 ${i%2===0?'':'bg-light'}`} >
                <Col xs={1} className='p-0'>
                  <span className='mx-2'><input type='checkbox'/></span>
                  <span className='text-primary fw-bold float-end'>{mail.read?' ': '●'}</span>
                </Col>
              <Col xs={11}>
              <Row xs={1} md={3} className='text-start' onClick={openmail.bind(null,mail)} style={{cursor:'pointer'}}>
                <Col md={4}>
                  <span className='fw-bold'>{mail.from}</span>
                </Col>
                <Col md={4} className='fw-bold'>{mail.subject}</Col>
                <Col md={4}  className='text-muted mb-0' style={{width:'30%',overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis'}}>{extractTextFromHtml(mail.message)}</Col>
              </Row>
              </Col>
              </Row>
            )
          })
        }
      </ul></>:<Mail mail={maildetail} closemail={()=>setshowinbox(true)}/>}
    </div>
  )
}

export default Inbox