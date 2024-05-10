import {configureStore} from '@reduxjs/toolkit';
import authSlice from '../slices/authSlices';
import themeSlice from '../slices/themeSlice';
import settingSlice from '../slices/settingSlice';
const store = configureStore({
    reducer: {
        auth : authSlice,
        theme:themeSlice,
        settings:settingSlice
    }
});


export default store;