import React,{useState} from 'react';
import AuthLayout from '../../components/Layouts/AuthLayout';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/input';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';

const Signup = () => {
  const[profilePic,setProfilePic] = useState(null);
  const[fullName,setFullName] = useState('');
  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');
 
  const[error,setError] = useState(null);
  const navigate = useNavigate();
  const handleSignup = async (e) => {}
  return (
    <AuthLayout>
     <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center '>
      <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'>Join us today by entering your details below.</p>

      <form onSubmit={handleSignup}>

        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Input
            value={fullName}
            onChange={({target}) => setFullName(target.value)}
            label="Full Name"
            type="text"
            placeholder="Jhon Doe"
            
          />
          <Input
            value={email}
            onChange={({target}) => setEmail(target.value)}
            label="Email address"
            type="text"
            placeholder="jhon@gmail.com"
          />
          <div className='col-span-2 '>
          <Input
            value={password}
            onChange={({target}) => setPassword(target.value)}
            label="Password"
            type="password"
            placeholder="Enter your password"
          />
          </div>
        </div>
      </form>
     </div>
    </AuthLayout>
  );
}

export default Signup;
