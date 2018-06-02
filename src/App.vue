<template>
  <div id="app">
    <home-component></home-component>
  </div>
</template>

<script>
import HomeComponent from "./components/home/home.vue";
import EventBus from './event-bus.js';
import GoogleApi from './services/google.js';

export default {
  name: "app",

  components: {
    HomeComponent
  },

  created() {
    (function(d, script) {
      script = d.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.onload = function() {
        GoogleApi.init();
      };
      script.src = "https://apis.google.com/js/api.js";
      d.getElementsByTagName("head")[0].appendChild(script);
    })(document);
  }

};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

html,
body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>
