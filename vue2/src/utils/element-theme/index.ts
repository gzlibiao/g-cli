// @ts-ignore
import PackageInfo from "../../../package.json";

const version = PackageInfo.dependencies["element-ui"];

// localStorage.getItem("ELEMENT_THEME_chalk") ||
let chalk = "";


export async function handleThemeChange(customColor: string, oldColor: string, type?: any) {
  if (customColor === oldColor) {
    return;
  }

  // console.log("handle",chalk, customColor, oldColor);
  // console.log(chalk)
  const themeCluster = getThemeCluster(customColor);
  const originalCluster = getThemeCluster(oldColor);

  // 如果没有chalk就是第一次换颜色，需要远程获取css文件
  // 后面的换色，就不用再次远程获取了
  if (!chalk) {
    const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`;
    chalk = await getCSSString(url);
  }

  const id = "chalk-style";

  chalk = transformStyle(chalk, originalCluster, themeCluster);

  let styleTag = document.getElementById(id);
  if (!styleTag) {
    styleTag = document.createElement("style");
    styleTag.setAttribute("id", id);
    document.head.appendChild(styleTag);
  }

  styleTag.innerText = chalk;

  // localStorage.setItem("ELEMENT_THEME_chalk", chalk);

  // 正常通过style引入 这一步不需要
  // 过滤当前整个页面的样式文件，找到含有oldVal颜色的样式文件
  // Object.values(document.querySelectorAll("style")).filter((style: HTMLElement) => {
  //   const text = style.innerText;
  //   return originalCluster.some(oc => new RegExp(oc, "ig").test(text) && !/Chalk Variables/.test(text));
  // }).forEach((style: HTMLElement) => {
  //   console.log("匹配的");
  //   // 然后，将其中oldVal的颜色，全部换成我们颜色选择器中选择的新的颜色
  //   style.innerText = transformStyle(style.innerText, originalCluster, themeCluster);
  // });
}

/* 更新样式 - 使用新的颜色变量替换之前的 */
function transformStyle(styleText: string, oldCluster: string[], newCluster: string[]): string {
  [].forEach.call(oldCluster, ((color: string, index: number) => {
    styleText = styleText.replace(new RegExp(color, "ig"), newCluster[index]);
  }));
  return styleText;
}

// 创建xhr，远程获取css文件
function getCSSString(url: any): Promise<string> {
  return new Promise((resolve: Function) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        resolve(xhr.responseText.replace(/@font-face{[^}]+}/, ""));
      }
    };
    xhr.open("GET", url);
    xhr.send();
  });
}

/**
 * 传入一个颜色的HEX (#F00)，得到这个颜色的深浅颜色数组
 * 我们知道，我们默认的主色调蓝色，在实际使用中，还需要对应的浅蓝和深蓝
 * @param  {[string]]} theme [color]
 * @return {[array]}  [对应的深浅颜色数组]
 */
function getThemeCluster(color: string) {
  color = color.replace("#", "");
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

  const clusters = [color];

  for (let i = 0; i <= 9; i++) {
    clusters.push(tintColor(color, Number((i / 10).toFixed(2))));
  }
  clusters.push(shadeColor(color, 0.1));
  return clusters;
}
