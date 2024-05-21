import {configureStore} from '@reduxjs/toolkit';
import authSlice from '../slices/authSlices.js';
import themeSlice from '../slices/themeSlice.js';
import commentSlice from '../slices/commentSlice.js';
import updateProfileSlice from '../slices/updateProfile.js';
const store = configureStore({
    reducer: {
        auth:authSlice,      
        theme:themeSlice,    
        comments:commentSlice,
        updateProfile:updateProfileSlice
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: false,
        })
});


export default store;