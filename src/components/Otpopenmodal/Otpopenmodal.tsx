import Link from 'next/link';
import React, { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

import Otpinput from '../Otpinput/Otpinput';
import PaymentDetailForm from '../PaymentDetailForm/PaymentDetailForm';


export default function Otpopenmodal({ isOpen, onClose }: any) {
    if (!isOpen) return null;
    const [otp, setOtp] = useState('');
    const [OTP, setOTP] = useState("");


    const [checkoutstep, setCheckoutstep] = useState(1);
    const nextStep = () => {
        setCheckoutstep(checkoutstep + 1);
    };

    const prevStep = () => {
        setCheckoutstep(checkoutstep - 1);
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50 animate-slide-in">
            {checkoutstep === 1 && (
                <div className="bg-white p-5 h-[55vh] rounded-lg shadow-md w-full">
                    <div className="flex justify-between items-center pb-3">
                        <p className="font-montserrat font-semibold text-[1rem]">Welcome to The StayCationer</p>
                        <button onClick={onClose}><IoCloseOutline className='text-[2rem]' /></button>
                    </div>
                    <hr />
                    <p className='font-montserrat font-bold text-[1rem] my-4'>Login/Signup</p>
                    <p className='font-montserrat text-[0.9rem]'>Enter your mobile number:</p>
                    <input type="text" placeholder="+91" className="mt-2 p-2 h-[50px] border rounded-md w-full" />

                    <button className='bg-primarydark block my-3 w-full px-2 py-3 text-[0.9rem] text-[#fff] rounded-md' onClick={nextStep}>Continue</button>

                    <div className="text-center font-montserrat text-[0.9rem]">By signing up, you afree to our <Link href="/TermsandCondition" className='text-blue-600'>Terms & conditions</Link> and  <Link href="/PrivacyPolicy" className='text-blue-600'>Privacy policy</Link> </div>
                </div>
            )}
            {checkoutstep === 2 && (
                <Otpinput nextStep={nextStep} onClose={onClose} />
            )}
            {checkoutstep === 3 && (

                <PaymentDetailForm nextStep={nextStep} onClose={onClose} />
               
            )}


        </div>
    )
}
