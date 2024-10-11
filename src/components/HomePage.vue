<template>
  <div>
    <div class="colorPage" v-show="colorPage">
      <!-- 顶部切换 -->
      <div class="colorPage-top">
        <img class="logo" src="../assets/logo.png" alt="" />
      </div>

      <div class="share-line" :class="!showSelectList ? 'sp-show' : ''">
        <div>
          <p>定制您的专属&nbsp;&nbsp;<img src="../assets/word.png" alt="" /></p>
        </div>
      </div>
      <!-- 模型 -->
      <div
        class="main-part"
        id="modelPart"
        :class="!showSelectList ? 'sp-show' : ''"
      >
        <swiper
          :freeMode="true"
          :mousewheel="true"
          :modules="modules"
          @swiper="onSwiper"
          :scrollbar="{ draggable: true }"
        >
          <swiper-slide v-for="(item, index) in swiperList" :key="index">
            <div class="sp-relative">
              <img
                class="sp-img"
                :src="require(`../assets/${item.image}`)"
                alt=""
              />
              <img
                class="sp-img sp-topImage"
                v-if="item.image1 !== null && item.image1 !== ''"
                :src="require(`../assets/${item.image1}`)"
                alt=""
              />
              <img
                class="sp-img sp-topImage"
                v-if="item.bottomImage !== null"
                :src="require(`../assets/${item.bottomImage}`)"
                alt=""
              />
              <img
                class="sp-img sp-topImage"
                v-if="item.topImage !== null"
                :src="require(`../assets/${item.topImage}`)"
                alt=""
              />

              <img
                class="sp-img sp-topImage"
                v-if="item.image2 !== null && item.image2 !== ''"
                :src="require(`../assets/${item.image2}`)"
                alt=""
              />
            </div>
          </swiper-slide>
        </swiper>
        <div class="swiper-btn2-wrap" v-show="!isMobile">
          <img
            class="swiper-btn2 prev"
            @click="swiperPrevSlide(swiperRef)"
            src="../assets/arrow-l.png"
            alt=""
          />
          <img
            class="swiper-btn2 next"
            @click="swiperNextSlide(swiperRef)"
            src="../assets/arrow-r.png"
            alt=""
          />
        </div>
      </div>

      <div id="share" class="share-line2" @click="openSharePop">
        <p>分享您的 <img src="../assets/word.png" alt="" /></p>
      </div>
      <!-- 选择 -->
      <footer
        id="colorPicker"
        class="colorPage-footer"
        :class="!showSelectList ? '' : 'sp-show'"
      >
        <div
          id="lineBar"
          class="lineBar"
          :class="showSelectList ? 'unfoldIcon' : 'foldIcon'"
          @click="showSelectList = !showSelectList"
        >
          <img src="../assets/icon-qiehuan.png" alt="" />
        </div>

        <div class="colorPage-select-box">
          <div class="wrapper">
            <div
              class="area-item"
              v-for="(areaInfo, index) in areaList"
              :key="index"
              @click="() => handleSelectArea(areaInfo.areaName, index)"
              :class="currentAreaIndex == index ? 'tabActive' : ''"
            >
              <div>
                <p>{{ areaInfo.areaName }}</p>
                <span> {{ areaInfo.enName }}</span>
              </div>
            </div>
          </div>

          <div class="colorItem-wrapper">
            <div
              class="colorItem-wrap"
              v-for="(colorInfo, index) in areaList[currentAreaIndex].colorList"
              :key="colorInfo.color"
              @click="() => switchColor(index)"
              :class="
                index == areaList[currentAreaIndex].colorIndex ? 'active' : ''
              "
            >
              <div class="colorItem">
                <div
                  class="color"
                  :style="{ backgroundColor: colorInfo.color }"
                ></div>
              </div>
              <p class="">
                {{ colorInfo.name }} <br />
                <span>{{ colorInfo.es }}</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
    <!-- 分享 -->
    <div class="shareMask" v-show="sharePop">
      <div class="sharePop" v-show="isMobile">
        <div class="share-top">
          <img class="logo" src="../assets/logo.png" alt="" />
        </div>
        <div class="title-row">
          <div class="share-line">
            <p>分享您的 <img class="word" src="../assets/word.png" alt="" /></p>
          </div>
          <img
            class="close-btn"
            src="../assets/close.png"
            alt=""
            @click="closeSharePop()"
          />
        </div>
        <div class="share-body">
          <div class="share-img-part">
            <div class="share-swiper-wrap" ref="createImageRef">
              <swiper :modules="modules" @swiper="onSwiper1" :loop="true">
                <swiper-slide v-for="(item, index) in swiperList" :key="index">
                  <div class="sp-relative">
                    <img :src="require(`../assets/${item.image}`)" alt="" />
                    <img
                      class="sp-topImage"
                      v-if="item.topImage !== null"
                      :src="require(`../assets/${item.topImage}`)"
                      alt=""
                    />
                    <img
                      class="sp-topImage"
                      v-if="item.bottomImage !== null"
                      :src="require(`../assets/${item.bottomImage}`)"
                      alt=""
                    />
                    <img
                      class="sp-topImage"
                      v-if="item.image1 !== null && item.image1 !== ''"
                      :src="require(`../assets/${item.image1}`)"
                      alt=""
                    />
                    <img
                      class="sp-topImage"
                      v-if="item.image2 !== null && item.image2 !== ''"
                      :src="require(`../assets/${item.image2}`)"
                      alt=""
                    />
                  </div>
                </swiper-slide>
              </swiper>
            </div>
            <div class="water-mark">
              Share You <img src="../assets/word.png" alt="" />
            </div>
          </div>
          <div class="share-info-part">
            <div class="share-name-part">
              <div class="inputBox">
                <input type="text" required="" v-model="shareName" />
                <span
                  >为您的配色命名 <br /><span class="sp-en"
                    >Name Your EAU75</span
                  ></span
                >
              </div>
              <img src="../assets/write.png" alt="" class="icon" />
            </div>
            <div class="sp-line"></div>
            <div class="share-save-part">
              <div class="share-save-area" @click="copyAddress()">
                <p>
                  <img class="sp-icon" src="../assets/icon-fuzhi.png" alt="" />
                  <span>复制链接 </span>
                </p>
              </div>
              <div class="share-save-line"></div>

              <div class="share-save-area" @click="createImage()">
                <p>
                  <img class="sp-icon" src="../assets/down.png" alt="" />
                  <span>保存图片</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- pc分享 -->
      <div class="sharePop pc-share" v-show="!isMobile">
        <div class="share-top">
          <img class="logo" src="../assets/logo.png" alt="" />
        </div>
        <img
          class="close-btn"
          src="../assets/close.png"
          alt=""
          @click="closeSharePop()"
        />
        <div class="pc-share-title share-line">
          <p>分享您的 <img class="word" src="../assets/word.png" alt="" /></p>
        </div>

        <div class="share-body sp-relative">
          <div class="share-img-part">
            <div class="share-swiper-wrap" ref="createImageRef">
              <swiper :modules="modules" @swiper="onSwiper1" :loop="true">
                <swiper-slide v-for="(item, index) in swiperList" :key="index">
                  <div class="sp-relative">
                    <img :src="require(`../assets/${item.image}`)" alt="" />
                    <img
                      class="sp-topImage"
                      v-if="item.topImage !== null"
                      :src="require(`../assets/${item.topImage}`)"
                      alt=""
                    />
                    <img
                      class="sp-topImage"
                      v-if="item.bottomImage !== null"
                      :src="require(`../assets/${item.bottomImage}`)"
                      alt=""
                    />
                    <img
                      class="sp-topImage"
                      v-if="item.image1 !== null && item.image1 !== ''"
                      :src="require(`../assets/${item.image1}`)"
                      alt=""
                    />
                    <img
                      class="sp-topImage"
                      v-if="item.image2 !== null && item.image2 !== ''"
                      :src="require(`../assets/${item.image2}`)"
                      alt=""
                    />
                  </div>
                </swiper-slide>
              </swiper>
            </div>
            <div class="water-mark">
              Share You <img src="../assets/word.png" alt="" />
            </div>
          </div>
          <div class="share-info-part">
            <div class="share-name-part">
              <div class="inputBox">
                <input type="text" required="" v-model="shareName" />
                <span
                  >为您的配色命名 <br /><span class="sp-en"
                    >Name Your EAU75</span
                  ></span
                >
              </div>
              <img src="../assets/write.png" alt="" class="icon" />
            </div>
            <div class="sp-line"></div>
            <div class="share-save-part">
              <div class="share-save-area" @click="copyAddress()">
                <p>
                  <img class="sp-icon" src="../assets/icon-fuzhi.png" alt="" />
                  <span>复制链接 </span>
                </p>
              </div>

              <div class="share-save-area" @click="createImage()">
                <p>
                  <img class="sp-icon" src="../assets/down.png" alt="" />
                  <span>保存图片</span>
                </p>
              </div>
            </div>
          </div>

          <img
            class="swiper-btn prev"
            @click="swiperPrevSlide(swiper1Ref)"
            src="../assets/prev.png"
            alt=""
          />
          <img
            class="swiper-btn next"
            @click="swiperNextSlide(swiper1Ref)"
            src="../assets/next.png"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, onUnmounted, reactive } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, FreeMode, Mousewheel, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import html2canvas from "html2canvas";
