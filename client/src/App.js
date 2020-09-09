import React from 'react';
import './App.css';
import Base from './components/Base';
import { CookiesProvider } from 'react-cookie';

function App() {
    return (
        <div className="App">
            <CookiesProvider>
                <Base />
            </CookiesProvider>
        </div>
    );
}

export default App;
