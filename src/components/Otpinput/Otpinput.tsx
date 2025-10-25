"use client"
import React, { useRef, useState } from 'react'

import { IoCloseOutline } from 'react-icons/io5';
export default function Otpinput({ nextStep, onClose }: any) {
    // const [OTP, setOTP] = useState<any>("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef<any>([]);

    const handleChange = (index: number, value: string) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        if (value && index < otp.length - 1) {
            inputRefs.current[index + 1].focus();
        }
        setOtp(newOtp); // update state
    };

    const handleKeyDown = (index: number, e: any) => {
        if (e.key === "Backspace" && index > 0 && !otp[index]) {
            const newOtp = [...otp];
            newOtp[index - 1] = "";
            inputRefs.current[index - 1].focus(); // focus prev digit
            setOtp(newOtp);
        }
    };

    return (

        <div className="bg-white p-5 h-[55vh] rounded-lg shadow-md w-full">
            <div className="flex justify-between items-center pb-3">
                <p className="font-montserrat font-semibold text-[1rem]">Enter otp</p>
                <button onClick={onClose}><IoCloseOutline className='text-[2rem]' /></button>
            </div>
            <hr />
            {/* <div className="">
                    {
                        inputotp.map((el,index)=>{
                            return(
                                <input type={el.inputtype} maxLength={1} className='h-[40px] w-[40px] border-[#ccc]' />
                            )
                        })
                    }
                </div> */}
            <div className="flex justify-between">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        className="h-11 w-11 rounded-sm text-center font-montserrat my-5"
                        type="number"
                        maxLength={1}
                        value={digit}
                        autoFocus={index === 0}

                        ref={(ref) => {inputRefs.current[index] = ref!; }}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}

                    />
                ))}
            </div>
            {/* <OTPInput value={OTP} onChange={setOTP} OTPLength={6} otpType="number" disabled={false} secure className='inputboxotp my-4' /> */}
            {/* <ResendOTP onResendClick={() => console.log("Resend clicked")} /> */}

            <button className='bg-primarydark block my-3 w-full px-2 py-3 text-[0.9rem] text-[#fff] rounded-md' onClick={nextStep}>Enter otp</button>

        </div>
    )
}
