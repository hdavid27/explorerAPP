
import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export const Home = (props) =>  {

    return (
        <div className="home-component">
        
            <h1>Explorer App</h1>

            <h4><Link className="" to="/fileexplorer">Explore!</Link></h4>

        </div>
    )
    
}