import { Clipboard } from "v-clipboard";

let modules = [Navigation, FreeMode, Mousewheel, Scrollbar];
const isMobile = ref(false);
let colorPage = ref(true); // 模型颜色页面
// let menuBtn = ref(false); // 菜单按钮
let showSelectList = ref(true); // 是否显示选择框

// 当前选择的部件
let currentAreaIndex = ref(0);

// 轮播列表
const swiperList = ref([
  {
    image: "front-img.png",
    topImage: null,
    bottomImage: null,
    image1: null,
    image2: null,
  },
  {
    image: "side-img.png",
    topImage: null,
    bottomImage: null,
    image1: null,
    image2: null,
  },
  {
    image: "back-img.png",
    topImage: null,
    bottomImage: null,
    image1: null,
    image2: null,
  },
]);
// 更换颜色的部位
const areaList = reactive([
  {
    areaName: "上盖",
    enName: "Top case",
    name: "topImage",
    color: {
      name: "电泳白",
      es: "Electrophoresis White",
      color: "#ffffff",
    },
    colorIndex: null,
    colorList: [
      {
        name: "电泳白",
        es: "Electrophoresis White",
        color: "#c5c5c5",
        imgList: [
          "上盖/正面/电泳白.png",
          "上盖/背面/电泳白.png",
          "上盖/侧面/电泳白.png",
        ],
      },
      {
        name: "阳极深紫",
        es: "Anodized Deep Purple",
        color: "#632b8c",
        imgList: [
          "上盖/正面/紫色.png",
          "上盖/背面/紫色.png",
          "上盖/侧面/紫色.png",
        ],
      },
      {
        name: "阳极红色",
        es: "Anodized Red",
        color: "#c82f34",
        imgList: [
          "上盖/正面/红色.png",
          "上盖/背面/红色.png",
          "上盖/侧面/红色.png",
        ],
      },
      {
        name: "阳极藏蓝",
        es: "Anodized Navy Blue",
        color: "#000080",
        imgList: [
          "上盖/正面/蓝色.png",
          "上盖/背面/蓝色.png",
          "上盖/侧面/蓝色.png",
        ],
      },
      {
        name: "阳极墨绿",
        color: "#56765d",
        es: "Anodized Dark Green",
        imgList: [
          "上盖/正面/绿色.png",
          "上盖/背面/绿色.png",
          "上盖/侧面/绿色.png",
        ],
      },
      {
        name: "阳极银",
        es: "Anodized silver",
        color: "#9fa4a0",
        imgList: [
          "上盖/正面/阳极银.png",
          "上盖/背面/阳极银.png",
          "上盖/侧面/阳极银.png",
        ],
      },
    ],
  },
  {
    areaName: "下盖",
    enName: "Bottom case",
    name: "bottomImage",
    color: {
      name: "电泳白",
      es: "Electrophoresis White",
      color: "#ffffff",
    },
    colorIndex: null,
    colorList: [
      {
        name: "阳极金色",
        es: "Anodized Gold",
        color: "#fdeac1",
        imgList: [
          "下盖/正面/金色.png",
          "下盖/侧面/金色.png",
          "下盖/背面/金色.png",
        ],
      },
      {
        name: "电泳白",
        es: "Electrophoresis White",
        color: "#c5c5c5",
        imgList: [
          "下盖/正面/电泳白.png",
          "下盖/侧面/电泳白.png",
          "下盖/背面/电泳白.png",
        ],
      },

      {
        name: "阳极红色",
        es: "Anodized Red",
        color: "#c82f34",
        imgList: [
          "下盖/正面/红色.png",
          "下盖/侧面/红色.png",
          "下盖/背面/红色.png",
        ],
      },
      {
        name: "阳极藏蓝",
        es: "Anodized Navy Blue",
        color: "#000080",
        imgList: [
          "下盖/正面/蓝色.png",
          "下盖/侧面/蓝色.png",
          "下盖/背面/蓝色.png",
        ],
      },
      {
        name: "阳极黑色",
        es: "Anodized Black",
        color: "#000",
        imgList: [
          "下盖/正面/黑色.png",
          "下盖/侧面/黑色.png",
          "下盖/背面/黑色.png",
        ],
      },
      {
        name: "阳极银",
        es: "Anodized silver",
        color: "#9fa4a0",
        imgList: [
          "下盖/正面/阳极银.png",
          "下盖/侧面/阳极银.png",
          "下盖/背面/阳极银.png",
        ],
      },
    ],
  },
  {
    areaName: "后配重",
    enName: "Back Weight",
    name: "image1",
    color: {
      name: "电泳白",
      es: "Electrophoresis White",
      color: "#ffffff",
    },
    colorIndex: null,
    colorList: [
      {
        name: "镜面PVD",
        es: "Mirror Finish PVD",
        color: "rgb(119, 119, 119)",
        imgList: [
          "后配重/侧面/铜.png",
          "后配重/正面/铜.png",
          "后配重/背面/铜.png",
        ],
      },
      {
        name: "电泳白",
        es: "Electrophoresis White",
        color: "#c5c5c5",
        imgList: [
          "后配重/侧面/电泳白.png",
          "后配重/正面/电泳白.png",
          "后配重/背面/电泳白.png",
        ],
      },
      {
        name: "阳极深紫",
        es: "Anodized Deep Purple",
        color: "#632b8c",
        imgList: [
          "后配重/侧面/紫色.png",
          "后配重/正面/紫色.png",
          "后配重/背面/紫色.png",
        ],
      },
      {
        name: "阳极红色",
        es: "Anodized Red",
        color: "#c82f34",
        imgList: [
          "后配重/侧面/红色.png",
          "后配重/正面/红色.png",
          "后配重/背面/红色.png",
        ],
      },
      {
        name: "阳极藏蓝",
        es: "Anodized Navy Blue",
        color: "#000080",
        imgList: [
          "后配重/侧面/蓝色.png",
          "后配重/正面/蓝色.png",
          "后配重/背面/蓝色.png",
        ],
      },
      {
        name: "阳极黑",
        es: "Anodized Black",
        color: "#000",
        imgList: [
          "后配重/侧面/黑色.png",
          "后配重/正面/黑色.png",
          "后配重/背面/黑色.png",
        ],
      },
      {
        name: "阳极绿",
        es: "Anodized Green",
        color: "#56765d",
        imgList: [
          "后配重/侧面/绿色.png",
          "后配重/正面/绿色.png",
          "后配重/背面/绿色.png",
        ],
      },
    ],
  },
  {
    areaName: "配重",
    enName: "Weight",
    name: "image2",
    color: {
      name: "电泳白",
      es: "Electrophoresis White",
      color: "#ffffff",
    },
    colorIndex: null,
    colorList: [
      // {
      //   name: "阳极金色",
      //   es: "Anodized Gold",
      //   color: "#fdeac1",
      //   imgList: ["", "", "下配重/背面/下配重金色.png"],
      // },
      // {
      //   name: "阳极银",
      //   es: "Anodized silver",
      //   color: "#9fa4a0",
      //   imgList: ["", "", "下配重/背面/下配重银色.png"],
      // },
      {
        name: "阳极黑",
        es: "Anodized Black",
        color: "#151619",
        imgList: ["", "", "下配重/背面/下配重黑色.png"],
      },
      {
        name: "镜面PVD",
        es: "Mirror Finish PVD",
        color: "#3f3f3f",
        imgList: ["", "", "下配重/背面/背部下配重.png"],
      },
    ],
  },
]);

