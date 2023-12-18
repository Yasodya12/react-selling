import {Component} from "react";
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
export class Header extends Component {
    render() {
        return (
        <header className='bg-[#DDFFE7] shadow-md'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link to="/">
                    <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
                        <span className="text-#29A0B1]">Yasodya</span>
                        <span className="text-[#167D7F]">Estate</span>
                    </h1>
                </Link>


                <form

                    className='bg-white p-3 rounded-lg flex items-center'
                >
                    <input
                        type='text'
                        placeholder='Search...'
                        className='bg-transparent focus:outline-none w-24 sm:w-64'


                    />
                    <button>
                        <FaSearch className='text-slate-600' />
                    </button>
                </form>

                <ul className='flex gap-4'>
                        <Link to="/">
                            <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'>
                                Home
                            </li>
                        </Link>


                        <Link to="/about">
                            <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'>
                                About
                            </li>
                        </Link>


                            <img
                                className='rounded-full h-7 w-7 object-cover'


                            />
                            <Link to="/sign-in">
                                <li className=' text-slate-700 hover:underline cursor-pointer'> Sign in</li>
                            </Link>



                </ul>
            </div>

            <div></div>
            <div></div>
        </header>
        );
    }
}