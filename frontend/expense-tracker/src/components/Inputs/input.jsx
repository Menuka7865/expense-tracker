import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

// Accept props as an object and destructure them.
const Input = ({ value, onChange, placeholder, label, type }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }
  return (
    <div>
        <label className='text-[13px]  text-slate-800'>{label}</label>

        <div className='input-box'>
            <input
                type={type === "password" ? (showPassword ? "text" : "password") : type}
                placeholder={placeholder}
                className='w-full bg-transparent outline-none '
                value={value}
                onChange={(e)=> onChange(e)}
            />

            {type === "password" && (
                <>
                {showPassword ? (
                    <FaRegEye className='cursor-pointer' onClick={togglePasswordVisibility} size={22}/>
                ) : (
                    <FaRegEyeSlash className='cursor-pointer' onClick={togglePasswordVisibility} size={22}/>
                )}
                </>
            )}
        </div>
    </div>
    );
}

export default Input;
