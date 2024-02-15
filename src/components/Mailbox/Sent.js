import React, { useEffect, useState } from 'react'
import { Row,Col, Button } from 'react-bootstrap';

import Mail from './Mail';
import { useDispatch, useSelector } from 'react-redux';
import { fetchmails, mailActions } from '../../store/MailReducer';

const Sent = () => {
  const dispatch=useDispatch();
  const mails=useSelector(state=>state.mails.sent)
  const [showinbox, setshowinbox] = useState(true)
  const [maildetail, setmaildetail] = useState({})
  
  useEffect(()=>{
    dispatch(fetchmails(2))
  },[dispatch])

  const setRead=async(mail) => {
    const myemail=window.localStorage.getItem('useremail').replace('@','').replace('.','');
    const mailurl=`https://react-prep-2265-default-rtdb.asia-southeast1.firebasedatabase.app/mailbox/users/${myemail}/sent/${mail.id}.json`
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

  const deletemail=async(mailid,email) => {
    if(window.confirm('want to delete mail ?')){
      const myemail=email.replace('@','').replace('.','');
      const delurl=`https://react-prep-2265-default-rtdb.asia-southeast1.firebasedatabase.app/mailbox/users/${myemail}/sent/${mailid}.json`
      try {
        const res=await fetch(delurl,{
          method:'DELETE',
        })
        if(!res.ok){
          throw new Error('something went wrong')
        }
        else{
          window.alert('mail deleted successfully !')
          const updatedmails=mails.filter(m=>m.id!==mailid)
          // setmails(updatedmails)
          dispatch(mailActions.setsent(updatedmails))
          setshowinbox(true)
        }
      } catch (error) {
        console.log(error)
      }
    }
    else
      return;
  }

  function extractTextFromHtml(htmlString) {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlString;
    return tempElement.textContent || tempElement.innerText;
  }

  return (
    <div >
      {showinbox ? <><div className='d-flex justify-content-between align-items-center my-2'>
        <span className='mx-4 fw-bold fs-5'>Sent Mails</span>
        <span className='mx-4'>Unread Mails : {mails.reduce((acc,cur)=>{
          if(!cur.read)
          acc++
        return acc
        },0)}</span>
      </div>
      <ul className='border-top px-4'>
        {mails.length===0?<p className='text-center mt-5 text-black-50'>None Emails Sent</p>:
          mails.map((mail,i)=>{
            return(
              <Row xs={3} key={mail.id}  className={`border-bottom py-2 ${i%2===0?'':'bg-light'}`} >
                <Col xs={1} className='p-0'>
                  <span className='mx-2'><input type='checkbox'/></span>
                  <span className='text-primary fw-bold float-end'>{mail.read?' ': '●'}</span>
                </Col>
              <Col xs={10}>
              <Row xs={1} md={3} className='text-start' onClick={openmail.bind(null,mail)} style={{cursor:'pointer'}}>
                <Col md={4}>
                  <span className='fw-bold'>{mail.from}</span>
                </Col>
                <Col md={4} className='fw-bold'>{mail.subject}</Col>
                <Col md={4}  className='text-muted mb-0' style={{width:'30%',overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis'}}>{extractTextFromHtml(mail.message)}</Col>
              </Row>
              </Col>
              <Col xs={1}><Button variant='danger py-0 me-2' size='sm' onClick={deletemail.bind(null,mail.id,mail.to)}>X</Button></Col>
              </Row>
            )
          })
        }
      </ul></>:<Mail mail={maildetail} closemail={()=>setshowinbox(true)} onDelete={deletemail}/>}
    </div>
  )
}

export default Sent