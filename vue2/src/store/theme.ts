import { defineStore } from "pinia";

export const enum ThemeEnum {
  Dark = "dark",
  Light = "light"
}

interface IState {
  theme: Ref<ThemeEnum>;
  night: Ref<boolean>;
  isCollapse: Ref<boolean>;
}

export const useTheme = defineStore("theme", {
  state: (): IState => ({
    night: ref(false),
    theme: ref(ThemeEnum.Dark),
    isCollapse: ref(true)
  }),
  getters: {
    isNight: (state) => {
      return unref(state.theme) === ThemeEnum.Dark;
    },
    getTheme: (state) => unref(state.theme)
  },
  actions: {
    TOGGLE_THEME() {
      // @ts-ignore
      const themeState: Ref<ThemeEnum> = this.theme;
      themeState.value = themeState.value === ThemeEnum.Dark ? ThemeEnum.Light : ThemeEnum.Dark;
    },
    toggleCollapse(){
      // @ts-ignore
      this.isCollapse.value = !this.isCollapse.value ;
    },
    SET_THEME<IState>(theme: ThemeEnum) {
      // @ts-ignore
      const themeState: Ref<ThemeEnum> = this.theme;
      themeState.value = theme;
    }
  }
});
