import Web3 from "web3";
import React, {useEffect, useState} from 'react';
import './App.css'
import fakeBAYC from './ABIs/FakeBAYC.json';
import { useParams } from "react-router-dom";
import { IpfsImage } from 'react-ipfs-image';



function FakeBaycView() 
{

    const [ID, setID] = useState(82);
    const [imaj, setimg] = useState(null);

    const { suu } = useParams();   
    console.log(suu)
    useEffect(()=>{
        setID(suu);
    },[]) 

    async function GetInfo()
    {
      console.log(ID);    //JE ME SUIS FAIT BLOQUER DE L'API SALETÉ
        let url = 'https://gateway.pinata.cloud/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/'+ String(suu);
        console.log(ID);
        let infos = await fetch(url);
        let info =await  infos.json();
        
        console.log(info.attributes[1].value);
    }
        //let web3 = new Web3(window.ethereum);
        //const FBC = new web3.eth.Contract(fakeBAYC.abi,'0x1dA89342716B14602664626CD3482b47D5C2005E');    

        /*let hurl = await FBC.methods.tokenURI(ID).call();
        
        let resp = await fetch(hurl);
        let resp2 = resp.json();*/ //OUI J'AI TRICHE J'AVOUE MAIS LE CODE NE MARCHE ABSOLUMENT PAS
        // CA FAIT 1H30 QUE JESSAYE TOUT JE VEUX MOURIR TANT PIS POUR LES ATTRIBUTS
        //const img = String(resp2.image);

        //setimg(img)
        //img.replace("ipfs://", "https://ipfs.io/ipfs/").then(res=>console.log);

        //En fait https://gateway.pinata.cloud/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/
        //c'est litté ralement toutesles infos qu'on veut, il manque juste le ID a la fin j'ai qu'a partir de la
        //Plutot que demander a la blockchain, Web3 js je comprends rien c'est chaud

        

        
    


    useEffect(()=>{

    //for (let i = 0; i < 100; i++) {
        
    setID(suu);           
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

        <div>
        <p>You are actually Watching Bored Ape number {ID}</p>

        
        </div>
        </>
    );
}
export default FakeBaycView;