
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { DropdownButton, MenuItem } from 'react-bootstrap';

import { fetchFiles, createFile, updateFile, deleteFile } from './../../actions/filesActions';
import { VIEW_TYPE_GRID, VIEW_TYPE_LIST, NORMAL_MODE, EDIT_MODE, CREATE_FILE_MODE, CREATE_FOLDER_MODE } from './../../actions/types';

//icons
import removeIcon from './../../../assets/images/icon-remove-black.svg';
import editIcon from './../../../assets/images/icon-edit-black.svg'
import createFileIcon from './../../../assets/images/icon-add-file-black.svg';
import createFolderIcon from './../../../assets/images/icon-create-folder-black.svg';
import viewGridIcon from './../../../assets/images/icon-view-grid-back.svg';
import viewListIcon from './../../../assets/images/icon-view-list-black.svg';


import PathElement from './PathElement';
import { ImageButton } from './ImageButton';
import ViewTypeGrid from './ViewTypeGrid';
import ViewTypeList from './ViewTypeList';
import ModalView from './ModalView';

class FileExplorer extends Component {

    constructor(props){
        super(props);

        this.state = {
            viewType: VIEW_TYPE_GRID,
            mode: NORMAL_MODE,
            // pathArray: [
            //     {id:'root', name:'root'}
            // ],
            //fileSelected: {}
        }

    }

    componentWillMount(){
        this.props.fetchFiles();
    }

    componentWillReceiveProps(nextProps){

    }

    onRemoveFolderClick(e){
        console.log('onRemoveFolderClick');
        if(this.props.fileSelected && this.props.fileSelected.fileId){
            this.props.deleteFile(this.props.fileSelected.fileId);
        }
        
    }

    onCreateFolderClick(e){
        console.log('onCreateFolderClick');
        this.setState({
            mode: CREATE_FOLDER_MODE
        })
    }

    onCreateFileClick(e){
        console.log('onCreateFileClick');
        this.setState({
            mode: CREATE_FILE_MODE
        })
    }

    onEditNameClick(e){
        console.log('onEditNameClick');
        if(this.props.fileSelected && this.props.fileSelected.fileId){
            this.setState({
                mode: EDIT_MODE
            });
        }
    }

    onPathElementClick(id, name){
        console.log('onPathElementClick: ' + id + ':' + name);

        this.props.fetchFiles({
            fileId: id,
            name: name
        });

    }

    onViewTypeClick(){

        this.setState({
            viewType: (this.state.viewType == VIEW_TYPE_GRID) ? VIEW_TYPE_LIST : VIEW_TYPE_GRID
        });

    }

    onModalClose(){
        this.setState({
            mode: NORMAL_MODE
        })
    }

    onModalSave(mode, inputValue){

        let length = this.props.pathArray.length

        if(mode == CREATE_FILE_MODE){
            this.props.createFile(inputValue, 'file', this.props.pathArray[length - 1].id);
        }

        if(mode == CREATE_FOLDER_MODE){
            this.props.createFile(inputValue, 'folder', this.props.pathArray[length - 1].id);
        }

        if(mode == EDIT_MODE){
            this.props.updateFile(this.props.fileSelected.fileId, inputValue);
        }

        this.setState({
            mode: NORMAL_MODE
        })


    }

    render() {

        let modalElement;

        if(this.state.mode == CREATE_FILE_MODE || this.state.mode == CREATE_FOLDER_MODE){
            modalElement = <ModalView mode={this.state.mode} onClose={this.onModalClose.bind(this)} onSave={this.onModalSave.bind(this)}></ModalView>
        }

        if(this.state.mode == EDIT_MODE){
            modalElement = <ModalView mode={this.state.mode} value={(this.props.fileSelected.name) ? this.props.fileSelected.name : ''} onClose={this.onModalClose.bind(this)} onSave={this.onModalSave.bind(this)}></ModalView>
        }

        const pathElements = this.props.pathArray.map((ele, index) =>(
            <PathElement key={ele.id} pathElement={ele} onPathElementClick={this.onPathElementClick.bind(this)}></PathElement>
        ));

        const menuElements = this.props.pathArray.map((ele, index) =>(
            <MenuItem eventKey={ele.id}>
                <PathElement key={ele.id} pathElement={ele} onPathElementClick={this.onPathElementClick.bind(this)}></PathElement>
            </MenuItem>
        ));

        var viewTypeElement;
        var viewTypeButton;

        switch(this.state.viewType){
            case VIEW_TYPE_GRID:
                viewTypeButton = <ImageButton imageSrc={viewGridIcon} onButtonClick={this.onViewTypeClick.bind(this)}></ImageButton>
                viewTypeElement = <ViewTypeGrid files={this.props.files} ></ViewTypeGrid>;
                break;

            case VIEW_TYPE_LIST:
                viewTypeButton = <ImageButton imageSrc={viewListIcon} onButtonClick={this.onViewTypeClick.bind(this)}></ImageButton>
                viewTypeElement = <ViewTypeList files={this.props.files} ></ViewTypeList>
                break;

            default:
                viewTypeButton = <ImageButton imageSrc={viewGridIcon} onButtonClick={this.onViewTypeGridClick.bind(this)}></ImageButton>
                viewTypeElement = <ViewTypeGrid files={this.props.files} ></ViewTypeGrid>;
                break;
        }

        return (
            <div className="file-explorer-component">

                <div className="explorer-nav">
                    <div className="path-container">
                        <div className="small-menu">
                            <DropdownButton
                                title={"/  " + this.props.pathArray[this.props.pathArray.length - 1].name}
                            >
                                {menuElements}
                            </DropdownButton>
                        </div>
                        <div className="normal-menu">
                            {pathElements}
                        </div>

                    </div>
                    <div className="icons-container">
                        {viewTypeButton}
                        <ImageButton imageSrc={createFileIcon} onButtonClick={this.onCreateFileClick.bind(this)}></ImageButton>
                        <ImageButton imageSrc={createFolderIcon} onButtonClick={this.onCreateFolderClick.bind(this)}></ImageButton>
                        <ImageButton imageSrc={editIcon} onButtonClick={this.onEditNameClick.bind(this)}></ImageButton>
                        <ImageButton imageSrc={removeIcon} onButtonClick={this.onRemoveFolderClick.bind(this)}></ImageButton>
                    
                    </div>
                </div>

                <div className="explorer-container">
                    {viewTypeElement}
                </div>

                {modalElement}
            </div>
        )
    }
}

FileExplorer.protoTypes = {
    fetchFiles: PropTypes.func.isRequired,
    files: PropTypes.array.isRequired,
    pathArray: PropTypes.array.isRequired
}

const mapStateToProps = function(state){
    console.log('STATE', state);
    return {
        files: state.filesReducer.files,
        pathArray: state.filesReducer.pathArray,
        fileSelected: state.filesReducer.fileSelected
    }
}

export default connect(mapStateToProps, {fetchFiles, createFile, updateFile, deleteFile} )(FileExplorer);
