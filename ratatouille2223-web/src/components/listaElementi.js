'use client';
import React, { useEffect, useState } from 'react';
import { Table } from 'flowbite-react';
import { Button } from 'flowbite-react';
import ButtonPDF from './buttons/buttonPDF';
import ButtonMore from './buttons/buttonMore';
import ButtonSecondaLingua from './buttons/buttonSecondaLingua';
import ButtonModificaElemento from './buttons/buttonModificaElemento';
import ButtonConfirmElimina from './buttons/buttonConferma';
import { IoTrashOutline } from "react-icons/io5";
import elementiService from '@/services/elementiService';

import { FaTrashAlt  } from "react-icons/fa";

export default function ListaElementi({alertsControl, data, error, isLoading, updateAction, categoria}) {
    const [ secondaLingua, setSecondaLingua ] = useState(false);
    // const test = "Mioci,mario,michele,MinerG";
    // const num = 1;
    // let array = [{value:1}];
    // const [arr, setArr] = useState({});
    // const [valore,setValore] = useState(1);
    // function oneTime(){
    //     test.split(",").forEach((e)=>{
    //         setArr(arr=>({...arr, [valore]: e}))
    //         setValore(valore+1);
    //     })
    // }
    // console.log(
    //     arr
    // );
    async function deleteElemento(args){
        const nomeElemento = args;
        const elementiServ = new elementiService();
        const res = await elementiServ.deleteElementoPerNome(categoria,nomeElemento);
        if(res){
            (res.result == "true" ? alertsControl.setAlertSuccessState(true) : null);
        }
    }
    if(isLoading) 
        return ( 
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell>Caricamento...</Table.Cell>
            </Table.Row>
        );
    if(!data || error){
    return ( 
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell>Errore con il caricamento!</Table.Cell>
        </Table.Row>)
    }
    
    if(!Array.isArray(data.elements) && data.elements)
        data.elements = null;

    return (
        <React.Fragment>
        {data.elements ? 
        data.elements.map(({
            name, last_modified, price, allergens, second_name,
        }) => (
            <React.Fragment key={name}>
            <Table.Row key={name} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell >
                        {secondaLingua && (second_name != "null") ? second_name : name}
                    </Table.Cell>
                    <Table.Cell>{price}</Table.Cell>
                    <Table.Cell>{last_modified}</Table.Cell>
                    <Table.Cell>
                    <Button.Group className='flex flex-row items-center gap-2 drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.4)]
                        justify-end'>
                        <ButtonSecondaLingua onClickAction={()=>{setSecondaLingua(!secondaLingua)}}/>
                        <ButtonMore/>
                        {/* <ButtonModificaElemento refreshAction={updateAction} alertsControl={alertsControl} 
                            oldName={name} 
                            oldPrice={price} 
                            oldAllergens={data.allergens ? null: null } 
                            oldIngredients={null} 
                        /> */}
                        <p>TODO</p>
                        <ButtonConfirmElimina refreshAction={updateAction} argsConfermaAction={name} clickConfermaAction={deleteElemento} icona={<FaTrashAlt className='text-xl'/>}>
                            Eliminare l'elemento selezionato?
                        </ButtonConfirmElimina>
                    </Button.Group>
                    </Table.Cell>
            </Table.Row>
            </React.Fragment>
        )) : 
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell>Errore con il caricamento!</Table.Cell>
        </Table.Row>
        }
        </React.Fragment>
    );
}