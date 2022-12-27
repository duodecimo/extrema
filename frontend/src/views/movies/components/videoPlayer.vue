<script setup>
import { ref, reactive, onMounted, nextTick } from "vue";
import Artplayer from "artplayer";
import videoUrl from "../../../assets/sample/sintel-short.mp4";
import posterUrl from "../../../assets/sample/poster.jpg";
import thumbUrl from "../../../assets/sample/thumbnails.png";
const player = ref(null);
const options = reactive({
  url: videoUrl,
  title: "Extrema",
  poster: posterUrl,
  volume: 0.5,
  isLive: false,
  muted: false,
  autoplay: true,
  pip: true,
  autoSize: true,
  autoMini: true,
  screenshot: true,
  setting: false,
  loop: true,
  flip: true,
  playbackRate: true,
  aspectRatio: true,
  fullscreen: true,
  fullscreenWeb: true,
  subtitleOffset: true,
  miniProgressBar: true,
  mutex: true,
  backdrop: true,
  playsInline: true,
  autoPlayback: true,
  airplay: true,
  theme: "#23ade5",
  lang: navigator.language.toLowerCase(),
  whitelist: ["*"],
  moreVideoAttr: {
    crossOrigin: "anonymous",
  },
  settings: [
    {
      width: 200,
      html: "Subtitle",
      tooltip: "Bilingual",
      icon: '<img width="22" heigth="22" src="/assets/img/subtitle.svg">',
      selector: [
        {
          html: "Display",
          tooltip: "Show",
          switch: true,
          onSwitch: function (item) {
            item.tooltip = item.switch ? "Hide" : "Show";
            art.subtitle.show = !item.switch;
            return !item.switch;
          },
        },
        {
          default: true,
          html: "Bilingual",
          url: "/assets/sample/subtitle.srt",
        },
        {
          html: "Chinese",
          url: "/assets/sample/subtitle.cn.srt",
        },
        {
          html: "Japanese",
          url: "/assets/sample/subtitle.jp.srt",
        },
      ],
      onSelect: function (item) {
        art.subtitle.switch(item.url, {
          name: item.html,
        });
        return item.html;
      },
    },
    {
      html: "Switcher",
      icon: '<img width="22" heigth="22" src="/assets/img/state.svg">',
      tooltip: "OFF",
      switch: false,
      onSwitch: function (item) {
        item.tooltip = item.switch ? "OFF" : "ON";
        console.info("You clicked on the custom switch", item.switch);
        return !item.switch;
      },
    },
    {
      html: "Slider",
      icon: '<img width="22" heigth="22" src="/assets/img/state.svg">',
      tooltip: "5x",
      range: [5, 1, 10, 0.1],
      onRange: function (item) {
        return item.range + "x";
      },
    },
  ],
  contextmenu: [
    {
      html: "Custom menu",
      click: function (contextmenu) {
        console.info("You clicked on the custom menu");
        contextmenu.show = false;
      },
    },
  ],
  layers: [
    {
      html: '<img width="100" src="/assets/sample/layer.png">',
      click: function () {
        // window.open("https://aimu.app");
        console.info("You clicked on the custom layer");
      },
      style: {
        position: "absolute",
        top: "20px",
        right: "20px",
        opacity: ".9",
      },
    },
  ],
  quality: [
    {
      default: true,
      html: "SD 480P",
      url: "/assets/sample/sintel-short.mp4",
    },
    {
      html: "HD 720P",
      url: "/assets/sample/sintel-short.mp4",
    },
  ],
  thumbnails: {
    url: thumbUrl,
    number: 60,
    column: 10,
  },
  subtitle: {
    url: "/assets/sample/subtitle.srt",
    type: "srt",
    style: {
      color: "#fe9200",
      fontSize: "20px",
    },
    encoding: "utf-8",
  },
  highlight: [
    {
      time: 15,
      text: "One more chance",
    },
    {
      time: 30,
      text: "谁でもいいはずなのに",
    },
    {
      time: 45,
      text: "夏の想い出がまわる",
    },
    {
      time: 60,
      text: "こんなとこにあるはずもないのに",
    },
    {
      time: 75,
      text: "终わり",
    },
  ],
  controls: [
    {
      position: "right",
      html: "Control",
      index: 1,
      tooltip: "Control Tooltip",
      style: {
        marginRight: "20px",
      },
      click: function () {
        console.info("You clicked on the custom control");
      },
    },
  ],
  icons: {
    loading: '<img src="/assets/img/ploading.gif">',
    state: '<img width="150" heigth="150" src="/assets/img/state.svg">',
    indicator: '<img width="16" heigth="16" src="/assets/img/indicator.svg">',
  },
});
onMounted(() => {
  nextTick(() => {
    new Artplayer({
      ...options,
      container: player.value,
    });
  });
});
defineExpose({
  player,
  options,
});
</script>

<template>
  <div ref="player" style="width: 600px; height: 400px"></div>
</template>
