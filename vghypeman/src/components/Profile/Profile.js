
import Vue from 'vue'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import Imageupload from '../Imageupload/index.vue';
import {
  EventBus
} from "../event-bus";
Vue.use(VueSidebarMenu)
import $ from 'jquery'
import axios from 'axios/dist/axios';

export default {
  name: 'Profile',
  components: {
    Imageupload
  },
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
      login: false,
      closeLanding: false,
      alwaysTrue: true,
      ImageuploadShow: false
    }
  },
  computed: {

  },
  mounted () {
    $(".vsm--toggle-btn").attr("style","display: none");

    EventBus.$on("game-object", gameObject => {
      this.gameObject = gameObject;
    });
  
    EventBus.$on("temp-object", tempGameObject => {
      this.gameObject = tempGameObject;
    });

    EventBus.$on("favorite-games", favoriteGames => {
      this.favoriteGames = favoriteGames;
    });

    EventBus.$on("favorite-arts", favoriteArts => {
      this.favoriteArts = favoriteArts;
    });
    
    EventBus.$on("user-id", theuserId => {
      this.userId = theuserId;
    });

    EventBus.$on("close-gameinfo", closeImageupload => {   
      this.ImageuploadShow = closeImageupload;
  });

  },
  methods: {
    close() {
      EventBus.$emit("close-profile", this.closeProfile);
    },
    goToGame(game){
      EventBus.$emit("open-game", game);
      EventBus.$emit("close-landing", this.closeLanding);
      EventBus.$emit("unfav-enabled", this.closeLanding);

    },
    unfavoriteGame(game, art){
      var tempGameObject = [];
      
      this.favoriteGames = this.favoriteGames.replace(":-:" + game, "");
      this.favoriteArts = this.favoriteArts.replace(":-:" + art, "");
      let request = {
        favoriteGame: this.favoriteGames,
        favoriteArt: this.favoriteArts
      }

      let games = this.favoriteGames.split(':-:');
      let arts = this.favoriteArts.split(':-:');

      for (let index = 1; index < games.length; index++) {
        tempGameObject.push({
          game: games[index],
          art: arts[index]
        })
      }

      this.gameObject = tempGameObject;
      if ($("#the-game-name").text() == game){
        EventBus.$emit("fav-enabled", this.alwaysTrue);
    }
      EventBus.$emit("favorite-games", this.favoriteGames);
      EventBus.$emit("favorite-arts", this.favoriteArts);
      axios.put('https://vghypeman.herokuapp.com/api/update/' + this.userId + '/favorite', request).then( res => {
        return res;       
      })
    },
    display_imageupload: function () {
      this.ImageuploadShow = true;
    }
  }
}