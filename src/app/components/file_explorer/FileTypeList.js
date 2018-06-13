
import React, { Component } from 'react'

import folderIcon from './../../../assets/images/icon-folder-black.svg'

export default class FileTypeList extends Component {

    constructor(props){
        super(props)
    }

    onFileClick(e){
        this.props.onFileClick(this.props.file)
    }

    render() {
        const selected = (this.props.fileSelected && this.props.fileSelected.fileId == this.props.file.fileId) ? 'selected' : '';

        return (
            <div className={"file-type-list " + selected} onClick={this.onFileClick.bind(this)}>
                <div className="file-name">
                    <img src={folderIcon} />
                    {this.props.file.name}
                </div>
                <div className="file-date">
                    {this.props.file.updatedAt}
                </div>
            </div>
        )
    }
}
