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
    const [params, setparams] = useState();

    const [errorM, seterror] = useState('');
    
    const [owner, setowner] = useState();
    
    
    async function GetInfo()
    {
        //JE ME SUIS FAIT BLOQUER DE L'API SALETÉ
        const url = 'https://gateway.pinata.cloud/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/'+ String(id);

        const abi = fakeBAYC.abi; 
        const contract_address = "0x1dA89342716B14602664626CD3482b47D5C2005E"; 
        let web3 = new Web3(window.ethereum);
        var FBC = new web3.eth.Contract(abi, contract_address);


        try 
        {
        
        
        const owner = await FBC.methods.ownerOf(id).call();
        setowner("Current owner of this Ape is : " + String(owner));

        const URIret = await FBC.methods.tokenURI(id).call();
        
        const infos = await fetch(URIret);
        
        const info = await  infos.json();   
          
        setimg(info.image);


        let par=""
        for(let i = 0; i<7;i++)
        {
          
          par += " Attribute : "+info.attributes[i].trait_type + "  Value : "+info.attributes[i].value + '  \n  '
        }
        setparams(par);
        }
        catch(error)
        {
          //Add error page ici
          seterror('🛑 ALERT ❗ : Entered ID is wrong, please check again your value')
          //console.log(error)
        }


    }
        

        //En fait https://gateway.pinata.cloud/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/
        //c'est littéralement toutes les infos qu'on veut, il manque juste le ID a la fin j'ai qu'a partir de la
        //Plutot que demander a la blockchain, Web3 js je comprends rien c'est chaud

        

    useEffect(()=>{   

    //Getparam()
    seterror('');
    GetInfo();
    
    
    
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

        <div >
        <p className="writing">You are actually Watching Bored Ape number {id}</p>
        <p className="writing">{owner}</p>

        
        </div>
      {imaj &&
      <>
      
      <IpfsImage hash={imaj} gatewayUrl='https://gateway.pinata.cloud/ipfs'></IpfsImage>
      
      </>
      }
      <div className="writing">

      <p>{params}</p>
      </div>
      
      <p className="error">{errorM}</p>
       </>
    )
}
export default FakeBaycView; //