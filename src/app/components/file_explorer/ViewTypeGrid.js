
import React, { Component } from 'react'
import {connect} from 'react-redux';
import { PropTypes } from 'prop-types';

import FileTypeGrid from './FileTypeGrid';
import { setSelectedFile } from '../../actions/filesActions';

export default class ViewTypeGrid extends Component {

    constructor(props){
        super(props)
        
    }

    onFileClick(file){
        
        // if(this.props.fileSelected && this.props.fileSelected.fileId == file.fileId && file.type == 'folder'){
        //     this.props.onFolderClick(file);
        // }else{
        //     //this.props.setSelectedFile(file);
        // }

    }

    render(){
        let files;

        if(this.props.files){
            files = this.props.files.map((file, index) => (
                <FileTypeGrid key={index} file={file} ></FileTypeGrid>
            ));
        }
        
        return (
            <div className="view-type-grid">
                {files}
            </div>
        )
    }
    
}
