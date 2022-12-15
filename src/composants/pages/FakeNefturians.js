import Web3 from "web3";
import React, {useEffect, useState} from 'react';
import './App.css';
import fakeBAYC from './ABIs/FakeNefturians.json';

function FakeNefturians()
{
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
        </>
    );
}
export default FakeNefturians;