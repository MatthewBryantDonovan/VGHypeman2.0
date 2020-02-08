
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
      login: false,
      closeLanding: false,
      alwaysTrue: true
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
      axios.put('http://vghypeman.herokuapp.com/api/update/' + this.userId + '/favorite', request).then( res => {
        window.console.log(res.data);        
      })
    }
  }
}