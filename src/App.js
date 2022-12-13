import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';
import Web3 from 'web3';
import Parser from 'html-react-parser';

function App() {


  const [account, setAccount] = useState(null)
  let [web3, setWeb3] = useState(null)
  useEffect(() => {
    checkAccount()
  }, [])
  
  // invoke to connect to wallet account
  async function activate() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        checkAccount()

      } catch (err) {
        console.log('user did not add account...', err)
      }
    }
  }
  
  const chainId =  web3.eth.getChainId(); 
  const blockNumber =  web3.eth.getBlockNumber(); 
  const userAccount =  web3.eth.getAccounts();
  
  
  // invoke to check if account is already connected
  async function checkAccount() {
    let web3 = new Web3(window.ethereum)
    setWeb3(web3)
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0])
  }
  
  activate();
  

  /*
  //const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    window.ethereum.enable();
    //Web3.ethereum.getBlockNumber();
  }
  */

  return (
    <div className="App">
      <header className="App-header">
        
        <h1>Yo reergtetrkutkyty Caramel</h1>
        <div>
          <p>chainID :  blockNumber :  userAccount : </p>
        </div>

      </header>
    </div>
  );
}

export default App;
