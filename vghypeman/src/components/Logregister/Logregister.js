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
      userEmail: null,
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

      axios.post('http://localhost:5000/api/user/login', request).then(res => {
        if (res.data.error) {
          $('#login-failed').html(res.data.error);
        } else {
          let games = res.data.favoriteGame.split(':-:');
          let arts = res.data.favoriteArt.split(':-:');
          $('#user-username').html(res.data.username);
          $('#user-email').html(res.data.email);
          $('#user-picture').attr("src", res.data.picture);

          for (let index = 1; index < games.length; index++) {
            var span = $("<span>");
            var img = $("<img>");
            var btn = $("<img>").attr("onclick", "unfavorite()");
            var gameObject = [];
            btn.attr({
              src: "./assets/twitch.png",
              style: "width: 20px; height: 20px;"
            })
            span.attr({
              slot: "header",
              data: games[index]
            });
            img.attr({
              src: arts[index],
              style: "width: 20px; height: 20px;",
              class: "gameThumb",
              data: arts[index]
            });
            span.append(img);
            span.append(games[index]);
            span.append(btn);

            $("#user-sidebar").append(span);

            this.favoriteArts = res.data.favoriteArt;
            this.favoriteGames = res.data.favoriteGame;
            for (let index2 = 1; index2 < games.length; index2++) {
              gameObject.push({
                game: games[index2],
                art: arts[index2]
              })

            }
            EventBus.$emit("game-object", gameObject);
            EventBus.$emit("favorite-games", this.favoriteGames);
            EventBus.$emit("favorite-arts", this.favoriteArts);
            var userId = res.data.id;
            EventBus.$emit("user-id", userId);
            

            var LoggedIn = true;
            EventBus.$emit("logged-in", LoggedIn);
            EventBus.$emit("close-logregister", this.closeLogregister);

          }
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
        username: userUsername
      }

      axios.post('http://localhost:5000/api/create/profile', request).then(res => {
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