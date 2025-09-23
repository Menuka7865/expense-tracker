import React, { useState, useRef, useEffect } from 'react';
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

// Props: image (File|null) and setImage (function)
const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewURL, setPreviewURL] = useState(image ? URL.createObjectURL(image) : null);

  // Revoke previous object URL when component unmounts or when previewURL changes
  useEffect(() => {
    return () => {
      if (previewURL) URL.revokeObjectURL(previewURL);
    };
  }, [previewURL]);

  const handleImageChange = (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewURL(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (previewURL) {
      URL.revokeObjectURL(previewURL);
      setPreviewURL(null);
    }
  };

  const onChooseImage = () => {
    if (inputRef.current) inputRef.current.click();
  };

  return (
    <div className='flex justify-center mb-6'>
      <input
        type='file'
        accept='image/*'
        ref={inputRef}
        onChange={handleImageChange}
        className='hidden'
      />

      { !image ? (
        <div className='w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative'>
          <LuUser className='text-4xl text-slate-400' size={60} />
          <button
            type='button'
            className='w-8 h-8 flex items-center justify-center bg-violet-700 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer'
            onClick={onChooseImage}
          >
            <LuUpload className='text-white hover:text-violet-200 transition duration-200' size={20} />
          </button>
        </div>
      ) : (
        <div className='relative'>
          <img
            src={previewURL}
            alt='Profile photo'
            className='w-20 h-20 rounded-full object-cover'
          />
          <button
            type='button'
            className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer'
            onClick={handleRemoveImage}
          >
            <LuTrash className='text-white hover:text-red-200 transition duration-200' size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
