
import { FETCH_FILES, CREATE_FILE, UPDATE_FILE, DELETE_FILE} from './../actions/types';

const initialState = {
    files: []
};

export default function(state = initialState, action) {

    switch(action.type){

        case FETCH_FILES:
            return {
                files: action.payload
            };

        case CREATE_FILE:
            return state;

        case UPDATE_FILE:
            return state;

        case DELETE_FILE:
            return state;

        default:
            return state;
    }

}