<template>
  <div>
    <!-- <p>{{ message }}</p> -->
    <header-component />
    <router-view />
    <!-- <footer-component /> -->
  </div>
</template>

<script>
import HeaderComponent from './components/header';

export default {
  // data: function () {
  //   return {
  //     message: "Hello Vue!"
  //   }
  // }
  components: {
    HeaderComponent
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
