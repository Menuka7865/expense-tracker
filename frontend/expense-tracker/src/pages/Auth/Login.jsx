import React, {useState} from 'react';
import AuthLayout from '../../components/Layouts/AuthLayout';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/input';
import { validateEmail } from '../../utils/helper';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate(); 
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
     if (!password ) {
      setError("Password is required.");
      return;
    }
    if (password.length < 8 ) {
      setError("Password must be at least 8 characters long.");
      return;
    }
   

    setError("");
  };
  return (
    <>
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center '>
        <h3 className='text-xl font-semibold text-blak'>Welcome Back👋</h3>
        <p className='text-xs text-slate-700 mt-[5px]mb-6'>Please enter your details Log in</p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({target}) => setEmail(target.value)}
            label="Email address"
            type="text"
            placeholder="jhon@gmail.com"
          />
          <Input
            value={password}
            onChange={({target}) => setPassword(target.value)}
            label="Password"
            type="password"
            placeholder="Enter your password"
          />

          {error && <p className='text-red-500 text-sm my-2'>{error}</p>}

          <button type="submit" className='bg-violet-500 w-full text-white py-3 rounded mt-4 hover:bg-violet-700 transition duration-200'>
            Log In
          </button>
          <p className='text-[13px] text-slate-700 mt-4 text-center'>
            Don't have an account? <span className='text-blue-600 cursor-pointer' onClick={() => navigate('/signup')}>  Sign Up</span>
          </p>

        </form>
      </div>
    </AuthLayout>
    </>
  );
}

export default Login;
