
import React, { Component } from 'react'

export const TextImageButton = (props) => {

    let buttonCotent;

    if(props.iconPosition == 'left'){
        buttonCotent = <div>
                            <img src={props.imageSrc}/><p>{props.text}</p>
                        </div>
    }

    if(props.iconPosition == 'right'){
        buttonCotent = <div>
                            <p>{props.text}</p> <img src={props.imageSrc}/>
                        </div>
    }

    return (
        <div className="textImageButton" onClick={props.onButtonClick}>
            {buttonCotent}
        </div>
    )

}
