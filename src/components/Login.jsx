import React from 'react';
import hp_logo from '../images/hp_logo.png';
import user_img from '../images/user_img.png';
import lock_img from '../images/lock_img.png';
import {useNavigate} from 'react-router-dom';


// rgb(232, 240, 254) #E8F0FE
// #f1f1f1

const Login = () => {

    const navigate = useNavigate();


    return (
        <div>
            <div className='text-center'>
                <img src={hp_logo} alt="hp_logo" className='m-auto md:w-1/5 sm:w-2/5' />
            </div>
            <div className='flex flex-col m-auto w-3/5'>
                <div className=" items-center mb-3 p-2 phoneno flex border-none bg-[#f1f1f1] rounded-md">
                    <img src={user_img} alt="user" className='h-5 border-r-2 pr-2 border-solid border-gray-300' />
                    <input type="text" placeholder='Phone number' name="phone_no" id="phone_no" className='pl-1 bg-[#f1f1f1]  outline-none' />
                </div>

                <div className=" items-center p-2 passowrd flex border-none bg-[#f1f1f1] rounded-md">
                    <img src={lock_img} alt="user" className='h-5 border-r-2 pr-2 border-solid border-gray-300' />
                    <input type="password" placeholder='Login password' name="password" id="pwrd" className='pl-1 bg-[#f1f1f1] outline-none' />
                </div>

                <div className='mt-16'>
                    <button onClick={()=>navigate('/home')} className='bg-[#0096D5] w-full pt-2 pb-2 text-lg text-white rounded-md shadow-md shadow-[#0096D5]
                    '>Login</button>
                </div>

                <div className="options flex justify-between mt-2">
                    <div className='text-[#379EFE] cursor-pointer' onClick={()=>navigate('/register')}>Register</div>
                    <div className='cursor-pointer text-[#379EFE] ' onClick={()=>navigate('/forgot')}>Forget password?</div>
                </div>

            </div>
        </div>
    )
}

export default Login