// 切换颜色
function switchColor(index) {
  // 对应的部位内容
  let areaItem = areaList[currentAreaIndex.value];
  swiperList.value[0][areaItem.name] = areaItem.colorList[index].imgList[0];
  swiperList.value[1][areaItem.name] = areaItem.colorList[index].imgList[1];
  swiperList.value[2][areaItem.name] = areaItem.colorList[index].imgList[2];
}

// 选择区域
function handleSelectArea(info, index) {
  currentAreaIndex.value = index;
}

onMounted(() => {
  isMobile.value = window.innerWidth < 780 ? true : false;
});
onUnmounted(() => {});

// 创建分享图片
const sharePop = ref(false);
const createImageRef = ref(null);
const shareName = ref("");
function createImage() {
  html2canvas(createImageRef.value, {}).then((canvas) => {
    let img = document.createElement("a");
    img.href = canvas
      .toDataURL("image/jpeg")
      .replace("image/jpeg", "image/octet-stream");
    if (shareName.value == "") {
      img.download = "share.jpg";
    } else {
      img.download = shareName.value + ".jpg";
    }
    img.click();
  });
}
function openSharePop() {
  sharePop.value = true;
}
const swiper1Ref = ref();
const swiperRef = ref();
function onSwiper(swiper) {
  swiperRef.value = swiper;
}
function onSwiper1(swiper) {
  swiper1Ref.value = swiper;
}
function swiperPrevSlide(swiper) {
  swiper.slidePrev();
}
function swiperNextSlide(swiper) {
  swiper.slideNext();
}
function closeSharePop() {
  sharePop.value = false;
}
function copyAddress() {
  Clipboard.copy("gm8.case.unitewx.com");
}
// 更新视图角度
// let currentCameraIndex = 0;
</script>
<style scoped></style>
