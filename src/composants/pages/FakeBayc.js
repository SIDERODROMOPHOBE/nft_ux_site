import Web3 from "web3";
import React, {useEffect, useState} from 'react';
import './App.css'
import fakeBAYC from './ABIs/FakeBAYC.json';

function FakeBayc() 
{
  

    const [address, setAddress] = useState(null);
    const [customMessage, setMsg] = useState(null);

    const [customMessage2, setMsg2] = useState(null);

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

async function ClaimToken()
{

  CheckChain();
  let web3 = new Web3(window.ethereum);
  const FBC = new web3.eth.Contract(fakeBAYC.abi,'0x1dA89342716B14602664626CD3482b47D5C2005E');

  await FBC.methods.claimAToken().send({from:String(address)});
  
  setMsg2("Congratulations ! You received a Bored Ape NFT ! Try Token ID page to see it !")

}

useEffect(()=>{

  document.title = 'Bored Apes Infos';
  ConnectWallet();
  CheckChain(); 
  GetFBinfo();
},[])

return(

      <>
      
      <div className='Mmenu'>
      <b><p className='menu_font'>NFT UX VITRINE WEBSITE COLLECTION</p></b>

      <a href="/chai-ninfo">
            <button className='App-logo2'>Chai-Ninfo</button>
          </a>
          <a href='/FakeBayc'>
            <button className='App-logo'>Bored Apes</button>
          </a>
          <a href="/FakeBayc/0">
            <button className='App-logo2'>Bored Apes infos</button>
          </a>
          <a href='/FakeNefturians'>
            <button className='App-logo'>Fake Nefturians</button>
          </a>
          <a href="/FakeNefturians/0">
            <button className='App-logo2'>Nefturians infos</button>
          </a>
      </div>
      
        <div>
            <center><h1 className="writing">Bienvenue sur la page Fake Bayc</h1></center>
            <h1 className="error">{customMessage}</h1>

            <p className="App-header">The token name is {TokenName} and its symbol is {symbol}</p>
            <p className="App-header">Currently, {TokenQtt} FakeBayc Token have already been created !</p>
            
        </div>


        <div>
          <a className="Sus"  onClick={ClaimToken}>
            CLICK TO CLAIM YOUR OWN BORED APE AND JOIN THE YACHT CLUB &#40;Safe&#41;
          </a>
          <p>{customMessage2}</p>

          
        </div>


        
        </>
    );
}
export default FakeBayc;