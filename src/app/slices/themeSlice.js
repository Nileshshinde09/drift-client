import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: localStorage.getItem("vite-ui-theme") || "system",   // if theme is not present in the local storage it will set system theme as default
  storageKey: "vite-ui-theme"
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
  }
})

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;