<template>
  <div class="theme-wrap">
    <div class="bo-card">
      <span>换主题</span>
      <!--        <el-link type="primary" style="float: right;" href="https://blog.csdn.net/csdn_yudong/article/details/97621471"-->
      <!--                 target="_blank">更换文档主题-->
      <!--        </el-link>-->

      <div class="bo-d-flex">
        <el-radio-group v-model="themeModel">
          <el-radio label="1" border>默认</el-radio>
          <el-radio label="2" border>夏日心情</el-radio>
        </el-radio-group>

        <el-color-picker
          class="color-picker"
          popper-class="theme-picker-dropdown"
          v-model="color"
          :predefine="predefineColors">
        </el-color-picker>
      </div>

      <el-button type="primary">
        Primary
      </el-button>
      <el-button type="success">
        Success
      </el-button>
      <el-button type="info">
        Info
      </el-button>
      <el-button type="warning">
        Warning
      </el-button>
      <el-button type="danger">
        Danger
      </el-button>

      <div class="bo-d-flex bo-justify-content-around">
        <el-tag v-for="tag in tags" :key="tag.type" :type="tag.type" class="tag-item">
          {{ tag.type }}
        </el-tag>
      </div>
      <div class="bo-d-flex bo-justify-content-around">

        <el-badge value="12" class="item" type="danger">
          <el-button size="small">评论</el-button>
        </el-badge>

        <el-badge value="2" class="item" type="info">
          <el-button size="small">回复</el-button>
        </el-badge>

        <el-badge value="3" class="item" type="success">
          <el-button size="small">回复</el-button>
        </el-badge>

        <el-badge value="1" class="item" type="primary">
          <el-button size="small">评论</el-button>
        </el-badge>

        <el-badge value="2" class="item" type="warning">
          <el-button size="small">回复</el-button>
        </el-badge>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Theme">
// import("@/assets/theme/custom-theme/index.scss");
import("@/assets/theme/custom-theme/theme-summer.css");
import PackageInfo from "../../../package.json";

let version = PackageInfo.dependencies["element-ui"];
console.log(PackageInfo, "PackageInfo");

const ORIGINAL_THEME = "#409EFF"; // default color (blue)
let chalk = ""; // 当前是否已经获取过css样式文件内容，如果获取过，这里会有值，避免多次获取
const color = ref("#409EFF");
const predefineColors = ref(["#f00", "#0f0", "#00f"]);
const themeModel = ref<number>(1);
const tags = ref([
  { type: "primary" },
  { type: "info" },
  { type: "success" },
  { type: "warning" },
  { type: "danger" }
]);
const radio = ref(2);

watch(() => color.value, async (val) => {
    console.log("watch", val);
    // 如果存在chalk，oldVal就是当前颜色(颜色选择器中选取的就是新颜色)
    // 否则，oldVal就是element-ui默认的蓝色
    const oldVal = chalk ? color.value : ORIGINAL_THEME;
    if (typeof val !== "string") return;

    const themeCluster = getThemeCluster(val.replace("#", ""));
    const originalCluster = getThemeCluster(oldVal.replace("#", ""));

    const getHandler = (id: string) => {
      return () => {
        const originalCluster = getThemeCluster(ORIGINAL_THEME.replace("#", ""));
        const newStyle = updateStyle(chalk, originalCluster, themeCluster);

        let styleTag = document.getElementById(id);
        if (!styleTag) {
          styleTag = document.createElement("style");
          styleTag.setAttribute("id", id);
          document.head.appendChild(styleTag);
        }
        styleTag.innerText = newStyle;
      };
    };

    // 如果没有chalk就是第一次换颜色，需要远程获取css文件
    // 后面的换色，就不用再次远程获取了
    if (!chalk) {
      const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`;
      await getCSSString(url);
    }


    const chalkHandler = getHandler("chalk-style");
    chalkHandler();


    // 过滤当前整个页面的样式文件，找到含有oldVal颜色的样式文件
    const styles = [].slice.call(document.querySelectorAll("style"))
      .filter((style: HTMLElement) => {
        const text = style.innerText;
        return new RegExp(oldVal, "i").test(text) && !/Chalk Variables/.test(text);
      });
    // 然后，将其中oldVal的颜色，全部换成我们颜色选择器中选择的新的颜色
    styles.forEach((style: HTMLElement) => {
      const { innerText } = style;
      if (typeof innerText !== "string") {
        return;
      }
      style.innerText = updateStyle(innerText, originalCluster, themeCluster);
    });
  },
  {
    deep: true
  }
)
;

/* 更新样式 - 使用新的颜色变量替换之前的 */
function updateStyle(style: string, oldCluster: any, newCluster: any): any {
  let newStyle = style;
  oldCluster.forEach((color: string, index: number) => {
    newStyle = newStyle.replace(new RegExp(color, "ig"), newCluster[index]);
  });
  return newStyle;
}

// 创建xhr，远程获取css文件，并给chalk赋值
function getCSSString(url: any) {
  return new Promise((resolve: Function) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        chalk = xhr.responseText.replace(/@font-face{[^}]+}/, "");
        resolve();
      }
    };
    xhr.open("GET", url);
    xhr.send();
  });
}

/**
 * 传入一个颜色的HEX，得到这个颜色的深浅颜色数组
 * 我们知道，我们默认的主色调蓝色，在实际使用中，还需要对应的浅蓝和深蓝
 * @param  {[string]]} theme [color]
 * @return {[array]}       [对应的深浅颜色数组]
 */
function getThemeCluster(theme: any) {
  const tintColor = (color: string, tint: any) => {
    let red: number | string = parseInt(color.slice(0, 2), 16);
    let green: number | string = parseInt(color.slice(2, 4), 16);
    let blue: string | number = parseInt(color.slice(4, 6), 16);

    if (tint === 0) { // when primary color is in its rgb space
      return [red, green, blue].join(",");
    }
    return `#${Math.round(tint * (255 - red)).toString(16)}${Math.round(tint * (255 - green)).toString(16)}${Math.round(tint * (255 - blue)).toString(16)}`;
  };

  function shadeColor(color: String, shade: any) {
    // if (color instanceof String) {
    let r = Math.round((1 - shade) * parseInt(color.slice(0, 2), 16)).toString(16);
    let g = Math.round((1 - shade) * parseInt(color.slice(2, 4), 16)).toString(16);
    let b = Math.round((1 - shade) * parseInt(color.slice(4, 6), 16)).toString(16);
    return `#${r}${g}${b}`;
  };

  const clusters = [theme];
  for (let i = 0; i <= 9; i++) {
    clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
  }
  clusters.push(shadeColor(theme, 0.1));
  return clusters;
}
</script>

<style scoped lang="scss">
.theme-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}
</style>
