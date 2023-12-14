'use client'

import React from 'react'
import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable'
import { useState } from 'react';
import Image from 'next/image';

import { Button } from 'flowbite-react';
import { FaChevronLeft } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import { useRouter } from 'next/navigation';

import qrCodeService from '@/services/qrCodeService';
import useCurrentUserData from '@/hooks/useCurrentUserData';
import ButtonPDFcodeQR from '@/components/buttons/buttonPDFcodeQR';

import { PDFDownloadLink, Document,View,Text,styles, Page } from '@react-pdf/renderer';

export default function page() {
  const userData = useCurrentUserData();
  const qrCodeServ = new qrCodeService(userData ? userData.token : "");
  const dud = '1';

  const [ encodedQR, setEncodedQR ] = useState(null);
  const [ encodedImg, setEncodedImg ] = useState(null);

  const [ menuaddr, setMenuAddr ] = useState("http://example.com");

  const fetchData = useSWR(dud, qrCodeServ.getQRBusinessInformation);
  const fetchQR = useSWR(menuaddr, qrCodeServ.postGenerateQRCode);
  
  const useUpdateData = () =>{
    fetchData.mutate(dud, qrCodeServ.getQRBusinessInformation);
    fetchQR.mutate(menuaddr, qrCodeServ.postGenerateQRCode);
    //unpackData();
  };

  const router = useRouter();
  function goBackToHomepage(){
    router.push("/Homepage");
  }

  /*function unpackData() {
    let type;
    if(fetchData.data){
      type = fetchData.data.business_logo_type;
      if(fetchData.data.business_logo_type) {
      if(fetchData.data.business_logo_type == ".svg") {
        setEncodedImg("data:image/svg+xml;base64," + fetchData.data.business_logo_encoded);
      }
      else if(fetchData.data.business_logo_type == ".png" || fetchData.data.business_logo_type == ".jpg" || fetchData.data.business_logo_type == ".jpeg") {
        setEncodedImg("data:image/" + type.substring(1) + ";base64," + fetchData.data.business_logo_encoded);
      }
    }}
  }*/

  return (
    <main>
      <div
        className="static w-full h-screen bg-white bg-cover bg-center bg-[url('/binfo-background.jpg')]">
        <div className="static w-full h-full flex flex-col justify-center items-center backdrop-blur-md">
            <Button className="fixed top-10 left-10 shadow-lg rounded-md bg-black border border-none enabled:hover:bg-black focus:border-transparent focus:ring-transparent 
            bg-opacity-[0.7] enabled:hover:opacity-[1]"
                    style={{width:"5em", height:"5em"}}
                    onClick={goBackToHomepage}>
                <FaChevronLeft className='flex text-[50px] text-white'/>
            </Button>
            <Button className="fixed top-10 right-10 shadow-lg rounded-md bg-black border border-none enabled:hover:bg-black focus:border-transparent focus:ring-transparent 
                bg-opacity-[0.7] enabled:hover:opacity-[1]"
                    style={{width:"5em", height:"5em"}}
                    onClick={useUpdateData}>
                <FaArrowsRotate className='flex text-[50px] text-white'/>
            </Button>
            <div className="block font-body font-quicksand tracking-widest rounded-lg min-w-[30%] bg-black bg-opacity-[0.7] items-center justify-center p-10">
              <div className='flex flex-col flex-wrap gap-4 items-center justify-center'>
                <h1 className="mt-5 text-center text-2xl text-white font-semibold drop-shadow-lg">MENU
                    <span className="text-primary-accent1"> ONLINE</span>
                </h1>
                <React.Fragment>
                {fetchData.data ? 
                    <React.Fragment>
                      <div className='flex flex-col flex-wrap items-center justify-center'>
                        { fetchData.data.business_qr_encoded ? 
                        <Image className='drop-shadow-[0_10px_10px_rgba(0,0,0,0.2)]' 
                        width={100} height={100} alt="Uploaded Image" style={{height:"10em", width:"10em"}} src={"data:image/png;base64," + fetchData.data.business_qr_encoded}/> 
                        : null}
                      </div>
                      <div className='flex flex-col flex-wrap items-center justify-center'>
                        { fetchData.data.business_logo_encoded && fetchData.data.business_logo_encoded!='' && fetchData.data.business_logo_encoded!='null' ? 
                        <Image className='drop-shadow-[0_10px_10px_rgba(0,0,0,0.2)]' 
                        width={100} height={100} alt="Uploaded Image" style={{width:"4em", height:"4em"}} src={fetchData.data.business_logo_encoded}/> 
                        : null}
                        <h1 className='text-lg font-bold'>{fetchData.data.business_name && fetchData.data.business_name != "null" && fetchData.data.business_name != "" ?
                                                          fetchData.data.business_name : "Nome attività assente"}</h1>
                      </div>
                      <div className='flex flex-col flex-wrap items-center justify-center'>
                        <p>Telefono: {fetchData.data.business_phone_number && fetchData.data.business_phone_number != "null" && fetchData.data.business_phone_number != "" ?
                                      fetchData.data.business_phone_number : "assente"}</p>
                        <p>Indirizzo: {fetchData.data.business_address && fetchData.data.business_address != "null" && fetchData.data.business_address != "" ?
                                      fetchData.data.business_address : "assente"}</p>
                      </div>
                    </React.Fragment>
                   : 
                    <React.Fragment>
                      <div className='flex flex-col'>
                        QR code
                      </div>
                      <div className='flex flex-col flex-wrap'>
                        <p>Logo: assente</p>
                        <h1 className='text-lg font-bold'>Nome attività assente</h1>
                      </div>
                      <div className='flex flex-col flex-wrap'>
                        <p>Telefono: assente</p>
                        <p>Indirizzo: assente</p>
                      </div>
                    </React.Fragment>
                }
                </React.Fragment>
                
                <div>
                  {fetchData.data ? 
                    <ButtonPDFcodeQR name={fetchData.data.business_name} address={fetchData.data.business_address} phone_number={fetchData.data.business_phone_number}
                    logo_encoded={fetchData.data.business_logo_encoded} qr_encoded={fetchData.data.business_qr_encoded}/>
                  : null
                  }
                </div>
              </div>
            </div>
        </div>
      </div>
    </main>
  )
}

/*
<div className="flex min-h-screen flex-col items-center justify-between bg-cover bg-no-repeat bg-center bg-[url('/binfo-background.jpg')] blur-sm opacity-[0.7]" style={{zIndex: "0"}}>
        <div className='t-0 pt-10 pl-10 blur-none' style={{zIndex: "50"}}>
          <Button className="shadow-lg rounded-md bg-black border border-none enabled:hover:bg-black focus:border-transparent focus:ring-transparent opacity-[0.8] enabled:hover:opacity-[1]"
                  style={{width:"5em", height:"5em"}}
                  onClick={goBackToHomepage}>
              <FaChevronLeft className='flex text-[50px] text-white'/>
          </Button>
          <div className='flex bg-black opacity-[0.8] items-center justify-center'>
            <div></div>
            <Button>ciao</Button>
            <Button>ciao</Button>
          </div>
        </div>
      </div>
      <Button className="shadow-xl bg-primary-accent1 rounded-full border border-none enabled:hover:bg-primary-accent2
                  focus:border-transparent focus:ring-transparent font-bold text-center items-center justify-center" 
                  style={{width:'10em'}} disabled>
                    STAMPA
                  </Button>
*/