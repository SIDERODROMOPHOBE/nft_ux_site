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
    const [imaj, setimg] = useState();
    const [params, setparams] = useState();
    const [chain, setChain] = useState(); 
    const [errorM, seterror] = useState('');
    const [address, setAddress] = useState('');
    const [owner, setowner] = useState();
    
    
    async function GetInfo()
    {

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
          try
          {
            par += " Attribute : "+info.attributes[i].trait_type + "  Value : "+info.attributes[i].value + '  \n  '
          }
          catch(error)
          {
            console.log(error)
          }
          
        }
        setparams(par);
        }
        catch(error)
        {
          //Add error page ici
          seterror('🛑 ALERT ❗ : Entered ID is wrong, please check again your value')
          console.log(error)
          
        }


    }
        
    //MetaMAsk connection
async function ConnectWallet(){

  if(window.ethereum){
    window.ethereum.request({method:'eth_requestAccounts'}).then(add=>{
      // Return the address of the wallet
      setAddress(add);
      //console.log(res);
}) 
  }else{
    alert("install metamask extension !")
  }
}

//Whecks that metamask is well connected andon right chain, elses changes on Sepolia chain
async function CheckChain()
{
  let web3 = new Web3(window.ethereum);

  const chain = await web3.eth.getChainId();
  setChain(chain);
  console.log(chain);
  
  //Switch to Sepolia Network if not on it
  if (chain !==11155111)
  {
    seterror("🛑ALERT❗ : YOU ARE NOT ON SEPOLIA NETWORK \n Please interact with MetaMask to change network");
  
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{chainId : web3.utils.toHex(11155111) }],
        });
        seterror("");
    

  }
} //Does not handle case where Sepolia Is not installed on metamask because j'ai un peu la flemme sorry not sorry



    useEffect(()=>{   

      
    document.title='Bored Apes Details';

    seterror('');

    ConnectWallet();
    CheckChain();
    
    GetInfo();
    
    
    
    },[])


    return(
        <>

<div className='Mmenu'>
      <b><p className='menu_font'>NFT UX VITRINE WEBSITE COLLECTION</p></b>

      <a href="chai-ninfo">
            <button className='App-logo2'>Chai-Ninfo</button>
          </a>
          <a href='FakeBayc'>
            <button className='App-logo'>Bored Apes</button>
          </a>
          <a href="./FakeBayc/0">
            <button className='App-logo2'>Bored Apes infos</button>
          </a>
          <a href='FakeNefturians'>
            <button className='App-logo'>Fake Nefturians</button>
          </a>
          <a href="./FakeNefturians/0">
            <button className='App-logo2'>Nefturians infos</button>
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

      <p className="writing" >{params}</p>
      </div>
      
      <p className="error">{errorM}</p>
       </>
    )
}
export default FakeBaycView; //