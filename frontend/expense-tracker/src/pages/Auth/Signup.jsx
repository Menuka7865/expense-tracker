import React,{useState} from 'react';
import AuthLayout from '../../components/Layouts/AuthLayout';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/input';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';



const Signup = () => {
  const[profilePic,setProfilePic] = useState(null);
  const[fullName,setFullName] = useState('');
  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');
 
  const[error,setError] = useState(null);

  const {updateUser} = React.useContext(UserContext);
  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();

    let profilePicURL = "";

    if (!fullName) {
      setError("Full name is required.");
      return;
    }
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

    try {

      if(profilePic){
        const formData = new FormData();
        formData.append('profileImage', profilePic);
        try {
          const uploadRes = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          profilePicURL = uploadRes.data?.imageUrl || "";
        } catch (uploadErr) {
          console.error('Image upload failed:', uploadErr);
          // non-fatal: continue without profile pic
          profilePicURL = "";
        }
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
        fullName,
        email,
        password,
        profileImageUrl: profilePicURL
      });
      const {token,user} = response.data;

      if (token) {
        localStorage.setItem('token',token);
        updateUser(user);
        navigate('/dashboard');
      } else {
        console.warn('No token in signup response, not navigating.');
      }
  }catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      }else{
        setError("Signup failed. Please try again.");
      }
    }
  };
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
         {error && <p className='text-red-500 text-sm my-2'>{error}</p>}

          <button type="submit" className='bg-violet-500 w-full text-white py-3 rounded mt-4 hover:bg-violet-700 transition duration-200'>
          Sign Up
          </button>
          <p className='text-[13px] text-slate-700 mt-4 text-center'>
            Already have an account? <span className='text-blue-600 cursor-pointer' onClick={() => navigate('/login')}>  Login</span>
          </p>
      </form>
     </div>
    </AuthLayout>
  );
}

export default Signup;
