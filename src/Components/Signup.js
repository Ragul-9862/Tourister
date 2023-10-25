import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import { createUserWithEmailAndPassword,updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/Firebase';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const Navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    password: "",
    repassword: ""
  });
  const [error, setError] = useState('');
  const [submit, setSubmit] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handelSignup = (e) => {
    e.preventDefault();

    if (!values.name || !values.password || !values.repassword) {
      setError("Fill in all the fields");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(values.name)) {
      setError("Invalid email format");
      return;
    }

    if (values.password !== values.repassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    createUserWithEmailAndPassword(auth, values.name, values.password, values.repassword)
      .then((res) => {
        console.log(res);
        setSignupSuccess(true);
        setSubmit(false);
        const user = res.user;
        updateProfile(user,{
          displayName:values.name
        })
        Navigate("/")
        console.log(user);
      })
      .catch((error) => {
        console.error(error);
        setSubmit(false);
        setError("Error: " + error.message);
      });

    setValues({
      name: "",
      password: "",
      repassword: "",
    });
  };

  const formStyle = {
    backgroundColor: 'transparent',
    padding: '1rem',
    width: '20rem',
  };

  const formContainerStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '1rem',
  };

  return (
    <div className='relative top-56 md:justify-center md:relative md:top-72 md:flex md:w-full md:h-1/2'>
      <div className='flex justify-center items-center' style={formContainerStyle}>
        <div style={formStyle} className='flex flex-col justify-center'>
          <h1 className='text-center mb-4'>Create A New Account</h1>
          <form className='flex flex-col justify-center'>
            <input
              onChange={(e) => setValues((prev) => ({ ...prev, name: e.target.value }))}
              type='text'
              placeholder='User Name'
              className='outline-none bg-slate-200 rounded-md w-full mb-4 p-2'
            />
            <input
              onChange={(e) => setValues((prev) => ({ ...prev, password: e.target.value }))}
              type='password'
              placeholder='Password'
              className='outline-none bg-slate-200 rounded-md w-full mb-4 p-2'
            />
            <input
              onChange={(e) => setValues((prev) => ({ ...prev, repassword: e.target.value }))}
              type='password'
              placeholder='Password'
              className='outline-none bg-slate-200 rounded-md w-full mb-4 p-2'
            />
            {signupSuccess && <p>Signup Successful!</p>}
            {error && <b>{error}</b>}
            <button disabled={submit} onClick={handelSignup} className='bg-blue-500 text-white rounded-md py-2' type='submit'>
              Sign Up
            </button>
            <Link to={"/login"} className='text-xs my-2'>
              Existing User?
            </Link>
            <h3 className='text-center my-2'>or</h3>
            <button>Sign Up With Google</button>
          </form>
        </div>
      </div>
    </div>
  );
}
