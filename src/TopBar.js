import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'


function TopBar({ location }) {
    useEffect(() => {})
    return (
        <Navbar bg='primary' expand='lg' variant='dark'>
            <Navbar.Brand href='#Home'></Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'></Navbar.Collapse>
            <Nav className='mr-auto'>
                <Nav.Link href='/' active={location.pathname==='/'}>Home</Nav.Link>
                <Nav.Link
                    href='/imagesearch'
                    active={location.pathname=== '/imagesearch'}
                >
                    Search
                </Nav.Link>
            </Nav>
        </Navbar>
    )
}

export default withRouter(TopBar)