<template>
  <div class="theme-wrap">
    <div class="bo-position-relative bo-overflow-auto" style="height:100%">
      <div class="bo-card">
        <span>换主题</span>
        <el-radio-group v-model="themeMode">
          <el-radio class="" border label="0">默认主题</el-radio>
          <el-radio class="" border label="custom-theme">自定义主题</el-radio>
        </el-radio-group>
        <div v-for="(group,groupT) in colorsState" :key="groupT">
          <div v-for="(state,theme) in group" :key="theme">
            <el-color-picker
              size="mini"
              class="color-picker"
              popper-class="theme-picker-dropdown"
              v-model="state.customColor"
            >
            </el-color-picker>

            <el-button v-if="groupT==='ThemeColor'" :type="state.type" class="bo-ml-small">
              {{ theme }}
            </el-button>

            <el-tag v-if="groupT==='ThemeColor'" :type="state.type" class="bo-ml-small">
              {{ theme }}
            </el-tag>

            <el-badge v-if="groupT==='ThemeColor'" value="99+" :type="state.type" class="bo-ml-small">
            </el-badge>

            {{ state.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Theme">
import { handleThemeChange } from "@/utils/element-theme";

export interface ITheme {
  oldColor: string,
  customColor: string
  type: string
  title: string
}

const themeMode = ref("");
watch(() => themeMode.value, (newTheme, oldTheme): void => {
  const bodyDOM: HTMLElement = document.querySelector("body") as HTMLElement;
  // console.log(newTheme, oldTheme);
  if (oldTheme) {
    bodyDOM.classList.remove(oldTheme);
  }
  bodyDOM.classList.add(newTheme);
}, {
  deep: true
});
const colorsState = reactive<Record<string, Record<string, ITheme>>>({
  ThemeColor: {
    primary: {
      oldColor: "#409EFF",
      customColor: "#409EFF",
      type: "primary",
      title: "主色调"
    },
    success: {
      oldColor: "#67C23A",
      customColor: "#67C23A",
      type: "success",
      title: "成功色调"
    },
    danger: {
      oldColor: "#F56C6C",
      customColor: "#FF443A",
      type: "danger",
      title: "危险色调"
    },
    warning: {
      oldColor: "#E6A23C",
      customColor: "#FFD800",
      type: "warning",
      title: "警告色调"
    },
    info: {
      oldColor: "#909399",
      customColor: "#C6D1D8",
      type: "info",
      title: "信息色调"
    }
  },
  FontColor: {
    colorTextPrimary: {
      oldColor: "#303133",
      customColor: "#303133",
      type: "colorTextPrimary",
      title: "主要文字色调"
    },
    colorTextRegular: {
      oldColor: "#606266",
      customColor: "#606266",
      type: "colorTextRegular",
      title: "常规色调"
    },
    colorTextSecondary: {
      oldColor: "#909399",
      customColor: "#909399",
      type: "colorTextRegular",
      title: "次要文字颜色"
    },
    "colorTextPlaceholder": {
      oldColor: "#C0C4CC",
      customColor: "#C0C4CC",
      type: "colorTextPlaceholder",
      title: "占位文字颜色"
    }
  },
  BorderColor: {
    "BorderColorBase": {
      type: "BorderColorBase",
      oldColor: "#DCDFE6",
      customColor: "#DCDFE6",
      title: "一级边框颜色"
    },
    "BorderColorLight": {
      type: "BorderColorLight",
      oldColor: "#E4E7ED",
      customColor: "#E4E7ED",
      title: "二级边框颜色"
    },
    "BorderColorLighter": {
      type: "BorderColorLighter",
      oldColor: "#EBEEF5",
      customColor: "#EBEEF5",
      title: "三级边框颜色"
    },
    "BorderColorExtraLight": {
      type: "BorderColorExtraLight",
      oldColor: "#F2F6FC",
      customColor: "#F2F6FC",
      title: "四级边框颜色"
    }
  },
  BackgroundColor: {
    ColorWhite: {
      type: "ColorWhite",
      oldColor: "#FFF",
      customColor: "#FFF",
      title: "基础白"
    },
    ColorBlack: {
      type: "ColorBlack",
      oldColor: "#000000",
      customColor: "#000000",
      title: "基础黑"
    },
    BackgroundColorBase: {
      type: "BackgroundColorBase",
      oldColor: "#F5F7FA",
      customColor: "#F5F7FA",
      title: "基础背景色"
    }
  }
});

Object.values(colorsState).forEach((themeGroup: Record<string, ITheme>) => {
  Object.values(themeGroup).forEach((themeState: ITheme) => {
    watch(() => themeState.customColor, (newVal, oldVal) => {
      // console.log("watch", newVal, oldVal);
      handleThemeChange(newVal, oldVal);
    }, { deep: true });
  });
});

async function init() {
  // async
  for (const themeState of Object.values(colorsState.ThemeColor)) {
    await handleThemeChange(themeState.customColor, themeState.oldColor, themeState.type);
    continue;
  }
}

// init();


</script>

<style scoped lang="scss">
.theme-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
  overflow: auto;
}
</style>
