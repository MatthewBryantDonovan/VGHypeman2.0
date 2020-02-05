import Youtube from '../Youtube/index.vue';
import Twitch from '../Twitch/index.vue';
import Pic from '../Pic/index.vue';
import $ from 'jquery'

export default {
  name: 'display',
  components: {
    Youtube,
    Twitch,
    Pic
  },
  props: [],
  data() {
    return {
      PicShow: true,
      TwitchShow: false,
      YoutubeShow: false,
      open: false,
      modalStyle: {
        'z-index': 10000000,
        'display': 'block', 
        'opacity': 1,
        'transform': 'scaleX(1); top: 10%'
      }
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

    showHideModal() {
      this.open = !this.open;
    }

  }
}