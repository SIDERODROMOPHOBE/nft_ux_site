import Web3 from "web3";
import React, {useEffect, useState} from 'react';
import './App.css'



function Chaininfo() {

    const [add, setAddress] = useState(null);
    const [chain, setChain] = useState(null); 
    const [block, setBlock] = useState(null);
    const [balance, setBalance] = useState(null);

    const [customMessage, setMsg] = useState(null);


    const address = '0x359CB556a84aA5A12181cf0338ac93b418f6dF5C';
    

    //MetaMAsk connection
async function ConnectWallet(){

  
  //let web3 = new Web3(window.ethereum);
  
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
  
async function InitializeVars()
{
  //Get actual wallet balance
  getBalance();

  //get last block mined number
  getLastBlock();
}

    //Get balance of the account
async function getBalance(){

  
  window.ethereum.request({
    method:'eth_getBalance', 
    params: [address, 'latest']
}).then(balance => {
    
    var bal = parseInt(balance,16);
    bal = bal/10**18;
    setBalance(bal);
    //console.log(bal)
  })
}

async function getLastBlock(){

  
  let w3 = new Web3(window.ethereum);
  const lastB = await w3.eth.getBlockNumber(); 
  
  setBlock(lastB);
    
  //console.log(lastB)
  
}


async function CheckChain()
{
  let web3 = new Web3(window.ethereum);

  const chain = await web3.eth.getChainId();
  setChain(chain);
  console.log(chain);
  
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
}




/*
async function getAddress(){
  const accounts = await web3.eth.getAccounts();
  return accounts;
}


ConnectWallet();
//getBalance();



/*
      window.ethereum.request({
        method:'eth_getBalance', 
        params: [address, 'latest']
    }).then(balance => {
        // Return string value to convert it into int balance
        var bal = parseInt(balance,16);
        bal = bal/10**18;
        setBalance(bal);
        console.log(bal)})

    /*
    useEffect(()=>{

      const web3 = new Web3(providerUrl);

      let provider=window.ethereum;

      if(typeof provider !== 'undefined'){
        provider.request({method: 'eth_requestAccounts'}).then(accounts => {
          console.log(accounts);
        }).catch(err => {
          console.log(err);
        })
      }

    },[]);*/

    
    useEffect(()=>{
      ConnectWallet();
      CheckChain();
      
    
      InitializeVars();
    },[])
  
    

    return (
      <div className="App-header">
        <center>
        <h1>WELCOME ON CHAI-NINFO PAGE</h1>

        <h1>{customMessage}</h1>

        <br></br>
        <h2>Current Chain ID is : {chain}</h2>
        <h2>Actual balance on {add} address is : {balance} ETH.</h2> 
        
        <h2>Last Block mined is block number : {block}</h2>

        </center>
        
      </div>
    );
  
  }
  export default Chaininfo;