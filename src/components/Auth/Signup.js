import React,{useRef} from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";

const Signup = () => {
  const useremail = useRef(null);
  const password = useRef(null);
  const confirmpassword = useRef(null);

  const submitHandler = async(e) => {
    e.preventDefault();
    const enteredemail=useremail.current.value;
    const enteredpassword=password.current.value;
    const confirmation=confirmpassword.current.value;
    if(enteredpassword!==confirmation){
        window.alert('Password do not match !!!')
        return;
    }

    let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCNjyGdvZOwov0B76Oqc9_7DGWkVBnUODY';

    try{
        const res = await fetch(url,{
          method:'POST',
          body:JSON.stringify({
            email: enteredemail,
            password: enteredpassword,
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
            ref={useremail}
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
            ref={password}
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
            ref={confirmpassword}
            required
          />
        </FloatingLabel>
        <Button
          variant="primary rounded-pill px-5 my-4"
          type="submit"
          size="lg"
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
