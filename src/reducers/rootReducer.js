import boardReducer from './boardReducer'
import loaderReducer from './loaderReducer';
import sessionReducer from './sessionReducer';
import snackbarReducer from './snackbarReducer';

const reducer = {
    "session": sessionReducer,
    "board" : boardReducer,
    "snackbar" : snackbarReducer,
    "loader" : loaderReducer,
}

export default reducer;