import $ from 'jquery'
import Slick from "vue-slick"
import {
  EventBus
} from "../event-bus";
import "../../../node_modules/slick-carousel/slick/slick.css";

export default {
  name: 'Youtube',
  components: {
    Slick
  },
  props: {},
  data() {
    return {
    }
  },
  computed: {

  },
  mounted() {
    $(".youtube-slick").slick({
      // dots: true, FIXME: if we want dots or not
      infinite: true,
      speed: 500,
      fade: true,
      cssEase: 'linear'
    });

    EventBus.$on("response-event", currentGame => {
      this.getYoutube(currentGame);

    });
  },
  methods: {

    getYoutube: function (game) {
      // youtube ajax call
      $.ajax({
        type: "get",
        url: "https://www.googleapis.com/youtube/v3/search?part=snippet&q=review " + game + "&type=videos&key=AIzaSyDhIq2RbDOejDvlF0ihBgO92LTwp6I1U28",
        success: function (data1) {
          // window.console.log(data1);
          /* window.console.log(data1.items[index].id.videoId); */

          var itemNo = 0;
          for (var index = 0; index < data1.items.length; index++) {

            if (itemNo < 5) {
              $(".Slide" + (index + 1) + "youtube").attr("src", "https://www.youtube.com/embed/" + data1.items[index].id.videoId);
              itemNo++;
            }
          }
        },
        fail: function () {}
      });
    }
  }
}