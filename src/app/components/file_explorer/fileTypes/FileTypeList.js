
import React, { Component } from 'react'
import {connect} from 'react-redux';
import { PropTypes } from 'prop-types';

import { setSelectedFile, fetchFiles } from '../../../actions/filesActions';

import folderIcon from './../../../../assets/images/icon-folder-black.svg'
import fileIcon from './../../../../assets/images/icon-file-black.svg'

import rejectIcon from './../../../../assets/images/icon-reject-black.svg';
import aprovedIcon from './../../../../assets/images/icon-aprove-black.svg';

class FileTypeList extends Component {

    constructor(props){
        super(props)
    }

    onFileClick(e){
        if(this.props.fileSelected && this.props.fileSelected.fileId == this.props.file.fileId && this.props.file.type == 'folder'){
            this.props.fetchFiles(this.props.fileSelected);
        }else{
            this.props.setSelectedFile(this.props.file);
        }
    }

    render() {
        const selected = (this.props.fileSelected && this.props.fileSelected.fileId == this.props.file.fileId) ? 'selected' : '';

        let icon;
        if(this.props.file.aproved == 'true'){
            icon = <img src={aprovedIcon} /> 
        }

        if(this.props.file.aproved == 'false'){
            icon = <img src={rejectIcon} /> 
        }

        return (
            <div className={"file-type-list " + selected} onClick={this.onFileClick.bind(this)}>
                <div className="file-name">
                    <img src={(this.props.file.type == 'folder')? folderIcon : fileIcon} />
                    {this.props.file.name}
                </div>
                <div className="file-date">
                    {this.props.file.updatedAt}
                </div>
                <div className="file-aproved">
                    {icon}
                </div>
            </div>
        )
    }
}

FileTypeList.protoTypes = {
    setSelectedFile: PropTypes.func.isRequired
}

const mapStateToProps = function(state){
    return {
        fileSelected: state.filesReducer.fileSelected
    }
}

export default connect(mapStateToProps, {setSelectedFile, fetchFiles} )(FileTypeList);