import axios from 'axios';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { Button, Form, Modal } from 'react-bootstrap';
import "../App.css"

function Login() {
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { login, logout, isLoggedIn } = useContext(AuthContext)
    const [role, setRole] = useState('');



    const [signup, setSignup] = useState(false)


    function handleOpenModal() {
        setShowModal(true);
    }

    function handleCloseModal() {
        setShowModal(false);
        setMessage('');
        setPassword('');
        setEmail('');
        setRole('');
        setSignup(false);
    }

    const handleChange = (event) => {
        const { id, value } = event.target;
        if (id === 'email') {
            setEmail(value);
        } else if (id === 'password') {
            setPassword(value);
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/users/login', {
                email,
                password
            });
            const userData = res.data;
            if (userData.token) {
                login(userData);
                setShowModal(false);
                setMessage('');
            }
        } catch (error) {
            if (!error.response) {
                setMessage('Failed to access server');
            } else if (error.response.status === 401) {
                setMessage('Authentication failed');
            }
        }
    };

    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:3000/users/signup', {
                "email": email,
                "password": password,
                "role": role
            });
            setMessage("Utilizador Criado com Sucesso. Pode fazer Login")
        } catch (error) {
            if (!error.response) {
                setMessage('Failed to access server');
            } else {
                setMessage(error.response.data.mensage);
            }
        }
    }


    const goSignup = () => { setSignup(true) }
    const goLogin = () => { setSignup(false) }



    return (
        <>
            {isLoggedIn ? (
                <div>
                    <button type="button" className="btn btn-danger" onClick={logout}>Logout</button>
                </div>
            ) : (
                <button type="button" className="btn btn-primary btn-sm" onClick={handleOpenModal}>
                    Login/Signup
                </button>
            )}

            <div className={`modal ${showModal ? 'd-block' : 'd-none'}`} tabIndex={-1}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <ul className="nav nav-tabs">
                            <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <button className={`nav-link ${!signup ? 'active' : ''}`} onClick={() => goLogin()}>Login</button>
                                </li>
                                <li className="nav-item">
                                    <button className={`nav-link ${signup ? 'active' : ''}`} onClick={() => goSignup()}>Signup</button>
                                </li>
                            </ul>
                        </ul>

                        {(signup) ? <>
                            <div className="modal-header">
                                <h5 className="modal-title">Signup</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSignup}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email address</label>
                                        <input type="email" className="form-control" id="email" placeholder="name@example.com" value={email} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <Form.Label className="me-2">Role:</Form.Label>
                                        <Button
                                            variant={role === 'admin' ? 'primary' : 'outline-primary'}
                                            onClick={() => setRole('admin')}
                                            className="me-2 mb-2"
                                        >
                                            Admin
                                        </Button>
                                        <Button
                                            variant={role === 'user' ? 'primary' : 'outline-primary'}
                                            onClick={() => setRole('user')}
                                            className="mb-2"
                                        >
                                            User
                                        </Button>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseModal}>Close</button>
                                        <button type="submit" className="btn btn-primary">Signup</button>
                                    </div>
                                </form>
                                {(message.length > 0) ?
                                    <div className="alert alert-primary" role="alert">
                                        {message}
                                    </div> : <></>}
                            </div>
                        </>

                            : <>
                                <div className="modal-header">
                                    <h5 className="modal-title">Login</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={handleLogin}>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email address</label>
                                            <input type="email" className="form-control" id="email" placeholder="name@example.com" value={email} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={handleChange} />
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseModal}>Close</button>
                                            <button type="submit" className="btn btn-primary">Login</button>
                                        </div>
                                    </form>
                                    {(message.length > 0) ?
                                        <div className="alert alert-primary" role="alert">
                                            {message}
                                        </div> : <></>}
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div >
        </>
    );
}

export default Login;
