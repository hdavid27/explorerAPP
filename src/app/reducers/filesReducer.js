
import { FETCH_FILES, CREATE_FILE, UPDATE_FILE, DELETE_FILE, SET_SELECTED_FILE, APROVE_FILE} from './../actions/types';

const initialState = {
    files: [],
    fileSelected: {},
    pathArray: [
        {id:'root', name:'root'}
    ],
    offset: 0
};

export default function(state = initialState, action) {

    switch(action.type){

        case FETCH_FILES:
        console.log('FETCH_FILES: ' + action.status, action.parentFolder, action.payload);

            if(action.status <= 300){
                var array = state.pathArray;

                if(action.parentFolder){
                    var filtered = false;
                    var array = state.pathArray.filter(function(path){
                        if(path.id == action.parentFolder.fileId){
                            filtered = !filtered;
                            return true;
                        }
                        return !filtered
                    });

                    if(!filtered){
                        array.push({id:action.parentFolder.fileId, name: action.parentFolder.name});
                    }
                }

                return {
                    files: action.payload,
                    fileSelected: {},
                    pathArray: array,
                    offset: action.offset
                };
            }else{
                return state;
            }

        case CREATE_FILE:
            console.log('CREATE_FILE: ' + action.status, action.payload);
            
            if(action.status <= 300){
                var array = state.files;
                array.push(action.payload);

                return {
                    files: array,
                    fileSelected: {},
                    pathArray: state.pathArray,
                    offset: state.offset
                };
            }else{
                return {
                    files: state.files,
                    fileSelected: {},
                    pathArray: state.pathArray,
                    offset: state.offset
                }; 
            }
            

        case UPDATE_FILE:
            console.log('UPDATE_FILE: ' + action.status, action.payload);

            if(action.status <= 300){
                var array = state.files.map(function(file){
                    if(file.fileId == action.fileId){
                        file.name = action.newName
                    }
                    return file;
                });
                return {
                    files: array,
                    fileSelected: {},
                    pathArray: state.pathArray,
                    offset: state.offset
                };
            }else{
                return state;
            }

        case DELETE_FILE:
            console.log('DELETE_FILE: ' + action.status, action.payload);

            if(action.status <= 300){
                var array = state.files.filter(function(file){
                    if(file.fileId == action.fileId){
                        return false;
                    }
                    return true;
                });
                return {
                    files: array,
                    fileSelected: {},
                    pathArray: state.pathArray,
                    offset: state.offset
                };
            }else{
                return state;
            }

        case SET_SELECTED_FILE:
            return {
                files: state.files,
                fileSelected: action.payload,
                pathArray: state.pathArray,
                offset: state.offset
            };

        case APROVE_FILE:
            console.log('APROVE_FILE: ' + action.status);

            if(action.status <= 300){
                var array = state.files.map(function(file){
                    if(file.fileId == action.fileId){
                        file.aproved = action.aproved
                    }
                    return file;
                });
                return {
                    files: array,
                    fileSelected: {},
                    pathArray: state.pathArray,
                    offset: state.offset
                };
            }else{
                return state;
            }

        default:
            return state;
    }

}