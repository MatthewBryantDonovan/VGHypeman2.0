
import Vue from 'vue'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import {
  EventBus
} from "../event-bus";
Vue.use(VueSidebarMenu)
import $ from 'jquery'
import axios from 'axios/dist/axios';

export default {
  name: 'Profile',
  components: {},
  props: [],
  data () {
    return {
      menu: [],
      closeProfile: false,
      userId: "",
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
    
    EventBus.$on("user-id", userId => {
      this.userId = userId;
      window.console.log(this.userId)
    });


  },
  methods: {
    close() {
      EventBus.$emit("close-profile", this.closeProfile);
    },
    goToGame(game){
      EventBus.$emit("open-game", game);
    },
    unfavoriteGame(game, art){
      window.console.log(game, art)
      this.favoriteGames.replace(":-:" + game, "");
      this.favoriteArts.replace(":-:" + art, "");
      window.console.log(this.favoriteGames, this.favoriteArts);
      let request = {
        favoriteGame: this.favoriteGames,
        favoriteArt: this.favoriteArts
      }
      axios.put('http://localhost:5000/api/update/' + this.userId + '/favorite', request).then( res => {
        window.console.log(res.data)
        this.favoriteGames = res.data.favoriteGame;
        this.favoriteArts = res.data.favoriteArt;
        window.console.log(this.favoriteGames, this.favoriteArts);
      })
    }
  }
}


