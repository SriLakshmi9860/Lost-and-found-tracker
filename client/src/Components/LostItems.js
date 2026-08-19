import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion'
import { FcAbout, FcOvertime } from 'react-icons/fc';
import { Link } from 'react-router-dom'
import { setConstraint } from "../constraints";
import Axios from "axios";
import PaginationComponent from "./PaginationComponent";

export default function LostItems() {
  const user_info = JSON.parse(localStorage.getItem("user"));

  setConstraint(true);
  
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);

  useEffect(() => {
    Axios.get("http://localhost:4000/items")
      .then((response) => {      
        const allItems = response.data.items.reverse();
        const itemsPerPage = 9;
        setMaxPages(Math.ceil(allItems.length / itemsPerPage));

        const startIndex = (page - 1) * itemsPerPage;
        const data = allItems.slice(startIndex, startIndex + itemsPerPage);

        const filtered = data
          .filter((item) => item.type === "Lost")
          .map((item) => {
            const created_date = new Date(item.createdAt);
            const createdAt =
              created_date.getDate() + "/" +
              created_date.getMonth() + "/" +
              created_date.getFullYear() + " " +
              created_date.getHours() + ":" +
              created_date.getMinutes();
            
            const isOwner = item.userId === user_info._id;
          
            return (
              <motion.div
                whileHover={{ scale: [null, 1.05, 1.05] }}
                transition={{ duration: 0.4 }}
                key={item._id}
              >
                <div className="w-[270px] h-[400px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-lg bg-white flex flex-col">
                  <div className="rounded-lg p-2 flex flex-col gap-4">
                    <div className="flex items-center justify-center relative bg-[#9CC0DF] h-[200px] rounded-lg">
                      <div className="rounded-[7rem] overflow-hidden w-[190px] h-[190px]">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-col px-[11px] gap-[11px]">
                      <h2 className="text-[25px] font-bold m-0 flex items-center justify-start gap-[16px] truncate">
                        {item.name}
                      </h2>
                    </div>

                    <div className="flex flex-row w-full gap-[15px] px-[11px]">
                      <FcAbout className="text-[25px] min-w-[25px]" />
                      <p className="text-[16px] text-black w-full truncate m-0">
                        {item.description.toString().slice(0, 30)} ...
                      </p>
                    </div>

                    <div className="flex flex-row w-full gap-[15px] pb-[19px] pt-[11px] px-[11px]">
                      <FcOvertime className="text-[25px] min-w-[25px]" />
                      <p className="ml-[5px] text-[16px] text-black truncate m-0">
                        {createdAt}
                      </p>
                    </div>

                    <motion.div whileTap={{ scale: 0.98 }} className="px-[11px]">
                      <Link
                        to={`/${item.name}?cid=${item._id}&type=${item.type}/${isOwner}`}
                        className="inline-block bg-[#1976d2] text-white text-center rounded-lg w-[140px] py-[6px] text-sm font-medium hover:bg-[#115293] transition-colors"
                      >
                        More Details
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          });

        setItems(filtered);
      })
      .catch((err) => {
        console.log("Error :", err);
      });
  }, [page, user_info._id]);

  return (     
    <>
      <div className="flex flex-row w-full bg-[#357ABD] h-[125px] gap-1 items-center justify-center">
        <div className="flex flex-col relative justify-center w-full max-w-[1440px] h-[125px] overflow-hidden ml-6 sm:ml-10 md:ml-20">
          <p className="text-[18px] sm:text-[22px] md:text-[25px] text-white m-0">
            Welcome {user_info.nickname} 👋!
          </p>
          <p className="text-[17px] sm:text-[21px] md:text-[23px] text-white font-bold m-0">
            Here you can find the Lost Items
          </p>
        </div>
      </div>

      <div className="flex flex-row flex-wrap justify-center pt-[20px] gap-[24px] max-w-[1440px] mx-auto">
        {items}
      </div>
  
      <PaginationComponent page={page} setPage={setPage} max={maxPages} />
    </>
  );
}
