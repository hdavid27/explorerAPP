
import { FETCH_FILES, CREATE_FILE, UPDATE_FILE, DELETE_FILE, SET_SELECTED_FILE} from './types';
import { config } from './../../config';

export function fetchFiles(fileFolder, offset){
    var path = (fileFolder) ? fileFolder.fileId : 'root';
    offset = offset || 0;
    
    console.log('Feetching files for ' + path);

    return function(dispatch){
        fetch(config.API_HOST + 'files/' + path + '/' + offset)
        .then(function(res){
            return res.json().then(function(data){
                return {status: res.status, payload:data};
            })
        })
        .then((data) => dispatch({
            type: FETCH_FILES,
            status: data.status,
            payload: data.payload,
            parentFolder: fileFolder
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
        fetch(config.API_HOST + 'files/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(function(res){
            return res.json().then(function(data){
                return {status: res.status, payload:data};
            })
        })
        .then(data => dispatch({
            type: CREATE_FILE,
            status: data.status,
            payload: data.payload
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
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(function(res){
            return res.json().then(function(data){
                return {status: res.status, payload:data};
            })
        })
        .then(data => dispatch({
            type: UPDATE_FILE,
            status: data.status,
            payload: data.payload,
            fileId: fileId,
            newName: name
        }))
    }
}

export function deleteFile(fileId){
    console.log('Deleting file');

    return function(dispatch){
        fetch(config.API_HOST + 'files/' + fileId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function(res){
            return res.json().then(function(data){
                return {status: res.status, payload:data};
            })
        })
        .then(data => dispatch({
            type: DELETE_FILE,
            status: data.status,
            payload: data.payload,
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