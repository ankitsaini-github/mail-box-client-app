import React, { useRef, useState } from 'react'
import { Button, Form} from 'react-bootstrap';
import JoditEditor from 'jodit-react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const Mailbox = () => {
  const history=useHistory()
  const editor=useRef(null)
  const [content, setcontent] = useState('')
  const sendmail=async(e) => {
    e.preventDefault();
    const emaildata={
      from:window.localStorage.getItem('useremail'),
      to:e.target.emailreceiver.value,
      subject:e.target.emailsubject.value,
      message:content,
    }

    //post emaildata
    const url=`https://react-prep-2265-default-rtdb.asia-southeast1.firebasedatabase.app/mailbox/mails.json`

    try {
      const res=await fetch(url,{
        method:'POST',
        body: JSON.stringify(emaildata),
        headers:{
          'Content-Type' : 'application/json'
        }
      })
      if(!res.ok){
        console.log('got error ....')
        throw new Error('Something went wrong!');
      }
    } catch (error) {
      console.log(error)
    }

    console.log('sent:',emaildata)
    history.push('/inbox')
  }
  return (
    <div>
      <Form className='mx-3 p-3 border mt-4' onSubmit={sendmail}>
        <Form.Group className="mb-3 text-start" controlId="emailreceiver">
          <Form.Label>To :</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" />
        </Form.Group>

        <Form.Group className="mb-4 text-start" controlId="emailsubject">
          <Form.Label>Subject :</Form.Label>
          <Form.Control type="text" placeholder="Subject" />
        </Form.Group>
        
        {/* <Form.Control as="textarea" rows={3} /> */}

        <JoditEditor
          ref={editor}
          value={content}
          onBlur={newContent => setcontent(newContent)} // preferred to use only this option to update the content for performance reasons
          onChange={newContent =>setcontent(newContent)}
        />

        <Button variant='primary mt-4' type='submit'>Send</Button>
      </Form>
    </div>
  )
}

export default Mailbox