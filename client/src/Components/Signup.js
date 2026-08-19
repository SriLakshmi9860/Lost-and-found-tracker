import React, { useState } from "react";
import { Formik, Form } from 'formik'
import { Link } from 'react-router-dom'
import axios from "axios";
import { toast } from 'react-toastify';

import { MdPhotoCamera } from 'react-icons/md';


function Signup() {
    const [image, setImage] = useState(null);
    
    const handleImageUpload = (e) => {
        if (e.target.files[0]) {
          setImage(e.target.files[0]);
        }
    };

    function handleSubmit(values) {
      const { nickname, fullname, email, password } = values;

      const createUser = async (payload) => {
        try {
          const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/create`, payload);
          if (response.data === "Done") {
            toast.success('You are now successfully Signed up!', {
              position: "bottom-right",
              autoClose: 800,
              hideProgressBar: false,
              closeOnClick: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            window.location.href = "/log-in";
          } else {
            toast.error('Something is missing!', {
              position: "bottom-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        } catch {
          console.log("Error occurred");
        }
      };
  
      if (image) {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "Lost-and-Found");
        data.append("cloud_name", "uutsacov");

        fetch("https://api.cloudinary.com/v1_1/uutsacov/image/upload", {
          method: "post",
          body: data
        })
        .then(res => res.json())
        .then(data => {
          createUser({ nickname, fullname, email, password, img: data.secure_url });
        })
        .catch(err => console.log(err));
      } else {
        // No image — create user without one
        createUser({ nickname, fullname, email, password });
      }
    }

    return (
      <div className="flex flex-col justify-center items-center w-full gap-[20px] pt-[10px]">
        <div className="flex flex-row w-full bg-[#1976d2] h-[125px] gap-[4px] items-center justify-center">
          <div className="flex flex-col relative justify-center w-full max-w-[1440px] h-[125px] overflow-hidden ml-10">
            <p className="text-[20px] text-white m-0">
              Sign Up
            </p>
            <p className="text-2xl text-white font-bold m-0">
              Welcome On Board!
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mt-6 w-full max-w-[1440px]">
          <div className="hidden md:flex w-1/2">
            <img
              className="w-full"
              src="https://i.ibb.co/G2k63ys/login-1.png"
              alt="img"
            />
          </div>
          <div className="flex flex-col w-full md:w-[400px] mx-auto px-4 md:px-0">
            <Formik
              initialValues={{
                nickname:'',
                fullname:'',
                email: '',
                password: '',
              }}
              onSubmit={(values) => {
                handleSubmit(values)
              }}
            >
              {({
                values,
                handleChange,
              }) => (
                <Form>
                  <div className="flex flex-col items-start gap-[10px] mx-4 md:mx-auto">
                    <p className="text-[20px] text-xl font-bold m-0">
                      Sign Up
                    </p>
                    <p className="text-[14px] text-[#1976d2] m-0">
                      Please, fill your information below
                    </p>

                    <div className="flex flex-col justify-start w-full">
                      <div className="flex flex-col items-center w-full gap-2">
                        {image ? (
                          <img
                            src={URL.createObjectURL(image)}
                            className="w-24 h-24 rounded-full object-cover"
                            alt="avatar"
                          />
                        ) : (
                          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
                            Avatar
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col px-1 w-auto md:w-1/2">
                        <p className="text-[12px] mt-1 m-0">
                          Choose your profile picture
                        </p>
                      </div>
                      <div className="flex flex-row items-center gap-2 mt-2">
                        <label className="flex items-center justify-center bg-[#1976d2] text-white rounded px-4 py-2 cursor-pointer hover:bg-[#115293] transition-colors">
                          Upload <MdPhotoCamera className="ml-2" />
                          <input
                            hidden
                            accept="image/*"
                            type="file" 
                            id="image"
                            name="image" 
                            onChange={handleImageUpload}
                          />
                        </label>
                      </div>
                      
                      <input
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1976d2] mt-4"
                        type="text"
                        name="nickname"
                        placeholder="Nickname"
                        id="nickname"
                        required
                        onChange={handleChange}
                        value={values.nickname}
                      />
                    </div>

                    <div className="flex justify-start w-full mt-2">
                      <input
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1976d2]"
                        type="text"
                        name="fullname"
                        placeholder="Full Name"
                        required
                        onChange={handleChange}
                        value={values.fullname}
                      />
                    </div>

                    <div className="flex justify-start w-full mt-2">
                      <input
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1976d2]"
                        required
                        type="email"
                        name="email"
                        id="email"
                        placeholder="email@example.com"
                        onChange={handleChange}
                        value={values.email}
                      />
                    </div>

                    <div className="flex justify-start w-full mt-2">
                      <input
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1976d2]"
                        required
                        type="password"
                        name="password"
                        placeholder="password"
                        id="password"
                        onChange={handleChange}
                        value={values.password}
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-[#1976d2] text-white text-[16px] w-[100px] py-1 rounded self-end mt-4 hover:bg-[#115293] transition-colors"
                    >
                      Sign Up
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
            <hr className="w-full my-4 border-gray-300" />
            <div className="flex justify-center flex-row gap-[10px] my-4">
              <p className="text-[16px] m-0">
                Already have an account?
              </p>
              <Link
                to="/log-in"
                className="text-[16px] text-[#1976d2] hover:underline"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default Signup;
