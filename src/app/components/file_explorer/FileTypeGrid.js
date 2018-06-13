import React, { Component } from 'react'

import folderIcon from './../../../assets/images/icon-folder-black.svg'

export default class FileTypeGrid extends Component {

    constructor(props){
        super(props)

        
    }

    onFileClick(e){
        this.props.onFileClick(this.props.file)
    }

    render() {
        
        const selected = (this.props.fileSelected && this.props.fileSelected.fileId == this.props.file.fileId) ? 'selected' : '';

        return (
            <div className={"file-type-grid " + selected} onClick={this.onFileClick.bind(this)}>
                <img src={folderIcon} />
                {this.props.file.name}
            </div>
        )
    }
}