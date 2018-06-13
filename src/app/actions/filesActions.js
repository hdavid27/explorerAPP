
import { FETCH_FILES, CREATE_FILE, UPDATE_FILE, DELETE_FILE, SET_SELECTED_FILE} from './types';
import { config } from './../../config';

export function fetchFiles(fileFolder){
    var path = (fileFolder) ? fileFolder.fileId : '';
    
    console.log('Feetching files for ' + path);

    return function(dispatch){
        fetch(config.API_HOST + 'files/' + path)
        .then(res => res.json())
        .then(files => dispatch({
            type: FETCH_FILES,
            payload: files,
            parentFolder: fileFolder
        }));
    }
}

export function createFile(name, type, parent){
    console.log('Creating file');

    var data = {
        name : name,
        type : type,
        parent : parent
    };

    return function(dispatch){
        fetch(config.API_HOST + 'files/', {
            method: 'POST',
            headers: {
                'content-type': 'aplication/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(file => dispatch({
            type: CREATE_FILE,
            payload: file
        }))
    }
}

export function updateFile(fileId, name){
    console.log('Updating file');

    var data = {
        name : name
    };

    return function(dispatch){
        fetch(config.API_HOST + 'files/' + fileId, {
            method: 'POST',
            headers: {
                'content-type': 'aplication/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => dispatch({
            type: UPDATE_FILE,
            payload: result
        }))
    }
}

export function deleteFile(fileId){
    console.log('Deleting file');

    return function(dispatch){
        fetch(config.API_HOST + 'files/' + fileId, {
            method: 'DELETE',
            headers: {
                'content-type': 'aplication/json'
            }
        })
        .then(res => res.json())
        .then(result => dispatch({
            type: DELETE_FILE,
            payload: result
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