
import { FETCH_FILES, CREATE_FILE, UPDATE_FILE, DELETE_FILE, SET_SELECTED_FILE} from './../actions/types';

const initialState = {
    files: [],
    fileSelected: {}
};

export default function(state = initialState, action) {

    switch(action.type){

        case FETCH_FILES:
            return {
                files: action.payload,
                fileSelected: state.fileSelected
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
                fileSelected: action.payload
            };

        default:
            return state;
    }

}