import boardReducer from './boardReducer'
import loaderReducer from './loaderReducer';
import modalReducer from './modalReducer';
import sessionReducer from './sessionReducer';
import snackbarReducer from './snackbarReducer';

const reducer = {
    "session": sessionReducer,
    "board" : boardReducer,
    "snackbar" : snackbarReducer,
    "loader" : loaderReducer,
    "modal" : modalReducer,
}

export default reducer;