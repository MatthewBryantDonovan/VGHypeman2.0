import Youtube from '../Youtube/index.vue';
import Twitch from '../Twitch/index.vue';
import Pic from '../Pic/index.vue';
import Gameinfo from '../Gameinfo/index.vue';
import $ from 'jquery'
import {
  EventBus
} from "../event-bus";

import axios from 'axios/dist/axios.js'



export default {
  name: 'display',
  components: {
    Youtube,
    Twitch,
    Pic,
    Gameinfo
  },
  props: [],
  data() {
    return {
      PicShow: true,
      TwitchShow: false,
      YoutubeShow: false,
      GameinfoShow: false,
      open: false,
      iShow: false,
      unfavorited: true,
      favoriteAccess: false,
      userId: null,
      favoriteGames: "",
      favoriteArts: ""
    }
  },
  computed: {

  },
  mounted() {

    // Event Bus's to update information in real time
    EventBus.$on("close-gameinfo", closeGameinfo => {
      this.GameinfoShow = closeGameinfo;
    });
    EventBus.$on("i-show", iShow => {
      this.iShow = iShow;
    });
    EventBus.$on("favorite-access", favoriteAccess => {
      this.favoriteAccess = favoriteAccess;
      this.unfavorited = true;
    });
    EventBus.$on("user-id", theuserId => {
      this.userId = theuserId;
    });
    EventBus.$on("favorite-games", favoriteGames => {
      this.favoriteGames = favoriteGames;
    });
    EventBus.$on("favorite-arts", favoriteArts => {
      this.favoriteArts = favoriteArts;
    });
    EventBus.$on("unfav-enabled", closeLanding => {
      this.unfavorited = closeLanding;
    });
    EventBus.$on("fav-enabled", alwaysTrue => {
      this.unfavorited = alwaysTrue;
    });

  },
  methods: {

    // Display the pic component
    display_pic: function () {
      this.PicShow = true;
      this.TwitchShow = false;
      this.YoutubeShow = false;
      setTimeout(function () {
        if (parseInt($('.Slide1img').css("width").replace("px", "")) <= 10) {
          $('.pic-slick').slick("getSlick").refresh();
        }
      }, 250);
    },

    // Display the twitch component
    display_twitch: function () {
      this.PicShow = false;
      this.TwitchShow = true;
      this.YoutubeShow = false;
      setTimeout(function () {
        if (parseInt($('.Slide1iframe').css("width").replace("px", "")) <= 10) {
          $('.twitch-slick').slick("getSlick").refresh();
        }
      }, 250);
    },

    // Display the youtube component
    display_youtube: function () {
      this.PicShow = false;
      this.TwitchShow = false;
      this.YoutubeShow = true;
      setTimeout(function () {
        if (parseInt($('.Slide1youtube').css("width").replace("px", "")) <= 10) {

          $('.youtube-slick').slick("getSlick").refresh();
        }
      }, 250);
    },

    // Display the gameinfo component
    display_gameinfo: function () {
      this.GameinfoShow = true;
    },
    
    // Favorite a game for a user to add to is profile
    favorite_game: function () {
      if (this.userId != null) {

        this.unfavorited = !this.unfavorited;
        var tempGameObject = [];
        this.favoriteGames = this.favoriteGames + (":-:" + $("#fav").attr("data-name"));
        this.favoriteArts = this.favoriteArts + (":-:" + $("#fav").attr("data-img"));
        let request = {
          favoriteGame: this.favoriteGames,
          favoriteArt: this.favoriteArts,
        }

        let games = this.favoriteGames.split(':-:');
        let arts = this.favoriteArts.split(':-:');

        for (let index = 1; index < games.length; index++) {
          tempGameObject.push({
            game: games[index],
            art: arts[index]
          })
        }

        EventBus.$emit("temp-object", tempGameObject);
        EventBus.$emit("favorite-games", this.favoriteGames);
        EventBus.$emit("favorite-arts", this.favoriteArts);
        axios.put('https://vghypeman.herokuapp.com/api/update/' + this.userId + '/favorite', request).then(res => {
          return res;
        })
      }
    },

    // Remove a favorite game from a users profile
    unfavorite_game() {
      if (this.userId != null) {

        var tempGameObject = [];
        this.unfavorited = !this.unfavorited;
        this.favoriteGames = this.favoriteGames.replace((":-:" + $("#unfav").attr("data-name")), "");
        this.favoriteArts = this.favoriteArts.replace((":-:" + $("#unfav").attr("data-img")), "");
        let request = {
          favoriteGame: this.favoriteGames,
          favoriteArt: this.favoriteArts,
        }

        let games = this.favoriteGames.split(':-:');
        let arts = this.favoriteArts.split(':-:');

        for (let index = 1; index < games.length; index++) {
          tempGameObject.push({
            game: games[index],
            art: arts[index]
          })
        }

        EventBus.$emit("temp-object", tempGameObject);
        EventBus.$emit("favorite-games", this.favoriteGames);
        EventBus.$emit("favorite-arts", this.favoriteArts);
        axios.put('https://vghypeman.herokuapp.com/api/update/' + this.userId + '/favorite', request).then(res => {
          return res;
        })
      }
    }
  }
}