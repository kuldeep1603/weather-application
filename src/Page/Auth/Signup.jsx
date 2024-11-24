import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { app } from '../../Firebase';
import { toast } from 'react-toastify';
import { useNavigate, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../Apis/Slice/Data';
import "./Auth.css";

const auth = getAuth(app);

const Signup = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch();

    const [email, Setemail] = useState("");
    const [password, Setpassword] = useState("");

    const SignupUser = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((value) => {
                dispatch(setUser({ email: value.user.email }));
                toast.success("User Logged In");
                navigate("/login");
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
                                    <h3 className="text-white  fs-20 text-capitalize mb-4">Sign Up with weather App</h3>
                                    <input type="text" className='form-control  bg-secondary-1 mb-3' onChange={(e) => Setemail(e.target.value)} required value={email} placeholder="Email" />
                                    <input type="password" className='form-control  bg-secondary-1 mb-3' onChange={(e) => Setpassword(e.target.value)} required value={password} placeholder="Password" />
                                    <button className='btn mb-3' onClick={SignupUser}>Singup</button>
                                    <p className='text-center m-0'>Already have an Account .? <NavLink to="/login" >Login</NavLink></p>
                                    <span className='text-center d-block my-1  text-white'>OR</span>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }

    export default Signup
