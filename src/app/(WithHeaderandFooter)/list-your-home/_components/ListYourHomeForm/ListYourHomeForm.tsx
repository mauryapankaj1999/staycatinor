import { useAddEnquiry } from "@/services/enquiry.service";
import { toastError, toastSuccess } from "@/utils/toast";
import {
  validateEmail,
  validateNumber,
  validatePhone,
  validateText,
} from "@/utils/validation";
import React, { useState } from "react";

export default function ListYourHomeForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [locationvilla, setLocationvilla] = useState("");
  const [statusnvilla, setStatusvilla] = useState("");
  const [numberofroom, setNumberofroom] = useState("");
  const [Type, SetType] = useState("");
  const [link, setLink] = useState("");
  const [message, setMessage] = useState("");
  const [expanded, setExpanded] = useState(0);

  //API
  const { mutateAsync: addEnuiry } = useAddEnquiry();

  const toggleAccordion = (index: any) => {
    setExpanded(expanded === index ? null : index);
  };

  const validate = () => {
    if (!validateText(name, "Name", true)) {
      return false;
    }
    if (!validateEmail(email, true)) {
      return false;
    }
    if (!validatePhone(phone, true)) {
      return false;
    }
    if (message === "") {
      toastError("Please enter a message");
      return false;
    }
    if (!validateText(locationvilla, "Location of Villa", true)) {
      return false;
    }
    if (!validateText(Type, "Type", true)) {
      return false;
    }
    if (!validateText(statusnvilla, "Status of Villa", true)) {
      return false;
    }
    if (!validateNumber(numberofroom, "Number of Room", true)) {
      return false;
    }
    return true;
  };

  const reset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    SetType("");
    setLocationvilla("");
    setStatusvilla("");
    setNumberofroom("");
    setLink("");
  };
  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      let isValid = validate();
      if (!isValid) return;
      let obj = {
        name: name,
        email: email,
        message: message,
        phone: phone,
        typeOfProperty: Type,
        locationvilla: locationvilla,
        statusnvilla: statusnvilla,
        numberofroom: Number(numberofroom),
        link: link,
      };
      const { data } = await addEnuiry(obj);
      if (data) {
        reset();
        toastSuccess(data.message);
      }
    } catch (error) {
      toastError("Something went wrong");
    }
  };
  return (
    <div>
      <form action="" className="bookinginput" onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="font-montserrat font-medium border-gray-100 rounded-lg focus:ring-0 focus:outline-none bg-[#f5f5f5] w-full h-12 !text-[14px]"
            placeholder="Your Name"
            name="Name"
            value={name}
            onChange={(e) => {
              // Remove any digits from the input
              const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
              setName(value);
            }}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="font-montserrat font-medium border-gray-100 rounded-lg focus:ring-0 focus:outline-none bg-[#f5f5f5] w-full h-12 !text-[14px]"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value.replace(/[^a-zA-Z0-9@._-]/g, ""))
            }
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className=" font-montserrat font-medium border-gray-100 rounded-lg focus:ring-0 focus:outline-none bg-[#f5f5f5] w-full h-12 !text-[14px]"
            placeholder="Phone"
            maxLength={10}
            value={phone}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "").slice(0, 10);
              setPhone(value);
            }}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="location Villa"
            className=" font-montserrat font-medium border-gray-100 rounded-lg focus:ring-0 focus:outline-none bg-[#f5f5f5] w-full h-12 !text-[14px]"
            placeholder="Location Of Villa"
            value={locationvilla}
            onChange={(e) => setLocationvilla(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className=" font-montserrat font-medium border-gray-100 rounded-lg focus:ring-0 focus:outline-none bg-[#f5f5f5] w-full h-12 !text-[14px]"
            placeholder="Status of Villa"
            name="Status of Villa"
            value={statusnvilla}
            onChange={(e) => setStatusvilla(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className=" font-montserrat font-medium border-gray-100 rounded-lg focus:ring-0 focus:outline-none bg-[#f5f5f5] w-full h-12 !text-[14px]"
            placeholder="Number of room "
            name="Number of room"
            value={numberofroom}
            min={1}
            onChange={(e) => {
              const cleaned = e.target.value.replace(/\D/g, "");
              setNumberofroom(cleaned);
            }}
          />
        </div>
        <div className="mb-3">
          <select
            id="Type"
            className="bg-[#f5f5f5] border font-montserrat font-medium border-gray-100 rounded-lg h-12 w-full py-3 px-6 focus:outline-none focus:ring-0 !text-[14px]"
            value={Type}
            onChange={(e) => SetType(e.target.value)}
          >
            <option value="" disabled>
              Type of Property
            </option>
            <option value="Villa">Villa</option>
            <option value="Cottage">Cottage</option>
            <option value="Bunglow">Bunglow</option>
            <option value="Apartment">Apartment</option>
            <option value="HomeStay">HomeStay</option>
          </select>
        </div>
        <div className="mb-3">
          <input
            type="text"
            className=" font-montserrat font-medium border-gray-100 rounded-lg focus:ring-0 focus:outline-none bg-[#f5f5f5] w-full h-12 !text-[14px]"
            placeholder="Photos/ Website/ Airbnb Link (if any)"
            value={link}
            name="Photos/ Website/ Airbnb Link (if any)"
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className=" font-montserrat font-medium border-gray-100 rounded-lg focus:ring-0 focus:outline-none bg-[#f5f5f5] w-full h-12 !text-[14px]"
            placeholder="Enter message"
            value={message}
            name="message"
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <button className="bg-[#da6633] py-3 px-5 font-montserrat font-medium text-white rounded-md block w-full text-[16px]">
          Submit
        </button>
      </form>
    </div>
  );
}

{
  /* <div className="mb-3">
                        <select
                          id="Villa"
                          className="bg-[#f5f5f5] border font-montserrat border-gray-300 font-medium border-none text-[#767676] 2xl:text-[0.9rem] lg:text-[0.8rem] rounded-lg  h-12  right-0 w-full py-3 px-6  focus:outline-none focus:ring-0"
                        >
                          <option value="" selected disabled>
                            Location Of Villa
                          </option>
                          <option
                            value="Manali"
                            className="font-montserrat font-medium text-[#767676] lg:p-2"
                          >
                            {" "}
                            Manali{" "}
                          </option>
                          <option
                            value="Mussoorie"
                            className="font-montserrat font-medium text-[#767676] lg:p-2"
                          >
                            {" "}
                            Mussoorie{" "}
                          </option>
                          <option
                            value="Nainital"
                            className="font-montserrat font-medium text-[#767676] lg:p-2"
                          >
                            {" "}
                            Nainital{" "}
                          </option>
                          <option
                            value="Nainital"
                            className="font-montserrat font-medium text-[#767676] lg:p-2"
                          >
                            {" "}
                            Nainital{" "}
                          </option>
                          <option
                            value="Nainital"
                            className="font-montserrat font-medium text-[#767676] lg:p-2"
                          >
                            {" "}
                            Nainital{" "}
                          </option>
                          <option
                            value="Nainital"
                            className="font-montserrat font-medium text-[#767676] lg:p-2"
                          >
                            {" "}
                            Nainital{" "}
                          </option>
                          <option
                            value="Nainital"
                            className="font-montserrat font-medium text-[#767676] lg:p-2"
                          >
                            {" "}
                            Nainital{" "}
                          </option>
                          <option
                            value="Nainital"
                            className="font-montserrat font-medium text-[#767676] lg:p-2"
                          >
                            {" "}
                            Nainital{" "}
                          </option>
                          <option
                            value="Nainital"
                            className="font-montserrat font-medium text-[#767676] lg:p-2"
                          >
                            {" "}
                            Nainital{" "}
                          </option>
                        </select>
                      </div> */
}
{
  /* <div className="mb-3">
                        <select
                          id="Status"
                          className="bg-[#f5f5f5] border font-montserrat border-gray-300 font-medium border-none text-[#767676] 2xl:text-[0.9rem] lg:text-[0.8rem] rounded-lg  h-12  right-0 w-full py-3 px-6  focus:outline-none focus:ring-0"
                        >
                          <option value="" selected disabled>
                            Status of Villa
                          </option>
                          <option
                            value="Manali"
                            className="font-montserrat font-medium text-[#767676] lg:p-2"
                          >
                            {" "}
                            Manali{" "}
                          </option>
                          <option
                            value="Mussoorie"
                            className="font-montserrat font-medium text-[#767676] lg:p-2"
                          >
                            {" "}
                            Mussoorie{" "}
                          </option>
                          <option
                            value="Nainital"
                            className="font-montserrat font-medium text-[#767676] lg:p-2"
                          >
                            {" "}
                            Under-construction{" "}
                          </option>
                          <option
                            value="Nainital"
                            className="font-montserrat font-medium text-[#767676] lg:p-2"
                          >
                            {" "}
                            Mussoorie{" "}
                          </option>
                          <option
                            value="Nainital"
                            className="font-montserrat font-medium text-[#767676] lg:p-2"
                          >
                            {" "}
                            Nainital{" "}
                          </option>
                          <option
                            value="Nainital"
                            className="font-montserrat font-medium text-[#767676] lg:p-2"
                          >
                            {" "}
                            Manali{" "}
                          </option>
                          <option
                            value="Nainital"
                            className="font-montserrat font-medium text-[#767676] lg:p-2"
                          >
                            {" "}
                            Nainital{" "}
                          </option>
                          <option
                            value="Nainital"
                            className="font-montserrat font-medium text-[#767676] lg:p-2"
                          >
                            {" "}
                            Nainital{" "}
                          </option>
                          <option
                            value="Nainital"
                            className="font-montserrat font-medium text-[#767676] lg:p-2"
                          >
                            {" "}
                            Nainital{" "}
                          </option>
                        </select>
                      </div> */
}
