import React from 'react'
import { Nav, NavLink, Navbar, NavbarBrand } from 'react-bootstrap'
import { Link } from 'react-router-dom/cjs/react-router-dom'

const Topbar = () => {
  return (
    <Navbar className='bg-white shadow-sm'>
      <NavbarBrand className='ms-3'>MyWebLink</NavbarBrand>
      <Nav>
        <NavLink className='bg-light border rounded-pill ms-2 px-3' as={Link} to='/mailbox'>New Mail</NavLink>
        <NavLink className='bg-light border rounded-pill ms-2 px-3' as={Link} to='/inbox'>Inbox</NavLink>
        <NavLink className='bg-light border rounded-pill ms-2 px-3' as={Link} to='/sent'>Sent</NavLink>
      </Nav>
    </Navbar>
  )
}

export default Topbar