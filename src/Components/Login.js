import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import borabora from '../assets/borabora.jpg';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/Firebase';


export default function Login() {
  const Navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    password: "",

  });
  const [error, setError] = useState('');
  const [submit, setSubmit] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handelSignin = (e) => {
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
    setError("");

 signInWithEmailAndPassword(auth, values.name, values.password,)
      .then((res) => {
        console.log(res);
        setSignupSuccess(true);
        setSubmit(false);
        Navigate("/")
      })
      .catch((error) => {
        console.error(error);
        setSubmit(false);
        setError("Error: " + error.message);
      });

    setValues({
      name: "",
      password: "",
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
    <div className='relative top-56 md:justify-center md:relative md:border-none md:-top-0 md:flex md:w-full md:h-1/2' >
      <img src={borabora} className=' hidden md:h-screen md:block'   alt="bg" />
      <div className='flex justify-center items-center' style={formContainerStyle}>
        <div style={formStyle} className='flex flex-col justify-center'>
          <h1 className='text-center mb-4'>Sign In</h1>
          <form className='flex flex-col justify-center'>
            <input  onChange={(e) => setValues((prev) => ({ ...prev, name: e.target.value }))} type='text' placeholder='User Name' className=' outline-none bg-slate-200 rounded-md w-full mb-4 p-2' />
            <input  onChange={(e) => setValues((prev) => ({ ...prev, password: e.target.value }))} type='password' placeholder='Password' className=' outline-none  bg-slate-200 rounded-md w-full mb-4 p-2' />
            <button onClick={handelSignin } className='bg-blue-500 text-white rounded-md py-2' type='submit'>
              Login
            </button>
            <Link className='text-xs my-2' to='/forgot-password'>Forgot your password?</Link>
            <h3 className='text-center my-2'>or</h3>
            <button>Sign In With Google</button>
            <Link className='text-xs my-2' to='/signup'>Create a new account</Link>
          </form>
        </div>
      </div>
    </div>
  );
}
