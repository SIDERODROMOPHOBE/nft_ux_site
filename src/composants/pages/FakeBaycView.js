import Web3 from "web3";
import React, {useEffect, useState} from 'react';
import './App.css'
import fakeBAYC from './ABIs/FakeBAYC.json';
import { useParams } from "react-router-dom";

function FakeBaycView() 
{

    const [ID, setID] = useState();
    let {elementID} = useParams();
    useEffect(()=>{


        
        setID(String(elementID));
    
        console.log(elementID);

    },[])

    return(
        <>
        <div>
        <h1>{ID} fd</h1>
        </div>
        
        
        
        </>
    );
}
export default FakeBaycView;