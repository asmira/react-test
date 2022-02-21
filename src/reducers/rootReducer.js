import boardReducer from './boardReducer'
import loaderReducer from './loaderReducer';
import snackbarReducer from './snackbarReducer';

const reducer = {
    "board" : boardReducer,
    "snackbar" : snackbarReducer,
    "loader" : loaderReducer,
}

export default reducer;