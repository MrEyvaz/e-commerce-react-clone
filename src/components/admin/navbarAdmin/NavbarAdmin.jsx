import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';

function NavbarAdmin() {
    const navigate = useNavigate()

    useEffect(() => {
        const isAuthenticated = localStorage.getItem("isAdminAuthenticated") === "true"
        if (!isAuthenticated) {
          navigate("/adminlogin")
        }    
    }, [navigate])

    const handleLogout = () => {
        localStorage.removeItem("isAdminAuthenticated")
        navigate("/adminlogin")
    }

    return (
        <div>
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/" className='fs-2'>Exclusive</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Dropdown data-bs-theme="dark">
                            <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                                Admin
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1" active onClick={handleLogout}>
                                    Logout
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#/action-4">Separated link</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavbarAdmin