import React, { useState } from 'react'
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, Form} from 'react-bootstrap';

const Mailbox = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };
  const sendmail=() => {
    console.log(convertToRaw(editorState.getCurrentContent()))
  }
  return (
    <div>
      <Form className='mx-3 p-3 border mt-4'>
        <Form.Group className="mb-3 text-start" controlId="toemail">
          <Form.Label>To :</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" />
        </Form.Group>

        <Form.Group className="mb-4 text-start" controlId="emailsubject">
          <Form.Label>Subject :</Form.Label>
          <Form.Control type="text" placeholder="Subject" />
        </Form.Group>
        
        <Editor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={onEditorStateChange}
        />
        <Button variant='primary' onClick={sendmail}>Send</Button>
      </Form>
    </div>
  )
}

export default Mailbox