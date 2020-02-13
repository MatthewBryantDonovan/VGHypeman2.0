import $ from 'jquery'
import Slick from "vue-slick"
import {
  EventBus
} from "../event-bus";
import "../../../node_modules/slick-carousel/slick/slick.css";

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
      var XML = new XMLHttpRequest();

      var x_query_game = "https://api.twitch.tv/helix/games?name=" + (game);

      XML.open("GET", x_query_game);
      XML.setRequestHeader('Client-ID', 'ynhtm2667o42ij79qpienqgfg5jbzr');
      XML.send();
      XML.onload = function () {
        var response = JSON.parse(XML.response);
        $(".carousel-inner").css("visibility", "visible");
        $("#youtubeBTN").css("visibility", "visible");
        $("#picsBTN").css("visibility", "visible");
        $("#twitchBTN").css("visibility", "visible");

        if (response.data.length != 0) {
          let x_query_id = "https://api.twitch.tv/helix/streams/?game_id=" + response.data[0].id + "&first=5";
          XML.open("GET", x_query_id);
          XML.setRequestHeader('Client-ID', process.env.VUE_APP_TWITCH_KEY);
          XML.send();
          XML.onload = function () {
            response = JSON.parse(XML.response);

            var itemNo = 0;
            for (var index = 0; index < 5; index++) {

              if (itemNo < 5) {
                if (index < response.data.length) {
                  $(".Slide" + (index + 1) + "iframe").attr("src", "https://embed.twitch.tv?channel='" + response.data[index].user_name + "'&layout=video");
                  itemNo++;
                }
              }
            }
          }
        }
      }
    }
  }
}