import React from 'react';
 
export default function Heaader({ children }) {
    return (
        <header>
            <h1>{ children }</h1>
        </header>
    );
}