import React, { Component } from 'react'
import {connect} from 'react-redux';
import { PropTypes } from 'prop-types';

import { setSelectedFile } from '../../actions/filesActions';
import folderIcon from './../../../assets/images/icon-folder-black.svg'

class FileTypeGrid extends Component {

    constructor(props){
        super(props)
    }

    onFileClick(e){
        //this.props.onFileClick(this.props.file)
        this.props.setSelectedFile(this.props.file);
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

FileTypeGrid.protoTypes = {
    setSelectedFile: PropTypes.func.isRequired
}

const mapStateToProps = function(state){
    return {
        fileSelected: state.filesReducer.fileSelected
    }
}

export default connect(mapStateToProps, {setSelectedFile} )(FileTypeGrid);