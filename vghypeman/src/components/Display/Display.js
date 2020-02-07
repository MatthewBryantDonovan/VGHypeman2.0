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
    EventBus.$on("close-gameinfo", closeGameinfo => {   
      this.GameinfoShow = closeGameinfo;
  });
    EventBus.$on("i-show", iShow => {   
      this.iShow = iShow;
  });
    EventBus.$on("favorite-access", favoriteAccess => {   
      this.favoriteAccess = favoriteAccess;
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

  },
  methods: {    

    display_pic: function () {
      $('.carousel-inner').slick("getSlick").refresh();
      this.PicShow = true;
      this.TwitchShow = false;
      this.YoutubeShow = false;
      $('.pic-slick').slick("getSlick").refresh();
    },
    
    display_twitch: function () {
      $('.carousel-inner').slick("getSlick").resize();
      this.PicShow = false;
      this.TwitchShow = true;
      this.YoutubeShow = false;
      $('.twitch-slick').slick("getSlick").resize();
    },

    display_youtube: function () {
      $('.carousel-inner').slick("getSlick").resize();
      this.PicShow = false;
      this.TwitchShow = false;
      this.YoutubeShow = true;
      $('.youtube-slick').slick("getSlick").resize();
    },

    display_gameinfo: function () {
      this.GameinfoShow = true;
    },
    favorite_game: function () {
      this.unfavorited = !this.unfavorited;
    },
    unfavorite_game(){
      var tempGameObject = [];
      this.unfavorited = !this.unfavorited;
      var game = ":-:" +  $("#unfav").attr("data-name");
      var img = ":-:" + $("#unfav").attr("data-img");
      let request = {
        favoriteGame: "favoriteGame +" + game,
        favoriteArt: "favoriteGame +" + img,
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
      axios.put('http://localhost:5000/api/update/' + this.userId + '/favorite', request).then( res => {
        window.console.log(res.data);        
      })
    }
  }
}