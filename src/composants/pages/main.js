import './App.css'
import React, {useEffect} from 'react';

function App() {
  useEffect(() => {
    document.title = 'Main Page';
  }, []);
    return (      

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

      <h1 className="App-header">WELCOME ON MAIN PAGE</h1>
      <div className="App-header">
        
      
        <br></br> 
  
        </div></>
    );
  } 
  
  export default App;