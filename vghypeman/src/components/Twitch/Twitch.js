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

  },
  methods: {

    // After user searches populate Twitch viewer
    getTwitch: function (game) {
      let x_query_getOauth = "https://id.twitch.tv/oauth2/token?client_id=pq3qrn3hpvnnv2tgjy5a0jp9cq26bh&client_secret=xyvmv56555tbcul9erdg3x3aet2n8t&grant_type=client_credentials";
      axios.post((x_query_getOauth))
      .then(function (response) {

      var twitchToken = response.data.access_token;

      let x_query_game = "https://api.twitch.tv/helix/games?name=" + (game);
      axios.get((x_query_game), {
        headers: {
          'Authorization': 'Bearer ' + twitchToken,
          'Client-ID': "pq3qrn3hpvnnv2tgjy5a0jp9cq26bh"
        }
      })
      .then(function (response) {
        // var response = JSON.parse(XML.response);
        $(".carousel-inner").css("visibility", "visible");
        $("#youtubeBTN").css("visibility", "visible");
        $("#picsBTN").css("visibility", "visible");
        $("#twitchBTN").css("visibility", "visible");

        if (response.data.data.length != 0) {
            let x_query_id = "https://api.twitch.tv/helix/streams/?game_id=" + response.data.data[0].id + "&first=5";
            axios.get((x_query_id), {
              headers: {
                'Authorization': 'Bearer ' + twitchToken,
                'Client-ID': "pq3qrn3hpvnnv2tgjy5a0jp9cq26bh"
              }
            })
            .then(function (response) {

            var itemNo = 0;
            for (var index = 0; index < 5; index++) {

              if (itemNo < 5) {
                if (index < response.data.data.length) {

                  $(".Slide" + (index + 1) + "iframe").attr("src", "https://embed.twitch.tv?channel=" + response.data.data[index].user_name + "&layout=video");
                  itemNo++;
                }
              }
            }
          })
        }
      })
      })
    }
  }
}