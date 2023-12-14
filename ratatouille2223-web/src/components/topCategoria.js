'use client';

import { Button } from 'flowbite-react';
import { Navbar } from 'flowbite-react';
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaChevronLeft } from "react-icons/fa";

const customTheme = {
  root: {
    inner: {
      base: "flex-1 w-2/3 mx-auto",
      fluid: "off",
    },
  },
  toggle: {
    base: "",
    icon: "",
  }
};

export default function TopCategoria() {
  
  return (
    <Navbar theme={customTheme} className="flex justify-between lg:xl:h-24 max-h-32 shadow-lg rounded-b-2xl
    bg-cover bg-center bg-[url('/header-splash.svg')] hue-rotate-[220deg] contrast-125 saturate-50"
    style={{alignItems:'center'}}>
      <div className='w-full flex justify-between' style={{alignItems:'center'}}>
        <div className='m-2 xl:scale-150' style={{width:"2.5em", height:"2.5em"}}>
          <Link href={"/Homepage"} passHref>
          <Button className="shadow-lg rounded-md bg-white border border-none enabled:hover:bg-gray-200 focus:border-transparent focus:ring-transparent"
                style={{width:"2.5em", height:"2.5em"}}
                >
            <FaChevronLeft className='flex text-xl text-primary-icon'/>
          </Button>
          </Link>
        </div>
        <div className="body-font font-quicksand drop-shadow-lg font-semibold tracking-widest uppercase text-2xl lg:xl:text-4xl">Menù - Categorie </div>
        <div className='box m-2 xl:scale-150' style={{width:"2.5em", height:"2.5em"}}>
        </div>
      </div>
    </Navbar>
  );
}
