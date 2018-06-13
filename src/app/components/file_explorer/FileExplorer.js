
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import { fetchFiles } from './../../actions/filesActions';
import { VIEW_TYPE_GRID, VIEW_TYPE_LIST } from './../../actions/types';

//icons
import removeIcon from './../../../assets/images/icon-remove-black.svg';
import createIcon from './../../../assets/images/icon-create-folder-black.svg';
import viewGridIcon from './../../../assets/images/icon-view-grid-back.svg';
import viewListIcon from './../../../assets/images/icon-view-list-black.svg';


import PathElement from './PathElement';
import { ImageButton } from './ImageButton';
import ViewTypeGrid from './ViewTypeGrid';
import ViewTypeList from './ViewTypeList';

class FileExplorer extends Component {

    constructor(props){
        super(props);

        this.state = {
            viewType: VIEW_TYPE_GRID,
            pathArray: [
                {id:'root', name:'root'}
            ],
            fileSelected: {}
        }

    }

    componentWillMount(){
        this.searchFiles(this.state.pathArray);
    }

    componentWillReceiveProps(nextProps){
        // this.setState({
        //     files: nextProps.files
        // })
    }


    onRemoveFolderClick(e){
        console.log('onRemoveFolderClick');
        
    }

    onCreateFolderClick(e){
        console.log('onCreateFolderClick');

    }

    onPathElementClick(id, path){
        console.log('onPathElementClick: ' + id + ':' + path);

        let filtered = false;
        let array = this.state.pathArray.filter(function(path){
            if(path.id == id){
                filtered = !filtered;
                return true;
            }
            return !filtered
        });

        this.setState({
            pathArray: array
        });

        this.searchFiles(array)

    }

    onViewTypeClick(){

        this.setState({
            viewType: (this.state.viewType == VIEW_TYPE_GRID) ? VIEW_TYPE_LIST : VIEW_TYPE_GRID
        });

    }

    onFolderClick(file){
        var array = this.state.pathArray;
        array.push({id:file.fileId, name: file.name});

        this.setState({
            pathArray: array
        });

        this.searchFiles(array)
    }

    searchFiles(pathArray){
        var length = pathArray.length
        if(length > 0){
            this.props.fetchFiles(pathArray[length-1].id);
        }
    }


    render() {

        const pathElements = this.state.pathArray.map((ele, index) =>(
            <PathElement key={ele.id} pathElement={ele} selectedClass={(index == this.state.pathArray.length -1) ? "selected" : ""} onPathElementClick={this.onPathElementClick.bind(this)}></PathElement>
        ));

        var viewTypeElement;
        var viewTypeButton;

        switch(this.state.viewType){
            case VIEW_TYPE_GRID:
                viewTypeButton = <ImageButton imageSrc={viewGridIcon} onButtonClick={this.onViewTypeClick.bind(this)}></ImageButton>
                viewTypeElement = <ViewTypeGrid files={this.props.files} fileSelected={this.state.fileSelected} onFolderClick={this.onFolderClick.bind(this)}></ViewTypeGrid>;
                break;

            case VIEW_TYPE_LIST:
                viewTypeButton = <ImageButton imageSrc={viewListIcon} onButtonClick={this.onViewTypeClick.bind(this)}></ImageButton>
                viewTypeElement = <ViewTypeList files={this.props.files} fileSelected={this.state.fileSelected} onFolderClick={this.onFolderClick.bind(this)}></ViewTypeList>
                break;

            default:
                viewTypeButton = <ImageButton imageSrc={viewGridIcon} onButtonClick={this.onViewTypeGridClick.bind(this)}></ImageButton>
                viewTypeElement = <ViewTypeGrid files={this.props.files} fileSelected={this.state.fileSelected} onFolderClick={this.onFolderClick.bind(this)}></ViewTypeGrid>;
                break;
        }

        return (
            <div className="file-explorer-component">
                <div className="explorer-nav">
                    <div className="path-container">
                        {pathElements}
                    </div>
                    <div className="icons-container">
                        {viewTypeButton}
                        <ImageButton imageSrc={createIcon} onButtonClick={this.onCreateFolderClick.bind(this)}></ImageButton>
                        <ImageButton imageSrc={removeIcon} onButtonClick={this.onRemoveFolderClick.bind(this)}></ImageButton>
                    
                    </div>
                </div>

                <div className="explorer-container">
                    {viewTypeElement}
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
