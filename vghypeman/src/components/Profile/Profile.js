
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
      favoriteGames: "",
      favoriteArts: "",
      gameObject:[],
      username: null,
      picture: null,
      email: null,
      login: false
    }
  },
  computed: {

  },
  mounted () {
    $(".vsm--toggle-btn").attr("style","display: none");

    EventBus.$on("game-object", gameObject => {
      this.gameObject = gameObject;
    });

    EventBus.$on("favorite-games", favoriteGames => {
      this.favoriteGames = favoriteGames;
    });

    EventBus.$on("favorite-arts", favoriteArts => {
      this.favoriteArts = favoriteArts;
    });
  },
  methods: {
    close() {
      EventBus.$emit("close-profile", this.closeProfile);
    },
    goToGame(game){
      EventBus.$emit("open-game", game);
    }
  }
}


