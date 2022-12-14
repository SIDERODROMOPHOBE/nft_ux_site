import Web3 from "web3";
import React, {useEffect, useState} from 'react';
import './App.css'
import fakeBAYC from './ABIs/FakeBAYC.json';
import { useParams } from "react-router-dom";

function FakeBaycView() 
{
    const ID = useParams();


    return(
        <>
        <div>
        <p>{ID}</p>
        </div>
        
        
        
        </>
    );
}
export default FakeBaycView;