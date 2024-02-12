import React,{ useState} from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";

const Signup = () => {
  const [useremail, setuseremail] = useState('')
  const [password, setpassword] = useState('')
  const [confirmpassword, setconfirmpassword] = useState('')

  
  const submitHandler = async(e) => {
    e.preventDefault();
    if(password!==confirmpassword){
        window.alert('Password do not match !!!')
        return;
    }

    let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCNjyGdvZOwov0B76Oqc9_7DGWkVBnUODY';

    try{
        const res = await fetch(url,{
          method:'POST',
          body:JSON.stringify({
            email: useremail,
            password: password,
            returnSecureToken: true,
          }),
          headers:{
            "Content-Type": "application/json",
          },
        })
        if(res.ok){
          const data=await res.json();
          if(data){
            // localStorage.setItem('usertoken',data.idToken)
            // localStorage.setItem('userid',data.localId)
            console.log('Successfully SignedUp !',data)
            window.alert('Successfully SignedUp !')
          }
        }
        else{
          const data= await res.json();
          let errorMessage = 'Authentication failed!';
              if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
              }
              throw new Error(errorMessage);
        }
  
      }catch(error){
        console.log(error.message)
        window.alert(error.message)
      }

  };
  const logintoggler = () => {};
  return (
    <div className="bg-light d-flex justify-content-center align-items-center w-100 h-100 flex-column">
      <Form
        className="border w-25 w-sm-75 p-4 bg-white"
        onSubmit={submitHandler}
      >
        <span className="fs-3 my-2">SignUp</span>
        <FloatingLabel controlId="useremail" label="Email" className="my-3">
          <Form.Control
            type="email"
            placeholder="Email"
            autoComplete=""
            value={useremail}
            onChange={(e)=>setuseremail(e.target.value)}
            required
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="userpassword"
          label="Password"
          className="my-3"
        >
          <Form.Control
            type="password"
            placeholder="Password"
            autoComplete=""
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
            required
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="userconfirmpassword"
          label="Confirm Password"
          className="my-3"
        >
          <Form.Control
            type="password"
            placeholder="Password"
            autoComplete=""
            value={confirmpassword}
            onChange={(e)=>setconfirmpassword(e.target.value)}
            required
          />
        </FloatingLabel>
        <Button
          variant="primary rounded-pill px-5 my-4"
          type="submit"
          size="lg"
          disabled={password!==confirmpassword || useremail.length===0}
        >
          Sign Up
        </Button>
      </Form>
      <Button
        variant="outline-success mt-4 text-success"
        style={{ backgroundColor: "rgb(209, 231, 221)" }}
        onClick={logintoggler}
      >
        Have an account? LogIn
      </Button>
    </div>
  );
};

export default Signup;
