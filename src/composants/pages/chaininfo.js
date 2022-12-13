import Web3 from "web3";
import React, {useEffect, useState} from 'react';




function Chaininfo() {



    const [add, setAddress] = useState(null);
    const [chain, setChain] = useState(null); 
    const [block, setBlock] = useState(null);
    const [balance, setBalance] = useState(null);



    const url="https://sepolia.infura.io/v3/0ae36070e132411d93ee3041178c40ae";
    const address = '0x359CB556a84aA5A12181cf0338ac93b418f6dF5C';
    //setAddress(myaddress);

    const providerUrl = process.env.PROVIDER_URL || "https://sepolia.infura.io/v3/0ae36070e132411d93ee3041178c40ae";


    //MetaMAsk connection
async function ConnectWallet(){

  if(window.ethereum){
    window.ethereum.request({method:'eth_requestAccounts'}).then(res=>{
      // Return the address of the wallet
      console.log(res) 
}) 
  }else{
    alert("install metamask extension !")
  }
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
    console.log(bal)})
}
    



getBalance();



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



    return (
      <div className="App-header">
        <center>
        <h1>WELCOME ON CHAI-NINFO PAGE</h1>

        <br></br>

        <h2>Actual balance on {address} address is : {balance} ETH.</h2> 
        
        <h2>Last Block mined is block number :{}</h2>

        </center>
        
      </div>
    );
  } 

  export default Chaininfo;