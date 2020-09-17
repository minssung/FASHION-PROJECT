import React from 'react';
import './App.css';
// import Base from './components/Base';
import { CookiesProvider } from 'react-cookie';
import Home from './components/Home';
// import Login from './components/Login';
// import UserInfo from './components/UserInfo';

function App() {
    return (
        <div className="App">
            <CookiesProvider>
                {/* <Base /> */}
                <Home />
            </CookiesProvider>
        </div>
    );
}

export default App;
