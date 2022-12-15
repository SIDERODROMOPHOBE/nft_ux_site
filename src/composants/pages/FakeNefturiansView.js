import Web3 from "web3";
import React, {useEffect, useState} from 'react';
import './App.css'
import fakeNft from './ABIs/FakeNefturians.json';
import { useParams } from "react-router-dom";
import { IpfsImage } from 'react-ipfs-image';


function FakeNefturiansView()
{
    const { inf } = useParams();
    const [address, setID] = useState(inf);
    const [user, setuser] = useState();
    const [error, seterror] = useState('');
    const [allTok, setToks] = useState();
    //MetaMAsk connection
    async function ConnectWallet(){

        if(window.ethereum){
          window.ethereum.request({method:'eth_requestAccounts'}).then(add=>{
            // Return the address of the wallet
            
            //console.log(res);
      }) 
        }else{
          alert("install metamask extension !")
        }
      }
      
      //Checks that metamask is well connected and on right chain, elses changes on Sepolia chain
      async function CheckChain()
      {
        let web3 = new Web3(window.ethereum);
      
        const chain = await web3.eth.getChainId();
        ;
        
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
      
    async function retrieveTok()
    {
        const abi = fakeNft.abi; 
        const adddress = "0x9bAADf70BD9369F54901CF3Ee1b3c63b60F4F0ED"; 
        let web3 = new Web3(window.ethereum);
        var Nft = new web3.eth.Contract(abi, adddress);


        const supply = await Nft.methods.totalSupply().call();
        const allNFT = [];
        try
        {

        
            for (let i = 0; i< supply; i++)  //checks all NFT id's owner and if it is the same as the parametered address
            {        
                const tested = await Nft.methods.ownerOf(i).call();
            
                if(String(tested)===String(address))
                {
                    allNFT.push(i); //stores all id possessed by addres in this array
                }
            }
        }catch(e)
        {
            seterror('🛑 ALERT ❗ : Address in parameter is incorrect, please check again.');
        }
        console.log(allNFT);
        setToks(allNFT);
    }


    useEffect(()=>{
        document.title='Nefturians Details';

        ConnectWallet();
        CheckChain();
        retrieveTok();

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
        <div>
            <br></br>
            <button onClick={retrieveTok}>Yo</button>
        <p className="error">{error}</p>
        </div>
        </>
    );
}
export default FakeNefturiansView;