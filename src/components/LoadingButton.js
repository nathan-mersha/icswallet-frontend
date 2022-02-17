import React from 'react';

const LoadingButton = ({text}) => {
    return <button className='bg-gray-700 text-white px-7 rounded-md py-1 mb-5 flex justify-center space-x-2'>

        <div className="w-5 h-5  border-2 border-white border-solid rounded-full animate-spin border-t-transparent  border-b-transparent" />
        <h2>{text}</h2>
    </button>;
};

export default LoadingButton;
