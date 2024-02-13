import React from 'react'
import { Nav, NavLink, Navbar, NavbarBrand } from 'react-bootstrap'

const Topbar = () => {
  return (
    <Navbar className='bg-white shadow-sm'>
      <NavbarBrand className='ms-3'>MyWebLink</NavbarBrand>
      <Nav>
        <NavLink>Home</NavLink>
        <NavLink>Products</NavLink>
        <NavLink>About Us</NavLink>
      </Nav>
    </Navbar>
  )
}

export default Topbar