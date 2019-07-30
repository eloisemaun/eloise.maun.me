import React from 'react';
import './App.css';
import Resume from './Resume';

function App(props) {
  const contactInfo = {
    name:  'Eloise Maun',
    phone: '(802) 793-2515',
    email: 'eloise@maun.me'
  }
  
    return (
    <div id='game-page-layout'>
      <NavBar name={contactInfo.name} phone={contactInfo.phone} email={contactInfo.email} />
      <Resume />
    </div>
  );
}

function NavBar(props) {
    return (
        <div className="navbar justify-content-center fixed-top bg-white b-bottom">
          <div className='m-0 p-2'>
            <h1 className='m-0 text-center'>{props.name}</h1>
            <p className="m-0 text-center">{props.phone} &mdash; {props.email}</p>
          </div>
        </div>
    );
}

export default App;