<template>
  <div id="app">
    <Profile v-show="ProfileShow"/>
    <Logregister v-show="LogregisterShow"/>
    <div class='container'>
    <nav id="hi8 valign-wrapper">
      <div class="nav-wrapper">
        <a href="#" v-on:click="close_landing()">
          <div class="left hide-on-small-only" id="VGHlogo"></div>
        </a>
        <div class="left show-on-small hide-on-med-and-up" id="VGHlogoMobile" href="#" v-on:click="close_landing()"></div>
        <form action>
          <ul id="nav-mobile" class="right">
            <li>
              <input id="game-entry" class="form-control" type="search" placeholder="Search" aria-label="Search"
                v-on:keyup.enter="getGame()" />
            </li>
            <li>
              <button class="searchBtn" type id="game-submit" v-on:click="getGame()" />
            </li>
            <li>
              <button v-on:click="display_profile()" class="userBtn" type="button" @click.stop="show"></button>
              
            </li>
          </ul>
        </form>
      </div>
    </nav>
    </div>
    <div class='container'>
    <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery';
  // import this anywhere you want to 'Bus' data around
  import {
    EventBus
  } from "./components/event-bus";
  import Profile from './components/Profile/index.vue'
  import Logregister from './components/Logregister/index.vue'

  export default {
    name: "app",
    components: {
      Profile,
      Logregister
    },
    data() {
      return {
        game: "",
        ProfileShow: false,
        closeLanding: true,
        LogregisterShow: false,
        LoggedIn: false
      }
    },
    mounted() {
      EventBus.$on("close-profile", closeProfile => {
        this.ProfileShow = closeProfile;
      });
      EventBus.$on("close-logregister", closeLogregister => {
        this.LogregisterShow = closeLogregister;
      });
      EventBus.$on("logged-in", LoggedIn => {
        this.LoggedIn = LoggedIn;
        $(".userBtn").click();
      });
    },
    methods: {
      getGame: function () {
        event.preventDefault();
        this.game = $("#game-entry").val().trim();
        if (this.game == "") {
          return;
        }
        $(".car-img").attr("src", "./assets/MediaInAnotherCastle.png");
        $(".car-twitch").attr("src", "");
        $(".car-youtube").attr("src", "");
        $(".game-name").html("");
        $("#game-genres").html("");
        $("#game-platforms").html("");
        $("#game-released").html("");
        $("#game-plot").html("");

        $("#game-entry").val("");
        // this.game now has game name for the API
        // passing it via 'Bus' to Pic,Twitch,Youtube
        EventBus.$emit("clicked-event", this.game);
        this.closeLanding = false;
        EventBus.$emit("close-landing", this.closeLanding);
        
      },
      display_profile: function () {
        if(this.LoggedIn == false){
          this.LogregisterShow = true;
        } else {
          this.ProfileShow = true;          
        }
      },
      close_landing: function () {
        this.closeLanding = !this.closeLanding;
        EventBus.$emit("close-landing", this.closeLanding);
      },


    },

    
    props: {},
  };
</script>

<style>
  @import url('../public/style.css');

  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
    color: #2c3e50;
  }

  .container {
    width: 100vw;
}
</style>