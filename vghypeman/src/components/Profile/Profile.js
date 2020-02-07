
import Vue from 'vue'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import {
  EventBus
} from "../event-bus";
Vue.use(VueSidebarMenu)
import $ from 'jquery'

export default {
  name: 'Profile',
  components: {},
  props: [],
  data () {
    return {
      menu: [],
      closeProfile: false,
      myGames: [],
      myGamesArt: [],
      username: null,
      picture: null,
      email: null,
      login: false,
      favoriteArts: [
        {
          src:
        "https://s3.gaming-cdn.com/images/products/5852/orig/shadow-of-the-tomb-raider-definitive-edition-cover.jpg",
        name: "name"
    },
    {
      src:
        "https://s3.gaming-cdn.com/images/products/5852/orig/shadow-of-the-tomb-raider-definitive-edition-cover.jpg",
        name: "name"
    }

      ]
    }
  },
  computed: {

  },
  mounted () {
    $(".vsm--toggle-btn").attr("style","display: none")

  },
  methods: {
    close() {
      EventBus.$emit("close-profile", this.closeProfile);
    },
    unFav(noLike, noLikeArt){
      this.myGames.filter(noLike);
      this.myGamesArt.filter(noLikeArt);
      //stringify the list
      //send via axios
    }
  }
}


