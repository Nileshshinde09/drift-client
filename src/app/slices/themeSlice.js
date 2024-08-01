import { MESSANGER_THEME_ENUM } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: localStorage.getItem("vite-ui-theme") || "system",   // if theme is not present in the local storage it will set system theme as default
  storageKey: "vite-ui-theme",
  messangerThemeStorageKey: "messanger-ui-theme",
  messangerTheme: localStorage.getItem("messanger-ui-theme") || MESSANGER_THEME_ENUM.DEFAULT,
  messangerNotificationStorageKey:"messanger-notification-theme",
  messangerNotificationTheme:localStorage.getItem("messanger-notification-theme") ||"",
  isNotificationsMuted:localStorage.getItem("notifications-mute-state") || "false",
  isNotificationsMutedStorageKey:"notifications-mute-state"
}

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {    //action theme will be dark,light and system
      if (action.payload) state.theme = action.payload
      else state.theme = localStorage.getItem(state.storageKey) || state.theme
      const root = window.document.documentElement
      root.classList.remove("light", "dark")

      if (state.theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light"

        root.classList.add(systemTheme)
        return
      }

      root.classList.add(state.theme)
      localStorage.setItem(state.storageKey, state.theme)
    },
    
    setMessangerTheme: (state, action) => {
      if (action.payload) state.messangerTheme = action.payload
      else state.messangerTheme = localStorage.getItem(state.messangerThemeStorageKey) || state.messangerTheme
  
      localStorage.setItem(state.messangerThemeStorageKey, state.messangerTheme)
    },

    setMessangerNotificationSoundTheme: (state, action) => { 
      if (action.payload) state.messangerNotificationTheme = action.payload
      else state.messangerNotificationTheme = localStorage.getItem(state.messangerNotificationStorageKey) || state.messangerTheme
      localStorage.setItem(state.messangerNotificationStorageKey, state.messangerNotificationTheme)
    },
    setIsMuteNotifications:(state,action)=>{
      if (action.payload) state.isNotificationsMuted = action.payload
      else state.isNotificationsMuted = localStorage.getItem(state.isNotificationsMutedStorageKey) || state.messangerTheme
      localStorage.setItem(state.isNotificationsMutedStorageKey, state.isNotificationsMuted)
    }
  }
}
)

export const { setTheme, setMessangerTheme ,setMessangerNotificationSoundTheme,setIsMuteNotifications} = themeSlice.actions;

export default themeSlice.reducer;