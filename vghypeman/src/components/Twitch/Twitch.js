import $ from 'jquery'
import Slick from "vue-slick"
import {
  EventBus
} from "../event-bus";
import "../../../node_modules/slick-carousel/slick/slick.css";
import axios from '../../../node_modules/axios/dist/axios.js'

export default {
  name: 'twitch',
  components: {
    Slick
  },
  props: [],
  data() {
    return {
      twitchToken: ""
    }
  },
  computed: {

  },
  mounted() {

    // Twitch slick initialization
    $(".twitch-slick").slick({
      // dots: true, FIXME: if we want dots or not
      infinite: true,
      speed: 500,
      fade: true,
      cssEase: 'linear'
    });

    // Event Bus's to update information in real time
    EventBus.$on("response-event", currentGame => {
      this.getTwitch(currentGame);

    });

    // Event Bus to update information in real time
    EventBus.$on("twitch-token", thetwitchToken => {
      this.twitchToken = thetwitchToken;
      $(".twitch-name").html(this.twitchToken);
    });
  },
  methods: {

    // After user searches populate Twitch viewer
    getTwitch: function (game) {
      // var XML = new XMLHttpRequest();

      // var x_query_game = "https://api.twitch.tv/helix/games?name=" + (game);

      // XML.open("GET", x_query_game);
      // XML.setRequestHeader({'Client-ID': "pq3qrn3hpvnnv2tgjy5a0jp9cq26bh", 'Authorization': 'Bearer ' + this.twitchToken});
      // XML.send();
      // XML.onload = function () {
      let x_query_game = "https://api.twitch.tv/helix/games?name=" + (game);
      axios.get((x_query_game), {
        headers: {
          'Authorization': 'Bearer ' + this.twitchToken,
          'Client-ID': "pq3qrn3hpvnnv2tgjy5a0jp9cq26bh"
        }
      })
      .then(function (response) {
        // var response = JSON.parse(XML.response);
        $(".carousel-inner").css("visibility", "visible");
        $("#youtubeBTN").css("visibility", "visible");
        $("#picsBTN").css("visibility", "visible");
        $("#twitchBTN").css("visibility", "visible");
        $(".twitch-data1").html(response.data);

        if (response.data.data.length != 0) {
          // let x_query_id = "https://api.twitch.tv/helix/streams/?game_id=" + response.data[0].id + "&first=5";
          // XML.open("GET", x_query_id);
          // XML.setRequestHeader({'Client-ID': "pq3qrn3hpvnnv2tgjy5a0jp9cq26bh", 'Authorization': 'Bearer ' + this.twitchToken});
          // XML.send();
          // XML.onload = function () {
            let x_query_id = "https://api.twitch.tv/helix/games?game_id=" + response.data.data[0].id + "&first=5";
            axios.get((x_query_id), {
              headers: {
                'Authorization': 'Bearer ' + this.twitchToken,
                'Client-ID': "pq3qrn3hpvnnv2tgjy5a0jp9cq26bh"
              }
            })
            .then(function (response) {
              $(".twitch-data2").html(response.data);
            // response = JSON.parse(XML.response);

            var itemNo = 0;
            for (var index = 0; index < 5; index++) {

              if (itemNo < 5) {
                if (index < response.data.data.length) {
                  $(".Slide" + (index + 1) + "iframe").attr("src", "https://embed.twitch.tv?channel='" + response.data.data[index].user_name + "'&layout=video");
                  itemNo++;
                }
              }
            }
          })
        }
      })
    }
  }
}