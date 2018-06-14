
import React, { Component } from 'react'

export const ImageButton = (props) => {

    return (
        <div className="imageButton" onClick={props.onButtonClick}>
            <img src={props.imageSrc}/>
        </div>
    )

}
