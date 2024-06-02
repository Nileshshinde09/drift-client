import {configureStore} from '@reduxjs/toolkit';
import authSlice from '../slices/authSlices.js';
import themeSlice from '../slices/themeSlice.js';
import commentSlice from '../slices/commentSlice.js';
import updateProfileSlice from '../slices/updateProfile.js';
import managePostsSlice from '../slices/managePostsSlice.js';
import bookmarkSlice from '../slices/bookmarkedSlice.js';
import postSlice from '../slices/postSlices.js';
const store = configureStore({
    reducer: {
        auth:authSlice,      
        theme:themeSlice,    
        comments:commentSlice,
        updateProfile:updateProfileSlice,
        managePost:managePostsSlice ,
        bookmark:bookmarkSlice,
        post:postSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        })
});


export default store;