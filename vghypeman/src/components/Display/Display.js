import Youtube from '../Youtube/index.vue';
import Twitch from '../Twitch/index.vue';
import Pic from '../Pic/index.vue';

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
      YoutubeShow: false
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {

    display_pic: function () {
      this.PicShow = true;
      this.TwitchShow = false;
      this.YoutubeShow = false;
    },
    
    display_twitch: function () {
      this.PicShow = false;
      this.TwitchShow = true;
      this.YoutubeShow = false;
    },

    display_youtube: function () {
      this.PicShow = false;
      this.TwitchShow = false;
      this.YoutubeShow = true;
    }
  }
}