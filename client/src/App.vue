<template>
  <div id="app">

    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<style>
  @import "../public/css/reset.css";
  html,
  body,
  #app {
    width: 100vw;
    height: 100vh;
    font-size: 16px;
    background-color: #f7f7f7;
  }


</style>
