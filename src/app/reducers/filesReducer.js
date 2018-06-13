
import { FETCH_FILES, CREATE_FILE, UPDATE_FILE, DELETE_FILE, SET_SELECTED_FILE} from './../actions/types';

const initialState = {
    files: [],
    fileSelected: {},
    pathArray: [
        {id:'root', name:'root'}
    ],
};

export default function(state = initialState, action) {

    switch(action.type){

        case FETCH_FILES:

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
                fileSelected: state.fileSelected,
                pathArray: array
            };

        case CREATE_FILE:
            return state;

        case UPDATE_FILE:
            return state;

        case DELETE_FILE:
            return state;

        case SET_SELECTED_FILE:
            return {
                files: state.files,
                fileSelected: action.payload,
                pathArray: state.pathArray
            };

        default:
            return state;
    }

}