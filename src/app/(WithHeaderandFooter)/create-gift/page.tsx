'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import galleryimg from '@/assets/allimg/bigimg.webp'
import galleryimg1 from '@/assets/allimg/bigimg1.webp'
import galleryimg2 from '@/assets/allimg/bigimg2.webp'
import galleryimg3 from '@/assets/allimg/bigimg3.webp'
import galleryimg4 from '@/assets/allimg/bigimg4.webp'
import galleryimg5 from '@/assets/allimg/bigimg5.webp'
import galleryimg6 from '@/assets/allimg/bigimg6.webp'
import {
  ICreateGift,
  IGiftInfo,
  useAddCreateGift,
} from '@/services/createGift.service'
import toast from 'react-hot-toast'
import {
  validateEmail,
  validateNumber,
  validatePhone,
  validateText,
} from '@/utils/validation'
import { useSession } from 'next-auth/react'
import { send } from 'process'

export default function page() {
  const [toinput, setToinput] = useState(true)
  const listgalleryimg = [
    {
      gallerimg: galleryimg,
    },
    {
      gallerimg: galleryimg1,
    },
    {
      gallerimg: galleryimg2,
    },
    {
      gallerimg: galleryimg3,
    },
    {
      gallerimg: galleryimg4,
    },
    {
      gallerimg: galleryimg5,
    },
    {
      gallerimg: galleryimg6,
    },
    {
      gallerimg: galleryimg2,
    },
  ]
  const [selectedimg, setSelectedimg] = useState(listgalleryimg[0].gallerimg)
  const [sender, setSender] = useState<IGiftInfo>({})
  const [receiver, setReceiver] = useState<IGiftInfo>({})
  const [amount, setAmount] = useState(0)
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const { mutateAsync: createData } = useAddCreateGift()
  const reset = () => {
    setSender({})
    setReceiver({})
    setAmount(0)
    setTitle('')
    setMessage('')
    setToinput(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (amount === 0) return toast.error('Amount should be greater than 0')
    if (
      !validateNumber(String(amount), 'Amount', true) ||
      !validateText(title, 'Title', true) ||
      !validateText(message, 'Message', true) ||
      !validateText(sender.name as string, "Sender's Name", true) ||
      !validateEmail(sender.email as string, true) ||
      !validatePhone(sender.phone as string, true) ||
      !validateText(receiver.name as string, "Receiver's Name", true) ||
      !validateEmail(receiver.email as string, true) ||
      !validatePhone(receiver.phone as string, true)
    ) {
      return
    }
    if (sender.phone === receiver.phone) {
      return toast.error('Sender and Receiver phone number should not be same')
    }
    const data: ICreateGift = {
      sender: sender,
      receiver: receiver,
      amount: amount,
      title: title,
      message: message,
    }
    try {
      const { data: res } = await createData(data)
      if (res.message) {
        toast.success('Gift created successfully')
        reset()
      }
    } catch (error) {
      console.error('Error creating gift:', error)
      toast.error('Failed to create gift. Please try again.')
    }
  }

  return (
    <>
      <div className='w-[95%] md:w-[85%] lg:w-[75%] mx-auto md:py-10 py-6'>
        <div className='grid !grid-cols-2 md:!grid-cols-12 gap-6'>
          <div className='!col-span-2 md:!col-span-5'>
            <div className='border-[#ddd] shadow-lg rounded-xl p-3 md:p-7 sticky top-0'>
              <div className='2xl:h-[322px] lg:h-[222px] h-[200px] w-full relative mb-6'>
                <Image
                  src={selectedimg}
                  alt=''
                  fill
                  className='object-cover rounded-lg'
                />
              </div>

              <ul className='grid grid-cols-4 gap-4'>
                {listgalleryimg.map((el: any, index) => {
                  return (
                    <>
                      <li
                        key={index}
                        onClick={() => setSelectedimg(el.gallerimg)}
                        className={`rounded-md ${
                          selectedimg === el.gallerimg
                            ? 'border-[#da6633] border-[2px]'
                            : ''
                        } `}
                      >
                        <div className='2xl:h-[88px] h-[60px] md:h-[50px] w-[100%] relative cursor-pointer rounded-md'>
                          <Image
                            src={el.gallerimg}
                            alt='image'
                            fill
                            className='object-cover rounded-md'
                          />
                        </div>
                      </li>
                    </>
                  )
                })}
              </ul>
            </div>
          </div>
          <div className='border-[#ddd] shadow-lg rounded-xl p-3 md:p-7 !col-span-2 md:!col-span-7'>
            <p className='2xl:text-[28px] lg:text-[24px] text-[18px] mb-5 font-montserrat font-semibold'>
              Activate this gift card{' '}
            </p>
            <form action='' onSubmit={handleSubmit}>
              <div className='mb-2 md:mb-4'>
                <label
                  htmlFor=''
                  className='font-montserrat font-semibold text-navibule mb-2 md:mb-4 !text-[14px] inline-block'
                >
                  Enter gift amount
                </label>
                <input
                  type='text'
                  className=' font-montserrat font-medium border-gray-300 rounded-lg
                  focus:ring-0 focus:outline-none  w-full  !text-[14px] lg:h-[45px] 2xl:h-[64px] bg-[#f5f5f5]'
                  placeholder='Enter Gift Amount'
                  value={amount}
                  onChange={(e) => {
                    const cleaned = e.target.value.replace(/\D/g, '')
                    setAmount(Number(cleaned))
                  }}
                />
              </div>
              <div className='mb-2 md:mb-4'>
                <label
                  htmlFor=''
                  className='font-montserrat font-semibold !text-[14px] text-navibule mb-2 md:mb-4 inline-block'
                >
                  Message
                </label>
                <input
                  type='text'
                  className=' font-montserrat font-medium border-gray-300 rounded-lg focus:ring-0 focus:outline-none !text-[14px] w-full lg:h-[45px] 2xl:h-[64px] bg-[#f5f5f5] mb-4'
                  placeholder='Title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  rows={7}
                  cols={7}
                  className='textareainput font-montserrat focus:outline-none focus:border-transparent block !text-[14px] p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Write your message here...'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>

              <div className='mb-2 md:mb-4'>
                <label
                  htmlFor=''
                  className='font-montserrat font-semibold text-navibule mb-2 md:mb-4 inline-block !text-[14px]'
                >
                  From
                </label>
                <input
                  type='text'
                  className='mb-2 md:mb-4 font-montserrat font-medium border-gray-300 !text-[14px] rounded-lg focus:ring-0 focus:outline-none  w-full lg:h-[45px] 2xl:h-[64px] bg-[#f5f5f5]'
                  placeholder={`Sender's name`}
                  value={sender.name}
                  onChange={(e) =>
                    setSender({ ...sender, name: e.target.value })
                  }
                />
                <input
                  type='email'
                  className='mb-2 md:mb-4 font-montserrat font-medium border-gray-300 !text-[14px] rounded-lg focus:ring-0 focus:outline-none  w-full lg:h-[45px] 2xl:h-[64px] bg-[#f5f5f5]'
                  placeholder={`Sender's email`}
                  value={sender.email}
                  onChange={(e) =>
                    setSender({ ...sender, email: e.target.value })
                  }
                />
                <input
                  type='text'
                  className='mb-2 md:mb-4 font-montserrat font-medium border-gray-300 !text-[14px] rounded-lg focus:ring-0 focus:outline-none  w-full lg:h-[45px] 2xl:h-[64px] bg-[#f5f5f5]'
                  placeholder={`Sender Mobile Number`}
                  value={sender.phone}
                  maxLength={10}
                  onChange={(e) => {
                    const cleaned = e.target.value.replace(/\D/g, '')
                    setSender({ ...sender, phone: cleaned })
                  }}
                />
              </div>
              {/* <label className=" flex items-center gap-2 mb-3 md:mb-5">
                <input type="checkbox" onClick={() => setToinput(!toinput)} />
                <div className="font-montserrat !text-[14px] md:text-[1rem]">
                  Send an E-Gift Card
                </div>
              </label> */}

              {toinput ? (
                <div className='mb-2 md:mb-4'>
                  <label
                    htmlFor=''
                    className='font-montserrat text-navibule mb-2 md:mb-4 inline-block font-semibold !text-[14px]'
                  >
                    To
                  </label>
                  <input
                    type='text'
                    className='mb-2 md:mb-4 font-montserrat font-medium border-gray-300 rounded-lg focus:ring-0 focus:outline-none !text-[14px] w-full lg:h-[45px] 2xl:h-[64px] bg-[#f5f5f5]'
                    placeholder={`Recipient name`}
                    value={receiver.name}
                    onChange={(e) =>
                      setReceiver({ ...receiver, name: e.target.value })
                    }
                  />
                  <input
                    type='email'
                    className='mb-2 md:mb-4 font-montserrat font-medium border-gray-300 rounded-lg focus:ring-0 focus:outline-none  !text-[14px] w-full lg:h-[45px] 2xl:h-[64px] bg-[#f5f5f5]'
                    placeholder={`Recipient email`}
                    value={receiver.email}
                    onChange={(e) =>
                      setReceiver({ ...receiver, email: e.target.value })
                    }
                  />
                  <input
                    type='text'
                    className='mb-2 md:mb-4 font-montserrat font-medium border-gray-300 rounded-lg focus:ring-0 focus:outline-none !text-[14px]  w-full lg:h-[45px] 2xl:h-[64px] bg-[#f5f5f5]'
                    placeholder={`Recipient Mobile Number`}
                    value={receiver.phone}
                    maxLength={10}
                    onChange={(e) => {
                      const cleaned = e.target.value.replace(/\D/g, '')
                      setReceiver({ ...receiver, phone: cleaned })
                    }}
                  />
                </div>
              ) : (
                ''
              )}

              <div className=''>
                <button
                  type='submit'
                  className='!bg-[#da6633] py-3 px-5 font-montserrat font-medium text-white rounded-md block w-full'
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

{
  /* <div className="w-[95%] md:w-[70%] mx-auto md:py-10 py-10">
<div className="mb-8">


<div className="custom_arrowwithslider">

  <Slider {...settings}>
  {
    listgalleryimg.map((el: any, index) => {
                return (
                  <>
                  <div className="">

                    <div key={index} onClick={() => setSelectedimg(el.gallerimg)} className={`mr-5 ${selectedimg === el.gallerimg ? 'border-[#202a37] border-[2px]  rounded-md' : ''} `}>
                      <div className="2xl:h-[88px] lg:h-[60px] h-[60px] w-[100%] relative cursor-pointer rounded-xl">
                        <Image src={el.gallerimg} alt='image' fill className='object-cover rounded-xl' />
                      </div>
                      <div className="2xl:h-[88px] lg:h-[60px] h-[60px] w-[100%] relative cursor-pointer rounded-xl">
                        <Image src={el.gallerimg} alt='image' fill className='object-cover rounded-xl' />
                      </div>
                  </div>
                    </div>
                  </>
                )
              })
            }
</Slider>
</div>
</div>
</div> */
}
