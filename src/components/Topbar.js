import React from 'react'
import { Button, Nav, NavLink, Navbar, NavbarBrand } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom'
import { authActions } from '../store/authReducer'
import { useDispatch, useSelector } from 'react-redux'

const Topbar = () => {
  const dispatch=useDispatch()
  const loggedin=useSelector(state=>state.auth.isloggedin)
  const history=useHistory()
  const logouthandler=() => {
    localStorage.removeItem('usertoken')
    localStorage.removeItem('userid')
    localStorage.removeItem('useremail')
    dispatch(authActions.logout())
    history.push('/login')
  }
  return (
    <Navbar className='bg-white shadow-sm'>
      <NavbarBrand className='ms-3'>MyWebLink</NavbarBrand>
      {loggedin&&<span className='d-flex flex-column flex-sm-row justify-content-between w-100 mx-2'>
        <Nav className='mb-2 mb-sm-0'>
          <NavLink className='bg-light border rounded-pill ms-2 px-3' as={Link} to='/mailbox'>New Mail</NavLink>
          <NavLink className='bg-light border rounded-pill ms-2 px-3' as={Link} to='/inbox'>Inbox</NavLink>
          <NavLink className='bg-light border rounded-pill ms-2 px-3' as={Link} to='/sent'>Sent</NavLink>
        </Nav>
        <Button variant='outline-secondary rounded-pill' onClick={logouthandler}>LogOut</Button>
      </span>}
    </Navbar>
  )
}

export default Topbar