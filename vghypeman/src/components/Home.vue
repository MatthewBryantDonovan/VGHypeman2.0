<template>
  <div class="Home">
    <Landing v-show="LandingShow" />
    <Display v-show="!LandingShow"/>
  </div>
</template>


<script>
  import {
    EventBus
  } from "./event-bus";
  import Landing from './Landing/index.vue';
  import Display from './Display/index.vue';
  import axios from '../../node_modules/axios/dist/axios.js'

  export default {
    name: "Home",
    components: {
      Landing,
      Display
    },
    data() {
      return {
        LandingShow: true,
        DisplayShow: false
      }
    },
    mounted() {
      EventBus.$on("close-landing", closeLanding => {
        this.LandingShow = closeLanding;
      });
    },
    methods: {
      triggerClick: function () {
        axios.get('https://stardateapi.herokuapp.com/api/csd').then(res => {
          this.text = res.data.a;
        })
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>