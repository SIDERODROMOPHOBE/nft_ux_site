import Web3 from "web3";
import React, {useEffect, useState} from 'react';
import './App.css'
import fakeBAYC from './ABIs/FakeBAYC.json';
import { useParams } from "react-router-dom";
import { IpfsImage } from 'react-ipfs-image';



function FakeBaycView() 
{
  const { suu } = useParams();
    const [id, setID] = useState(suu);
    const [imaj, setimg] = useState(null);

    async function Getparam()
    {
      console.log("launch getparam")
      const { suu } = useParams();
      setID(suu)
      console.log(id)
    }
    
    
    
    async function GetInfo()
    {
        //JE ME SUIS FAIT BLOQUER DE L'API SALETÉ
        const url = 'https://gateway.pinata.cloud/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/'+ String(id);
        console.log(id);
        const infos = await fetch(url);
        const info = await  infos.json();        
        setimg(info.image);
        console.log(info.image);

    }
        

        //En fait https://gateway.pinata.cloud/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/
        //c'est littéralement toutes les infos qu'on veut, il manque juste le ID a la fin j'ai qu'a partir de la
        //Plutot que demander a la blockchain, Web3 js je comprends rien c'est chaud

        

    useEffect(()=>{   

    //Getparam()

    GetInfo();
    
    console.log(imaj)
    console.log(id)
    
    
    
    

    },[])


    return(
        <>

<div className='Mmenu'>
      <b><p className='menu_font'>NFT UX VITRINE WEBSITE COLLECTION</p></b>

      <a href="./chai-ninfo">
            <button className='App-logo2'>Chai-Ninfo</button>
          </a>
          <a href='./FakeBayc'>
            <button className='App-logo'>FakeBayc</button>
          </a>
          <a href="./FakeBayc/">
            <button className='App-logo2'>Token ID</button>
          </a>
      </div>

        <div>
        <p>You are actually Watching Bored Ape number {id}</p>

        
        </div>
      {imaj &&
      <>
      
      <IpfsImage hash={imaj} gatewayUrl='https://gateway.pinata.cloud/ipfs'></IpfsImage>
      
      </>
      }
       
        </>
    );
}
export default FakeBaycView; //