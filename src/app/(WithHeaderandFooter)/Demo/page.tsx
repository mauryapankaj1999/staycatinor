"use client"
import React, { useState } from 'react'

export default function page() {
    const [addinputText, setAddinputText] = useState<any>([
        {
            name:'',
            room:0,
        }
    ]);


const handelAddInput = () =>{
    const addinput = [...addinputText,{name:'',room:0}]
    setAddinputText(addinput)
}


// const handelAddInput = () => {
//     const addnewInput= [...addinputText,
//         {
//             name:"",
//         }]
//     setAddinputText(addnewInput)
// }

const handelChnageinput = (index:number,value:string, key:string) => {
    let tempArr = [...addinputText]
    tempArr[index][`${key}`] = value;
    setAddinputText(tempArr)
}


// const handleChangeText = (index:number,value:string) => {
//     let tempa = [...addinputText]
//     tempa[index].name = value;
//     setAddinputText([...tempa])

// }


    return (
        <>

            <div className="w-[95%] md:w-[85%] lg:w-[85%] 2xl:w-[85%] mx-auto relative">
                <div className="my-6">
                    <div className="grid grid-cols-8 gap-4">
                        <div className="col-span-3">
                        {
                            addinputText.map((el:any, i:number) => {
                                return (
                                    <>
                                    <input type="text" value={el.name} onChange={(e)=>handelChnageinput(i,e.target.value,'name')}  />
                                    <input type="number" value={el.room} onChange={(e)=>handelChnageinput(i,e.target.value,'room')}  />
                                    </>                                     
                                    )
                                })
                            }
                            </div>
                        <div className="col-span-1">
                            <button className='bg-primarycolor text-white p-2' onClick={handelAddInput}>Add input</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
