import { MdPhotoCamera } from 'react-icons/md';
import React, { useState } from "react";
import axios from "axios";
import { motion } from 'framer-motion'
import { toast } from 'react-toastify';
import { Formik, Form } from 'formik'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase.js'
import * as Yup from 'yup';


const LostItem = () => {
  const usertoken = window.localStorage.getItem("token");
  const userId = JSON.parse(window.localStorage.getItem('user'))?._id;
  const config = { headers: { token: usertoken } };

  const [image, setImage] = useState(null);

  const schema = Yup.object().shape({
    name: Yup.string().required('Item name is required'),
    description: Yup.string().required('Description is required'),
    type: Yup.string().required('Item type is required'),
    location: Yup.string().required('Location is required'),
    date: Yup.string().required('Date is required'),
    number: Yup.string().required('Phone number is required'),
  });

  const handleImageUpload = (e) => {
    setImage(e.target.files);
  };

  const handleSubmit = async (values) => {
    try {
      await schema.validate(values, { abortEarly: false });
    } catch (error) {
      const errorMessages = error.inner.map((err) => err.message);
      toast.error(errorMessages.join('\n'), {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
  
    if (!image || image.length === 0) {
      toast.error('Please upload atleast one image', {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
  
    // Upload all images to Firebase and collect URLs
    const promises = [];
    for (let i = 0; i < image.length; i++) {
      const img = image[i];
      const storageRef = ref(storage, `/images/${img.name}`);
      const fileRef = ref(storageRef, img.name);
      const uploadTask = uploadBytesResumable(fileRef, img);

      const promise = new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
          () => {}, // progress callback (not used)
          (error) => {
            console.log(error);
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then(resolve)
              .catch(reject);
          }
        );
      });
  
      promises.push(promise);
    }
  
    Promise.all(promises)
      .then((urls) => {
        const newItem = { ...values, img: urls };
        axios.post('http://localhost:4000/Items/newItem', newItem, config)
          .then(() => {
            toast.success('Wohoo 🤩! Item listed successfully.', {
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
          .catch((error) => {
            console.log("An error occurred:", error);
            toast.error('Oops 🙁! Something went wrong.', {
              position: "bottom-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          });
      })
      .catch((error) => {
        console.log("An error occurred:", error);
        toast.error('Oops 🙁! Something went wrong.', {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };
  
  return (
    <div className="flex flex-col w-full pt-[60px] items-center">
      <p className="text-[30px] text-[#1976d2] font-bold text-center px-4">
        If your item is lost or you found someone's item, Post it Here!
      </p>
      <div className="flex flex-col md:flex-row w-full max-w-[1440px] justify-center md:justify-evenly items-center mt-8">
        <Formik
          initialValues={{
            name: '',
            userId: userId,
            description: '',
            type: '',
            location: '',
            date: '',
            number: '',
          }}
          validationSchema={schema}
          onSubmit={(values) => {
            handleSubmit(values)
          }}
        >
          {({
            values,
            handleChange
          }) => (
            <div className="w-full max-w-lg mb-4 mx-4 md:mx-0 px-4 sm:px-0">
              <div className="border border-gray-300 rounded shadow-sm p-6 sm:p-8 bg-white my-12">
                <Form className="flex flex-col gap-4">
                  <div className="pt-[10px]">
                    <p className="text-lg font-bold m-0 mb-2">Picture</p>
                    <div className="flex flex-row items-center gap-2">
                      <label className="flex items-center justify-center bg-[#1976d2] text-white rounded px-4 py-2 cursor-pointer hover:bg-[#115293] transition-colors">
                        Upload <MdPhotoCamera className="ml-2" />
                        <input
                          hidden
                          accept="image/*"
                          multiple
                          type="file" 
                          id="image"
                          name="image" 
                          onChange={handleImageUpload}
                        />
                      </label>
                      {image && image.length > 0 && (
                        <p className="text-sm text-gray-500 m-0 ml-2">
                          {image.length} file(s) selected
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-lg font-bold m-0 mb-2">Item Details</p>
                  </div>

                  <div className="w-full">
                    <input
                      className="w-full border-b border-gray-300 px-0 py-2 text-sm focus:outline-none focus:border-[#1976d2] transition-colors"
                      required
                      id="name"
                      name="name"
                      placeholder="Item name"
                      value={values.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="w-full">
                    <textarea
                      className="w-full border-b border-gray-300 px-0 py-2 text-sm focus:outline-none focus:border-[#1976d2] transition-colors resize-none"
                      required
                      id="description"
                      name="description"
                      placeholder="Description"
                      rows="3"
                      value={values.description}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="w-full">
                    <input
                      className="w-full border-b border-gray-300 px-0 py-2 text-sm focus:outline-none focus:border-[#1976d2] transition-colors"
                      required
                      id="location"
                      name="location"
                      placeholder="Where did you find/lose it?"
                      value={values.location}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="w-full">
                    <input
                      className="w-full border-b border-gray-300 px-0 py-2 text-sm focus:outline-none focus:border-[#1976d2] transition-colors"
                      required
                      id="date"
                      name="date"
                      placeholder="When did you find/lose it?"
                      value={values.date}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="w-full">
                    <input
                      className="w-full border-b border-gray-300 px-0 py-2 text-sm focus:outline-none focus:border-[#1976d2] transition-colors"
                      required
                      id="number"
                      name="number"
                      placeholder="How can we contact you?"
                      value={values.number}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="w-full mt-2">
                    <label htmlFor="type" className="block text-sm text-gray-600 mb-1">
                      Item Type
                    </label>
                    <select
                      className="w-full border-b border-gray-300 px-0 py-2 text-sm focus:outline-none focus:border-[#1976d2] transition-colors bg-white"
                      id="type"
                      name="type"
                      value={values.type}
                      onChange={handleChange}
                    >
                      <option value="" disabled>Select type</option>
                      <option value="Lost">Lost It</option>
                      <option value="Found">Found It</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1 m-0">
                      Please select the type of item
                    </p>
                  </div>

                  <div className="mt-4">
                    <motion.div whileTap={{ scale: 0.98 }}>
                      <button
                        type="submit"
                        className="bg-[#1976d2] text-white rounded px-4 py-2 hover:bg-[#115293] transition-colors"
                      >
                        Create post
                      </button>
                    </motion.div>
                  </div>
                </Form>
              </div>
            </div>
          )}
        </Formik>

        <motion.div
          whileHover={{ scale: [null, 1.05, 1.05] }}
          transition={{ duration: 0.4 }}
          className="hidden md:flex justify-center items-center w-full max-w-[450px]"
        >
          <img
            width="100%"
            src="https://i.ibb.co/Q65DB0d/list-item.png"
            alt="Post illustration"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default LostItem;