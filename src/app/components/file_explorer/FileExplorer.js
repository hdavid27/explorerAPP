
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import { fetchFiles } from './../../actions/filesActions';
import { VIEW_TYPE_GRID, VIEW_TYPE_LIST } from './../../actions/types';

//icons
import removeIcon from './../../../assets/images/icon-remove-black.svg';
import createIcon from './../../../assets/images/icon-create-folder-black.svg';


import PathElement from './PathElement';
import { ImageButton } from './buttons/ImageButton';

class FileExplorer extends Component {

    constructor(props){
        super(props);

        this.state = {
            viewType: VIEW_TYPE_GRID,
            pathArray: [
                {id:'root', name:'root'}
            ]
        }

    }

    componentWillMount(){
        this.props.fetchFiles();
    }

    componentWillReceiveProps(nextProps){

    }

    onRemoveFolderClick(e){
        console.log('onRemoveFolderClick');
        
    }

    onCreateFolderClick(e){
        console.log('onCreateFolderClick');

    }

    onPathElementClick(id, path){
        console.log('onPathElementClick: ' + id + ':' + path);
    }

    render() {

        const pathElements = this.state.pathArray.map((ele, index) =>(
            <PathElement key={ele.id} pathElement={ele} selectedClass={(index == this.state.pathArray.length -1) ? "selected" : ""} onPathElementClick={this.onPathElementClick.bind(this)}></PathElement>
        ));

        return (
            <div className="file-explorer-component">
                <div className="explorer-nav">
                    <div className="path-container">
                        {pathElements}
                    </div>
                    <div className="icons-container">
                        <ImageButton imageSrc={createIcon} onButtonClick={this.onCreateFolderClick.bind(this)}></ImageButton>
                        <ImageButton imageSrc={removeIcon} onButtonClick={this.onRemoveFolderClick.bind(this)}></ImageButton>
                    
                    </div>
                </div>

                <div className="explorer-container">

                </div>
            </div>
        )
    }
}

FileExplorer.protoTypes = {
    fetchFiles: PropTypes.func.isRequired,
    files: PropTypes.array.isRequired
}

const mapStateToProps = function(state){
    console.log('STATE', state);
    return {
        files: state.filesReducer.files
    }
}

export default connect(mapStateToProps, {fetchFiles} )(FileExplorer);
