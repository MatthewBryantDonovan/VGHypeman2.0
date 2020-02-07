import Youtube from '../Youtube/index.vue';
import Twitch from '../Twitch/index.vue';
import Pic from '../Pic/index.vue';
import Gameinfo from '../Gameinfo/index.vue';
import $ from 'jquery'
import {
  EventBus
} from "../event-bus";



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
      favoriteAccess: false
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

  }
}