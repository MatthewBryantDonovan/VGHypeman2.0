import Youtube from '../Youtube/index.vue';
import Twitch from '../Twitch/index.vue';
import Pic from '../Pic/index.vue';
import Profile from '../Profile/index.vue'
import 'materialize-css/js/modal.js';
import $ from 'jquery'
import modal from 'vue';



export default {
  name: 'display',
  components: {
    Youtube,
    Twitch,
    Pic,
    modal,
    Profile
  },
  props: [],
  data() {
    return {
      PicShow: true,
      TwitchShow: false,
      YoutubeShow: false,
      showModal: false
    }
  },
  computed: {

  },
  mounted() {
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

    showHideModal: function() {
      
    }

  }
}