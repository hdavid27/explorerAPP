
import { FETCH_FILES, CREATE_FILE, UPDATE_FILE, DELETE_FILE, SET_SELECTED_FILE, APROVE_FILE} from './types';
import { config } from './../../config';
import axios from 'axios';

export function fetchFiles(fileFolder, offset){
    var path = (fileFolder) ? fileFolder.fileId : 'root';
    offset = offset || 0;
    
    console.log('Feetching files for ' + path);

    return function(dispatch){
        axios.get(config.API_HOST + 'files/' + path + '/' + offset)
        .then((res) => dispatch({
            type: FETCH_FILES,
            status: res.status,
            payload: res.data,
            parentFolder: fileFolder,
            offset: offset
        }));
    }
}

export function createFile(name, type, parent){
    console.log('Creating file', name, type, parent);

    var data = {
        name : name,
        type : type,
        parent : parent
    };

    return function(dispatch){
        axios({
            method: 'post',
            url: config.API_HOST + 'files/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        })
        .then(res => dispatch({
            type: CREATE_FILE,
            status: res.status,
            payload: res.data
        }))
    }
}

export function updateFile(fileId, name){
    console.log('Updating file');

    var data = {
        name : name
    };

    return function(dispatch){
        axios({
            method: 'post',
            url: config.API_HOST + 'files/' + fileId,
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        })
        .then(res => dispatch({
            type: UPDATE_FILE,
            status: res.status,
            payload: res.data,
            fileId: fileId,
            newName: name
        }))
    }
}

export function deleteFile(fileId){
    console.log('Deleting file');

    return function(dispatch){
        axios({
            method: 'delete',
            url: config.API_HOST + 'files/' + fileId,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => dispatch({
            type: DELETE_FILE,
            status: res.status,
            payload: res.data,
            fileId: fileId
        }))
    }
}

export function setSelectedFile(file){
    console.log('Seting selected file...');

    return function(dispatch){

        dispatch({
            type: SET_SELECTED_FILE,
            payload: file
        });

    }
    
}

export function aproveFile(fileId, aproved){
    console.log('Aproving: ', fileId, aproved);
    
    var body = {
        aproved : aproved
    };

    return function(dispatch){
        axios({
            method: 'post',
            url: config.API_HOST + '/files/aprove/' + fileId,
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(body)
        })
        .then(res => dispatch({
            type: APROVE_FILE,
            status: res.status,
            payload: res.data,
            fileId: fileId,
            aproved: aproved
        }))
    }
}