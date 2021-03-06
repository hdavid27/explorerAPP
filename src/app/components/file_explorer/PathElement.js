import React, { Component } from 'react'

export default class PathElement extends Component {

    constructor(props){
        super(props);

        this.state = {
            pathElement: this.props.pathElement,
            selectedClass: this.props.selectedClass,
            onPathElementClick: this.props.onPathElementClick
        };
    }

    onClick(){
        this.state.onPathElementClick(this.state.pathElement.id, this.state.pathElement.name);
    };

    render(){
        return (
            <div className="pathElement" onClick={this.onClick.bind(this)}>
                <b>/</b> <p> {this.state.pathElement.name} </p>
            </div>
        )
    };


}