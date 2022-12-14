import Web3 from "web3";
import React, {useEffect, useState} from 'react';
import './App.css'
import fakeBAYC from './ABIs/FakeBAYC.json';

function FakeBayc() 
{

    const [address, setAddress] = useState(null);
    const [customMessage, setMsg] = useState(null);

    const [TokenQtt, setqtt] = useState(null);
    const [TokenName, setname] = useState(null);
    const [symbol, setsym] = useState(null);


//Connect to metamask et tout le tralala
    
async function ConnectWallet(){

    if(window.ethereum){
      window.ethereum.request({method:'eth_requestAccounts'}).then(address=>{
        // Return the address of the wallet
        setAddress(address);
        //console.log(res);
  }) 
    }else{
      alert("install metamask extension !")
    }
  }
    
  async function CheckChain()
  {
    let web3 = new Web3(window.ethereum);
  
    const chain = await web3.eth.getChainId();
    
    //Switch to Sepolia Network if not on it
    if (chain !==11155111)
    {
      setMsg("🛑ALERT❗ : YOU ARE NOT ON SEPOLIA NETWORK \n Please interact with MetaMask to change network");
    
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{chainId : web3.utils.toHex(11155111) }],
          });
          setMsg("");
      
  
    }
  } //Does not handle case where Sepolia Is not installed on metamask because j'ai un peu la flemme sorry not sorry
  //En vrai je pourrais le copier sur stack overflow, je fais ca apres




//Contract handling part


async function GetFBinfo()
{
  let web3 = new Web3(window.ethereum);
  const FBC = new web3.eth.Contract(fakeBAYC.abi,'0x1dA89342716B14602664626CD3482b47D5C2005E');
  
  const su = await FBC.methods.tokenCounter().call();
  setqtt(su);

  const sud = await FBC.methods.symbol().call();
  setsym(sud);

  const nor = await FBC.methods.name().call();
  setname(nor);
}




useEffect(()=>{

  document.title = 'FakeBayc';
  ConnectWallet();
  CheckChain();
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
      </div>
        <div>
            <center><h1>Bienvenue sur la page Fake Bayc</h1></center>
            <h1 className="error">{customMessage}</h1>

            <p className="App-header">The token name is {TokenName} and its symbol is {symbol}</p>
            <p className="App-header">Currently, {TokenQtt} FakeBayc Token have already been created !</p>
            
        </div>


        <div>
          <a className="Sus" href="">
            CLICK TO CLAIM YOUR OWN BORED APE AND JOIN THE YACHT CLUB &#40;Safe&#41;
          </a>
        </div>
        </>
    );
}
export default FakeBayc;