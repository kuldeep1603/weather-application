import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { app } from '../../Firebase';
import { toast } from 'react-toastify';
import "./Auth.css";
import { useDispatch } from 'react-redux';
import { setUser } from '../../Apis/Slice/Data';
import { NavLink, useNavigate } from 'react-router-dom';

const auth = getAuth(app);

const Login = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch();


    const [email, Setemail] = useState("");
    const [password, Setpassword] = useState("");

    const SignupUser = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((value) => {
                dispatch(setUser({ email: value.user.email }));
                toast.success("User Logged In");
                navigate("/");
            })
            .catch((error) => toast.error(error.message));
    }
    return (
        <>
            <section className='height-100vh d-flex justify-content-center align-items-center'>
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-xl-5 col-lg-8 col-md-6 col-sm-10 col-12">
                            <div className="card border-0 bg-primary-1 px-4 py-4 card-body  signup">
                                <h3 className="text-white  fs-20 text-capitalize mb-4">Login with weather App</h3>
                                <input type="text" className='form-control  bg-secondary-1 mb-3' onChange={(e) => Setemail(e.target.value)} required value={email} placeholder="Email" />
                                <input type="password" className='form-control  bg-secondary-1 mb-3' onChange={(e) => Setpassword(e.target.value)} required value={password} placeholder="Password" />
                                <button className='btn mb-3' onClick={SignupUser}>Login</button>
                                <p className='text-center m-0'>Don't have an Account .? <NavLink to="/signup">Signup</NavLink></p>
                                <ul>
                                    <li>

                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login
