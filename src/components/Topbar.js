import React from 'react'
import { Nav, NavLink, Navbar, NavbarBrand } from 'react-bootstrap'

const Topbar = () => {
  return (
    <Navbar className='bg-white shadow-sm'>
      <NavbarBrand className='ms-3'>MyWebLink</NavbarBrand>
      <Nav>
        <NavLink className='bg-light border rounded-pill ms-2 px-3'>New Mail</NavLink>
        <NavLink className='bg-light border rounded-pill ms-2 px-3'>Inbox</NavLink>
        <NavLink className='bg-light border rounded-pill ms-2 px-3'>Sent</NavLink>
      </Nav>
    </Navbar>
  )
}

export default Topbar