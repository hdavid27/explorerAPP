
import React, { Component } from 'react'
import {connect} from 'react-redux';
import { PropTypes } from 'prop-types';

import FileTypeList from './FileTypeList';

export default class ViewTypeList extends Component {

    constructor(props){
        super(props)

    }

    onFileClick(file){
        
        // if(this.props.fileSelected && this.props.fileSelected.fileId == file.fileId && file.type == 'folder'){
        //     this.props.onFolderClick(file);
        // }else{
        //     this.props.setSelectedFile(file);
        // }

    }

    render(){
        let files;

        if(this.props.files){
            files = this.props.files.map((file, index) => (
                <FileTypeList key={index} file={file} ></FileTypeList>
            ));
        }
        
    
        return (
            <div className="view-type-list">
                <div className="file-type-list header">
                    <div className="file-name">
                        <b>Name</b>
                    </div>
                    <div className="file-date">
                        <b>Last modified</b>
                    </div>
                </div>
                {files}
            </div>
        )
    }
    
    
}
