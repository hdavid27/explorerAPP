
import React, { Component } from 'react'
import FileTypeList from './FileTypeList';

export default class ViewTypeList extends Component {

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
            <FileTypeList key={index} file={file} fileSelected={this.state.fileSelected} onFileClick={this.onFileClick.bind(this)}></FileTypeList>
        ));
    
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
