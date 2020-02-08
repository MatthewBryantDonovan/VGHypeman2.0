import {
  EventBus
} from "../event-bus";
import $ from 'jquery'
import axios from '../../../node_modules/axios/dist/axios.js'

export default {
  name: 'Logregister',
  components: {},
  props: [],
  data() {
    return {
      closeLogregister: false,
      LoginShow: true,
      RegisterShow: false,
      userEmail: null
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    close() {
      EventBus.$emit("close-logregister", this.closeLogregister);

    },
    display_register: function () {
      this.LoginShow = false;
      this.RegisterShow = true;
    },
    display_login: function () {
      this.LoginShow = true;
      this.RegisterShow = false;
    },
    logged_in: function () {
      var userPassword = $('#login-password').val().trim();
      this.userEmail = $('#login-email').val().trim();
      var request = {
        password: userPassword,
        email: this.userEmail
      }

      axios.post('https://vghypeman.herokuapp.com/api/user/login', request).then(res => {
        if (res.data.error) {
          $('#login-failed').html(res.data.error);
        } else {
          let games = res.data.favoriteGame.split(':-:');
          let arts = res.data.favoriteArt.split(':-:');
          $('#user-username').html(res.data.username);
          $('#user-email').html(res.data.email);
          $('#user-picture').attr("src", res.data.picture);
          var gameObject = [];
          this.favoriteArts = res.data.favoriteArt;
          this.favoriteGames = res.data.favoriteGame;

          if (res.data.favoriteGame.search($("#the-game-name").text()) > 0){
            var alwaysFalse = false;
            EventBus.$emit("unfav-enabled", alwaysFalse);
        }
          for (let index2 = 1; index2 < games.length; index2++) {
            gameObject.push({
              game: games[index2],
              art: arts[index2]
            })

          }
          EventBus.$emit("game-object", gameObject);
          EventBus.$emit("favorite-games", this.favoriteGames);
          EventBus.$emit("favorite-arts", this.favoriteArts);
          var theuserId = res.data.id;
          EventBus.$emit("user-id", theuserId);
          

          var LoggedIn = true;
          EventBus.$emit("logged-in", LoggedIn);
          EventBus.$emit("close-logregister", this.closeLogregister);

        
        }
      })
    },
    register_user: function () {

      var userUsername = $('#register-username').val().trim();
      var userPassword = $('#register-password').val().trim();
      this.userEmail = $('#register-email').val().trim();

      var request = {
        password: userPassword,
        email: this.userEmail,
        username: userUsername,
        favoriteArt: "",
        favoriteGame: ""

      }

      axios.post('https://vghypeman.herokuapp.com/api/create/profile', request).then(res => {
        if (res.data.error) {
          $('#register-failed').html(res.data.error);
        } else {
          var LoggedIn = true;
          EventBus.$emit("logged-in", LoggedIn);
          EventBus.$emit("close-logregister", this.closeLogregister);
          $('#user-username').html(res.data.username);
          $('#user-email').html(res.data.email);

        }
      })
    }
  }
}