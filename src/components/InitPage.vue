<template>
  <div>
    <div class="init-page">
      <!-- <img class="init-bg" src="../assets/bg.png" alt="" /> -->
      <div class="fullscreen-bg"></div>
      <div class="init-box-bg init-top">
        <img class="logo-img" src="../assets/logo-w.png" alt="" />
      </div>
      <div class="init-box-bg init-bottom">
        <router-link class="jump-btn" to="/home">开始定制</router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, onUnmounted } from "vue";

const isMobile = ref(false);

onMounted(() => {
  isMobile.value = window.innerWidth < 780 ? true : false;
});
onUnmounted(() => {});
</script>
<style scoped>
.fullscreen-bg {
  width: 100%; /* 宽度填满 */
  height: 100%; /* 高度填满 */
  background-image: url("../assets/bg.png"); /* 替换为你的图片URL */
  background-position: center; /* 图片居中显示 */
  background-repeat: no-repeat; /* 图片不重复 */
  background-size: cover; /* 关键属性，保持比例铺满 */
  z-index: -1; /* 确保背景在其他内容之下 */
}
.init-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.init-bg {
  /* width: 1440px; */
  /* height: 1080px; */
  min-width: 100vw;
  min-height: 100vh;
}
.init-box-bg {
  width: 100%;
  height: 8vh;
  background: rgba(0, 0, 0, 0.42);
}
.init-top {
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}
.init-bottom {
  width: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.jump-btn {
  width: 160px;
  height: 40px;
  line-height: 40px;    
  background: url("../assets/icon-anniu1.png") no-repeat;
  background-size: 100% 100%;
  font-size: 20px;
  color: #2b2d20;
  text-align: center;
  display: block;
}
.logo-img {
  max-width: 60%;
}
@media (min-width: 1024px) {
  .init-top {
    padding-left: 60px;
    justify-content: flex-start;
  }
  .init-box-bg {
    height: 11.5vh;
  }
  .jump-btn {
    height: 44px;
    line-height: 44px;
  }
}
</style>
