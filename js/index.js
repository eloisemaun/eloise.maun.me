import React from 'react';
import ReactDOM from 'react-dom';
import '../main.css';

function StandardPageLayout(props) {
  return (
    <div id='game-page-layout'>
      <NavBar name='Eloise Maun' phone='(802) 793-2515' email='eloise@maun.me'/>
    </div>
  )
}

function NavBar(props) {
    return (
        <div class="navbar navbar-default navbar-fixed-top">
            <h1>{props.name}</h1>
            <p class="contact">{props.phone} &mdash; {props.email}</p>
        </div>
}


// ========================================

ReactDOM.render(
  <StandardPageLayout />, 
  document.getElementById('root')
);
