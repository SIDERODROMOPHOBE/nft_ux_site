import Web3 from "web3";
import React, {useEffect, useState} from 'react';
import './App.css';
import fakeNeft from './ABIs/FakeNefturians.json';

function FakeNefturians()
{
    
const [address, setAddress] = useState();
const [price,setprice]= useState();

const [idv,setidv]=useState();

const [msg,setmsg]=useState("");
const [msg2,setmsg2]=useState("");

async function ConnectWallet(){

    if(window.ethereum){
      window.ethereum.request({method:'eth_requestAccounts'}).then(address=>{
        
        setAddress(address);
  }) 
    }else{
      alert("install metamask extension !")
    }
}

async function GetPrice()
{
    let web3 = new Web3(window.ethereum);
    const Nft = new web3.eth.Contract(fakeNeft.abi,'0x9bAADf70BD9369F54901CF3Ee1b3c63b60F4F0ED');

    let bal = await Nft.methods.tokenPrice().call();
    //let bal =parseInt(price,16)
    const bal2 = bal/10**18;

    setprice(bal2);
}
async function BuyTok()
{
    let web3 = new Web3(window.ethereum);
    const Nft = new web3.eth.Contract(fakeNeft.abi,'0x9bAADf70BD9369F54901CF3Ee1b3c63b60F4F0ED');
    

    await Nft.methods.buyAToken().send({ from: String(address), value: String(price*1.0001* 10**18 ) });
    const res = await Nft.methods.totalSupply().call();
    
    setidv(res-1)
    
    setmsg("Nft successfully purchased ! Your token ID is " + String(idv))  //un peu buggé je ne comprends pas pk mais renvoe Undefined 1 fois
                                                                            //puis ensuite fonctionne correctement
    

}



useEffect(()=>{
    ConnectWallet();
    GetPrice();
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
      </div>

      <div>
        <br></br>
        <a className="Sus" onClick={BuyTok}>
            Buy a Neftarian NFT ! Price : {price} ETH
        </a>
        <p className="writing">{msg}</p>
      </div>
        </>
);
}
export default FakeNefturians;