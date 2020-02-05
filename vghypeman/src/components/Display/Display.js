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
      GameinfoShow: false
    }
  },
  computed: {

  },
  mounted() {
    EventBus.$on("close-gameinfo", closeGameinfo => {   
      this.GameinfoShow = closeGameinfo;
  });
  },
  methods: {

    display_pic: function () {
      $( ".slick-next" ).click();
      this.PicShow = true;
      this.TwitchShow = false;
      this.YoutubeShow = false;
    },
    
    display_twitch: function () {
      $( ".slick-next" ).click();
      this.PicShow = false;
      this.TwitchShow = true;
      this.YoutubeShow = false;
    },

    display_youtube: function () {
      $( ".slick-next" ).click();
      this.PicShow = false;
      this.TwitchShow = false;
      this.YoutubeShow = true;
    },

    display_gameinfo: function () {
      this.GameinfoShow = true;
    }

  }
}