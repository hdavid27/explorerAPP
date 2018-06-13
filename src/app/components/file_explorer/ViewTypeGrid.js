
import React, { Component } from 'react'
import FileTypeGrid from './FileTypeGrid';

export default class ViewTypeGrid extends Component {

    constructor(props){
        super(props)
        
        this.state = {
            fileSelected: {}
        }
    }

    onFileClick(file){
        
        if(this.state.fileSelected && this.state.fileSelected.fileId == file.fileId && file.type == 'folder'){
            this.props.onFolderClick(file);
        }else{
            this.setState({
                fileSelected: file
            });
        }

    }

    render(){

        const files = this.props.files.map((file, index) => (
            <FileTypeGrid key={index} file={file} fileSelected={this.state.fileSelected} onFileClick={this.onFileClick.bind(this)} ></FileTypeGrid>
        ));
        
        return (
            <div className="view-type-grid">
                {files}
            </div>
        )
    }
    
}
