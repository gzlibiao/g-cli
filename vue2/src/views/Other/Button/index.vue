<template>
  <div class="container">
    <div class="box" v-for="d in data">
      <div class="img"><img :src="d.img" alt="" /></div>
      <p>{{ d.text }}</p>
    </div>
  </div>
</template>

<script setup lang="ts" name="Button">
// LIB

// STATE
const data = [
  { text: "录音机", img: new URL("./img/1.png", import.meta.url).href },
  { text: "通讯录", img: new URL("./img/2.png", import.meta.url).href },
  { text: "电话", img: new URL("./img/3.png", import.meta.url).href },
  { text: "短信", img: new URL("./img/4.png", import.meta.url).href },
  { text: "浏览器", img: new URL("./img/5.png", import.meta.url).href },
  { text: "相机", img: new URL("./img/6.png", import.meta.url).href },
  { text: "相册", img: new URL("./img/7.png", import.meta.url).href },
  { text: "哔哩哔哩", img: new URL("./img/8.png", import.meta.url).href },
  { text: "日历", img: new URL("./img/9.png", import.meta.url).href },
  { text: "时钟", img: new URL("./img/10.png", import.meta.url).href },
  { text: "Youtube", img: new URL("./img/11.png", import.meta.url).href },
  { text: "Facebook", img: new URL("./img/12.png", import.meta.url).href },
  { text: "微信", img: new URL("./img/13.png", import.meta.url).href },
  { text: "QQ", img: new URL("./img/14.png", import.meta.url).href },
  {
    text: "微博",
    img: new URL("./img/15.png", import.meta.url).href
  }];
// FUNCTION

// EVENT
</script>

<style scoped lang="scss">
.container {
  width: 700px;
  height: 600px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  padding: 10px;
  column-gap: 10px;
}

.container .box {
  /* 鼠标放上去变成小手 */
  cursor: pointer;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
}

.container .box .img {
  /* 这里让图片在盒子里垂直+水平居中 */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  /* 圆角属性 */
  border-radius: 20px;
  /* 盒子阴影 */
  box-shadow: 18px 18px 30px rgba(0, 0, 0, 0.2),
  -18px -18px 30px rgba(255, 255, 255, 1);
  /* 过渡时间 ease-out是指先快速 后慢速 */
  transition: all 0.2s ease-out;
}

.container .box .img img {
  width: 60px;
  transition: all 0.2s ease-out;
}

.container .box p {
  color: slategrey;
}

.container .box .img:hover {
  /* inset 是内部阴影 默认是外部阴影outset */
  box-shadow: 0 0 0 rgba(0, 0, 0, 0.2), 0 0 0 rgba(255, 255, 255, 0.8),
  inset 18px 18px 30px rgba(0, 0, 0, 0.1),
  inset -18px -18px 30px rgba(255, 255, 255, 1);
}

.container .box .img:hover img {
  width: 58px;
}
</style>
