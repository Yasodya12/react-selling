import React, {Component} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking, FaShare} from "react-icons/fa";

export class Listing extends Component {
    render() {
        return (
            <main>


                    <div>
                        <Swiper navigation>

                                <SwiperSlide >
                                    <div
                                        className='h-[550px]'
                                        style={{

                                        }}
                                    ></div>
                                </SwiperSlide>

                        </Swiper>
                        <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
                            <FaShare
                                className='text-slate-500'

                            />
                        </div>

                            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
                                Link copied!
                            </p>

                        <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
                            <p className='text-2xl font-semibold'>

                            </p>
                            <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
                                <FaMapMarkerAlt className='text-green-700' />

                            </p>
                            <div className='flex gap-4'>
                                <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>

                                </p>

                                    <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                                     OFF
                                    </p>

                            </div>
                            <p className='text-slate-800'>
                                <span className='font-semibold text-black'>Description - </span>

                            </p>
                            <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
                                <li className='flex items-center gap-1 whitespace-nowrap '>
                                    <FaBed className='text-lg' />

                                </li>
                                <li className='flex items-center gap-1 whitespace-nowrap '>
                                    <FaBath className='text-lg' />

                                </li>
                                <li className='flex items-center gap-1 whitespace-nowrap '>
                                    <FaParking className='text-lg' />

                                </li>
                                <li className='flex items-center gap-1 whitespace-nowrap '>
                                    <FaChair className='text-lg' />

                                </li>
                            </ul>

                                <button

                                    className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'
                                >
                                    Contact landlord
                                </button>


                        </div>
                    </div>

            </main>
        );
    }
}