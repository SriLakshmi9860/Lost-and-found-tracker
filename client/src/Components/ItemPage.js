import React, { useState, useEffect, Fragment } from "react";
import { setConstraint } from "../constraints";
import { motion } from 'framer-motion'
import { toast } from 'react-toastify';
import axios from "axios";
import { Carousel } from 'react-carousel-minimal'
import { MdDateRange, MdDelete, MdContacts } from 'react-icons/md'
import { GrMap } from 'react-icons/gr'
import { Dialog, Transition } from '@headlessui/react'

function ItemPage() {
  const [item, setItem] = useState(null);
  const [itemDetails, setItemDetails] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [showContact, setShowContact] = useState(false);

  setConstraint(true);

  const queryParams = new URLSearchParams(window.location.search);
  const item_id = queryParams.get('cid');
  const current_user = queryParams.get('type').split("/")[1];
  
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/items/${item_id}`)
      .then((response) => {
        const data = response.data.item;
        
        const slides = data.img.map((imgUrl) => ({ image: imgUrl }));
        
        setItem(data);


        setItemDetails(
          <>
            <div className="flex flex-col w-full px-4 sm:px-8 md:px-20 gap-[30px] mt-[20px]">
              <div className="flex flex-col sm:flex-row w-full justify-evenly items-center gap-0 sm:gap-[15px]">
                <div className="flex w-full sm:w-1/2 md:w-[750px] h-[280px] mt-[10px]">
                  <Carousel
                    data={slides}
                    width="100%"
                    height="270px"
                    radius="10px"
                    dots={false}
                    automatic={false}
                    slideBackgroundColor="#dbdbdb"
                    slideImageFit="contain"
                    thumbnails={false}
                    thumbnailWidth="100px" 
                  />
                </div>

                <div className="flex flex-col justify-center w-full sm:w-1/2 md:w-[400px] p-[15px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[5px] gap-[10px]">
                  <div className="flex flex-row w-full border-[3px] border-solid border-[#1976d2] rounded-[10px] gap-[10px] items-center justify-center p-[10px]">
                    <div className="flex w-full md:w-[40%] items-center justify-center">
                      <img
                        src={data?.userId?.img}
                        className="w-[80px] h-[80px] sm:w-[95px] sm:h-[95px] md:w-[110px] md:h-[110px] rounded-full object-cover"
                        alt="User"
                      />
                    </div>
                    <div className="flex w-full md:w-[60%]">
                      <p className="text-[20px] sm:text-[25px] font-bold mx-0 md:mx-auto text-[#1976d2] m-0">
                        {data?.userId?.fullname}
                      </p>
                    </div>
                  </div>

                  {current_user === "true" ? (
                    <button
                      onClick={() => setShowDelete(true)}
                      className="bg-[#1976d2] text-white rounded-lg flex items-center justify-center py-2 px-4 hover:bg-[#115293] transition-colors"
                    >
                      <motion.div
                        whileHover={{ scale: [null, 1.05, 1.05] }}
                        transition={{ duration: 0.4 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center"
                      >
                        <MdDelete className="mr-2" size={20}/> Delete Post
                      </motion.div>
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowContact(true)}
                      className="bg-[#1976d2] text-white rounded-lg flex items-center justify-center py-2 px-4 hover:bg-[#115293] transition-colors"
                    >
                      <motion.div
                        whileHover={{ scale: [null, 1.05, 1.05] }}
                        transition={{ duration: 0.4 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center"
                      >
                        <MdContacts className="mr-2" size={20}/> Contact
                      </motion.div>
                    </button>
                  )}
                </div>
              </div>

              <div className="flex flex-row w-full">
                <div className="overflow-hidden text-ellipsis w-full">
                  <p className="text-[18px] m-0 font-bold">
                    Description:
                  </p>
                  <p className="text-[16px] m-0 indent-[100px] text-justify">
                    {data.description}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col w-full px-6 sm:px-10 md:px-24 gap-[15px]">
              <div className="flex flex-col w-full mt-[30px]">
                <div className="w-full h-[3px] bg-[#1976d2]" />
                <div className="flex flex-row w-full h-[60px] items-center gap-[15px]">
                  <div className="flex flex-row justify-end w-[49%] gap-[8px] items-center">
                    <MdDateRange className="text-[20px]" />
                    <p className="text-[15px] m-0 font-bold">
                      Date Found:
                    </p>
                  </div>
                  <div className="w-[3px] h-[80%] bg-[#1976d2]" />
                  <div className="flex flex-row justify-start w-[49%] items-center">
                    <p className="text-[15px] m-0">
                      {data?.date}
                    </p>
                  </div>
                </div>
                <div className="w-full h-[3px] bg-[#1976d2]" />
                <div className="flex flex-row w-full min-h-[60px] items-center gap-[15px]">
                  <div className="flex flex-row justify-end w-[49%] gap-[8px] items-center">
                    <GrMap className="text-[20px]" />
                    <p className="text-[15px] m-0 font-bold">
                      Location Found:
                    </p>
                  </div>
                  <div className="w-[3px] h-[80%] bg-[#1976d2]" />
                  <div className="flex flex-row justify-start w-[49%] py-[15px] items-center">
                    <p className="text-[15px] m-0">
                      {data?.location}
                    </p>
                  </div>
                </div>
                <div className="w-full h-[3px] bg-[#1976d2]" />
              </div>
            </div>
          </>
        );
      })
      .catch((err) => {
        console.log("Error :", err);
      });
  }, [item_id, current_user]);

  const deleteItem = () => {
    axios.delete(`${process.env.REACT_APP_API_URL}/items/delete/${item_id}`)
      .then(() => {
        setShowDelete(false);
        toast.success('Item kicked to 🗑️ successfully!', {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        window.location.href = "/mylistings";
      })
      .catch((err) => {
        console.log("Error" + err);
      });
  };

  return (
    <>
      <div className="flex flex-col w-full items-center pt-[10px]">
        <div className="flex flex-row w-full bg-[#357ABD] h-[125px] gap-1 items-center justify-center">
          <div className="flex flex-col relative justify-center w-full max-w-[1440px] h-[125px] overflow-hidden ml-6 sm:ml-10 md:ml-20">
            <p className="text-[18px] sm:text-[22px] md:text-[25px] text-white m-0">
              {`${item?.type} Item`}
            </p>
            <p className="text-[17px] sm:text-[21px] md:text-[23px] text-white font-bold m-0">
              {'Someone Found'} {item?.name}
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center w-full max-w-[1440px]">
          {itemDetails}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Transition appear show={showDelete} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setShowDelete(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[410px] transform overflow-hidden rounded-[20px] bg-[#eff5ff] p-6 text-left align-middle shadow-xl transition-all flex flex-col items-center justify-center gap-[20px]">
                  <p className="text-[18px] m-0 font-bold">
                    Are you sure ?
                  </p>
                  <div className="flex flex-row w-full justify-evenly items-center gap-4">
                    <button
                      className="bg-[#1976d2] text-white rounded-lg py-2 px-6 hover:bg-[#115293] transition-colors"
                      onClick={deleteItem}
                    >
                      <motion.div
                        whileHover={{ scale: [null, 1.05, 1.05] }}
                        transition={{ duration: 0.4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Yes
                      </motion.div>
                    </button>
                    <button
                      className="bg-[#1976d2] text-white rounded-lg py-2 px-6 hover:bg-[#115293] transition-colors"
                      onClick={() => setShowDelete(false)}
                    >
                      <motion.div
                        whileHover={{ scale: [null, 1.05, 1.05] }}
                        transition={{ duration: 0.4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        No
                      </motion.div>
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Contact Info Modal */}
      <Transition appear show={showContact} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setShowContact(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[410px] transform overflow-hidden rounded-[20px] bg-[#eff5ff] p-6 text-left align-middle shadow-xl transition-all flex flex-col items-center justify-center gap-[20px]">
                  <p className="text-[18px] m-0 font-bold">
                    {item?.userId?.fullname}'s Contact :
                  </p>
                  <div className="flex flex-row w-full justify-evenly items-center gap-4">
                    <p className="text-[16px] m-0">
                      {item?.number}
                    </p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default ItemPage;
