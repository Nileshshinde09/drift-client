import { MESSANGER_THEME, MESSANGER_THEME_ENUM } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: localStorage.getItem("vite-ui-theme") || "system",   // if theme is not present in the local storage it will set system theme as default
  storageKey: "vite-ui-theme",
  messangerThemeStorageKey:"messanger-ui-theme",
  messangerTheme:localStorage.getItem("messanger-ui-theme") || MESSANGER_THEME_ENUM.DEFAULT
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
    }
  },
  setMessangerTheme: (state, action) => {    //action theme will be dark,light and system
    if (action.payload) state.messangerTheme = action.payload
    else state.messangerTheme = localStorage.getItem(state.messangerThemeStorageKey) || state.messangerTheme

    localStorage.setItem(state.messangerThemeStorageKey, state.messangerTheme)
  }
}
)

export const { setTheme,setMessangerTheme } = themeSlice.actions;

export default themeSlice.reducer;