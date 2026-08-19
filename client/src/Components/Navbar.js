import React, { Fragment } from 'react'
import { setConstraint } from "../constraints";
import { BsFillCaretDownFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, Transition } from '@headlessui/react'

function Navbar() {
  const token = window.localStorage.getItem("token");

  const signout = () => {
    setConstraint(false);
    localStorage.clear();
    window.location.href="/log-in";
  };

  const buttonClass = "text-[20px] font-bold text-center text-black hover:text-[#357ABD] hover:bg-transparent transition-none focus:text-[#357ABD] focus:bg-transparent";

  return (
    <div className="w-full max-w-[1440px] flex flex-row justify-between items-center rounded-b-[20px] px-3 sm:px-5 md:px-5 z-20 gap-1 bg-[#F6F8F8] mb-[10px]">
      <Link to="/">
        <div className="max-w-[180px]">
          <img
            src='https://i.ibb.co/G2851XX/Main-Logo-1.png'
            alt="logo"
            className="w-full"
          />
        </div>
      </Link>

      <div className="flex-row gap-[38px] hidden md:flex">
        {token ? (
          <div className="flex flex-row gap-[38px] hidden md:flex items-center">
            <motion.div
              whileHover={{ scale: [null, 1.05, 1.05] }}
              transition={{ duration: 0.4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link to="/" className={buttonClass}>
                Home
              </Link>
            </motion.div>
            
            <div className="relative inline-block text-left">
              <Menu as="div" className="relative inline-block text-left">
                <motion.div
                  whileHover={{ scale: [null, 1.05, 1.05] }}
                  transition={{ duration: 0.4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Menu.Button className={`${buttonClass} inline-flex w-full justify-center items-center`}>
                    Items Browser
                    <BsFillCaretDownFill className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                  </Menu.Button>
                </motion.div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/LostItems"
                            className={`${
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            Lost Items
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/FoundItems"
                            className={`${
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            Found Items
                          </Link>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>

            <motion.div
              whileHover={{ scale: [null, 1.05, 1.05] }}
              transition={{ duration: 0.4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link to="/postitem" className={buttonClass}>
                Post Item
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: [null, 1.05, 1.05] }}
              transition={{ duration: 0.4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link to="/mylistings" className={buttonClass}>
                My Listings
              </Link>
            </motion.div>
          </div>
        ) : (
          <div className="flex flex-row gap-[38px] hidden md:flex items-center">
            <motion.div
              whileHover={{ scale: [null, 1.05, 1.05] }}
              transition={{ duration: 0.4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link to="/" className={buttonClass}>
                Home
              </Link>
            </motion.div>

            <div className="relative inline-block text-left">
              <Menu as="div" className="relative inline-block text-left">
                <motion.div
                  whileHover={{ scale: [null, 1.05, 1.05] }}
                  transition={{ duration: 0.4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Menu.Button className={`${buttonClass} inline-flex w-full justify-center items-center`}>
                    Items Browser
                    <BsFillCaretDownFill className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                  </Menu.Button>
                </motion.div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/log-in"
                            className={`${
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            Lost Items
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/log-in"
                            className={`${
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            Found Items
                          </Link>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-row">
        {token ? (
          <button
            onClick={signout}
            className="hidden md:flex px-[30px] py-1 bg-[#1976d2] text-white rounded shadow-sm hover:bg-[#115293] transition-colors"
          >
            Logout
          </button>
        ) : (
          <div className="flex-row gap-[20px] hidden md:flex">
            <Link
              to="/log-in"
              className="hidden md:flex px-[30px] py-1 bg-[#1976d2] text-white rounded shadow-sm hover:bg-[#115293] transition-colors"
            >
              Login
            </Link>
            <Link
              to="/sign-up"
              className="hidden md:flex px-[30px] py-1 bg-[#1976d2] text-white rounded shadow-sm hover:bg-[#115293] transition-colors"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar;
