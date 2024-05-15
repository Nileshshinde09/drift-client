import {configureStore} from '@reduxjs/toolkit';
import authSlice from '../slices/authSlices';
import themeSlice from '../slices/themeSlice';
import commentSlice from '../slices/commentSlice';
const store = configureStore({
    reducer: {
        auth:authSlice,      
        theme:themeSlice,    
        comments:commentSlice
    }
});


export default store;