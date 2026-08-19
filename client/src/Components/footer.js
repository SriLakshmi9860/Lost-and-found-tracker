import React from 'react'
import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs'

const Footer = () => {
    return (
        <div className="flex flex-col w-full pt-[85px]">
            <div className="flex flex-col w-full h-[130px] bg-[#357ABD] py-[10px] px-[40px] justify-center">
                <div className="flex flex-row justify-between h-full border-t-[3px] border-white pt-[15px]">
                    <p className="text-[16px] font-light text-white self-center m-0">
                        © 2023 All Rights Reserved
                    </p>

                    <div className="flex flex-row gap-[15px] justify-end self-center">
                        <a target="_blank" rel='noreferrer' href="https://www.instagram.com/">
                            <BsInstagram className="text-[30px] text-white" />
                        </a>
                        <a target="_blank" rel='noreferrer' href="https://www.facebook.com/">
                            <BsFacebook className="text-[30px] text-white" />
                        </a>
                        <a target="_blank" rel='noreferrer' href="https://www.twiter.com/">
                            <BsTwitter className="text-[30px] text-white" />
                        </a>
                    </div>
                </div>
                <a
                    href="https://github.com/KcMelek/Lost-Found-MERN"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[12px] text-white mx-auto opacity-50 hover:opacity-100 transition-opacity"
                >
                    GitHub
                </a>
            </div>
        </div>
    )
}

export default Footer
