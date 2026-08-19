import React from "react";
import { motion } from 'framer-motion'

const Home = () => {
  const isLoggedIn = JSON.parse(window.localStorage.getItem('user'));

  const handleButtonClick = () => {
    if (isLoggedIn) {
      window.location.href = "/postitem";
    } else {
      window.location.href = "/log-in";
    }
  };
  
  const handleButtonClickLost = () => {
    if (isLoggedIn) {
      window.location.href = "/lostItems";
    } else {
      window.location.href = "/log-in";
    }
  };
  
  const handleButtonClickFound = () => {
    if (isLoggedIn) {
      window.location.href = "/founditems";
    } else {
      window.location.href = "/log-in";
    }
  };

  return (
    <div className="flex flex-col w-full gap-[100px] items-center pt-[100px]">
      <div className="flex flex-col w-full items-center relative justify-end h-auto md:h-[450px]">
        <div className="flex flex-col md:flex-row items-end gap-10 max-w-[1440px] py-5">
          <div className="flex flex-col w-full gap-3 px-[40px] md:px-0 md:pl-[40px]">
            <h1 className="font-bold text-[#357ABD] text-[4rem] m-0">
              Find your Item!
            </h1>
            <img
              src="https://i.ibb.co/P1NQV2n/vector1.png"
              className="w-[60%]"
              alt="Vector illustration"
            />
            <p className="text-[#194067] text-lg m-0">
              We know how hard it is to lose your item, that's why we want to help you!
            </p>
            <motion.div whileTap={{ scale: 0.98 }} className="self-center md:self-auto w-[200px] md:w-auto mt-2">
              <button
                onClick={handleButtonClick}
                className="bg-[#1976d2] text-white px-6 py-2 rounded-lg font-normal hover:bg-[#115293] transition-colors w-full"
              >
                Get Started
              </button>
            </motion.div>
          </div>
          <div className="w-full hidden md:flex">
            <img
              src="https://i.ibb.co/9Z8qTQj/bg2.png"
              className="w-full"
              alt="Background"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-row w-full justify-center bg-[#357ABD] h-auto md:h-[650px]">
        <div className="flex flex-col md:flex-row h-full w-full max-w-[1440px] justify-between gap-[30px]">
          <div className="flex flex-col pl-[40px] py-[20px] md:py-0 w-full md:w-[55%] self-center md:justify-self-end max-w-[600px] gap-[30px]">
            <h2 className="text-[#FEF0E9] text-5xl m-0">
              About Us
            </h2>
            <p className="text-[#FEF0E9] m-0">
              We want to be a platform trough which our users can find those items that are so important to them. 
              <br />
              We want users to be able to publish their lost item or if they find one, help them find their owner!
            </p>
            <div className="flex flex-row justify-evenly pt-4">
              <motion.div
                whileHover={{ scale: [null, 1.1, 1.1] }}
                transition={{ duration: 0.3 }}
                whileTap={{ scale: 0.8 }}
              >
                <button
                  onClick={handleButtonClickLost}
                  className="flex flex-col items-center text-[#FEF0E9] font-bold bg-transparent border-none cursor-pointer p-0"
                >
                  <img src="https://i.ibb.co/5rKZCdX/Main-Logo-2.png" alt="Lost item logo" className="mb-2"/>
                  Lost item
                </button>
              </motion.div>

              <motion.div
                whileHover={{ scale: [null, 1.1, 1.1] }}
                transition={{ duration: 0.3 }}
                whileTap={{ scale: 0.8 }}
              >
                <button
                  onClick={handleButtonClickFound}
                  className="flex flex-col items-center text-[#FEF0E9] font-bold bg-transparent border-none cursor-pointer p-0"
                >
                  <img src="https://i.ibb.co/5rKZCdX/Main-Logo-2.png" alt="Found item logo" className="mb-2"/>
                  Found item
                </button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: [null, 1.1, 1.1] }}
                transition={{ duration: 0.3 }}
                whileTap={{ scale: 0.8 }}
              >
                <button
                  onClick={handleButtonClick}
                  className="flex flex-col items-center text-[#FEF0E9] font-bold bg-transparent border-none cursor-pointer p-0"
                >
                  <img src="https://i.ibb.co/5rKZCdX/Main-Logo-2.png" alt="Post item logo" className="mb-2"/>
                  Post a lost item
                </button>
              </motion.div>
            </div>
          </div>
          <div 
            className="w-full md:w-[55%] h-[400px] md:h-full bg-no-repeat bg-center bg-cover overflow-hidden md:[clip-path:circle(62.9%_at_60%_50%)]"
            style={{
              backgroundImage: 'url(https://www.yourzbs.com/wp-content/uploads/2019/06/The-Emotional-Side-Of-Returning-Lost-Objects.jpg)',
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
