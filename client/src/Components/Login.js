import { Formik, Form } from 'formik'
import { Link } from 'react-router-dom'
import React from "react";
import axios from "axios";
import { toast } from 'react-toastify';

function Login() {
  function login(values) {
    axios.post(`${process.env.REACT_APP_API_URL}/users/login`, {
      email: values.email,
      password: values.password,
    })
      .then((response) => {
        if (response.data.user) {
          toast.success('Logged In Successfully!', {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          window.location.href="/";
        } else {
          toast.error('Oops 🙁! Email or Password is incorrect!', {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error('Oops 🙁! Error occured.', {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      });
  }

  return (
    <div className="flex flex-col justify-center items-center w-full gap-[20px] pt-[10px]">
      <div className="flex flex-row w-full bg-[#1976d2] h-[125px] gap-[4px] items-center justify-center">
        <div className="flex flex-col relative justify-center w-full max-w-[1440px] h-[125px] overflow-hidden ml-10">
          <p className="text-[20px] text-white m-0">
            Log In
          </p>
          <p className="text-2xl text-white font-bold m-0">
            Welcome Back!
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
              email: '',
              password: '',
            }}
            onSubmit={(values) => {
              login(values);
            }}
          >
            {({ values, handleChange }) => (
              <Form>
                <div className="flex flex-col items-start gap-[10px]">
                  <div className="py-4 sm:py-0">
                    <p className="text-[20px] text-xl font-bold m-0">
                      Log In
                    </p>
                    <p className="text-[14px] text-[#1976d2] m-0">
                      Please, fill your information below
                    </p>
                  </div>
                  <div className="w-full py-4 sm:py-0">
                    <input
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1976d2]"
                      required
                      id="email"
                      type="email"
                      name="email"
                      placeholder="email@example.com"
                      value={values.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="w-full py-4 sm:py-0">
                    <input
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1976d2]"
                      required
                      id="password"
                      type="password"
                      name="password"
                      placeholder="password"
                      value={values.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-row-reverse justify-between w-full py-4">
                    <button
                      type="submit"
                      className="bg-[#1976d2] text-white text-[16px] w-[100px] py-1 rounded mx-4 md:mx-0 hover:bg-[#115293] transition-colors"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <hr className="w-full my-4 border-gray-300" />
          <div className="flex justify-center flex-row gap-[10px] mb-4">
            <p className="text-[16px] m-0">
              Don't have an account?
            </p>
            <Link
              to="/sign-up"
              className="text-[16px] text-[#1976d2] hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
