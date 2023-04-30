import { defineStore } from "pinia";

export const enum ThemeEnum {
  Dark = "dark",
  Light = "light"
}

export type theme = "dark" | "light"
export const useTheme = defineStore("theme", {
  state: () => ({
    theme: ThemeEnum.Dark
  }),
  getters: {
    getTheme: (state) => state.theme
  },
  actions: {
    SET_THEME(theme: ThemeEnum) {
      this.theme = theme;
    }
  }
});
