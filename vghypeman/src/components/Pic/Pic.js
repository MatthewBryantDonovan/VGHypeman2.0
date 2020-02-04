import $ from 'jquery'
import Slick from "vue-slick"
import { EventBus } from "../event-bus";
import "../../../node_modules/slick-carousel/slick/slick.css";

export default {
  name: 'Pic',
  components: {
    Slick
  },
  props: [],
  data () {
    return {
      img1: "./assets/BenImage.png",
      img2: "./assets/mattImage.png",
      img3: "./assets/zachImage.png",
      img4: "./assets/calebImage.png",
      img5: "./assets/YouTubeIconHover.png",
      APIgame: ""
    }
  },
  computed: {
  },
  mounted () {
    $(".single-item").slick({
      // dots: true, FIXME: if we want dots or not
      infinite: true,
      speed: 500,
      fade: true,
      cssEase: 'linear'
  });

  EventBus.$on("clicked-event", game=> {  
    this.APIgame = game;
    this.getGameWebs(this.APIgame);
  });

  },
  methods: {

    getGameWebs: function(game){
      $("#carouselExampleFade").show();
      var whichPlatforms = [];
      var itemNo = 0;
      var currentGame = game;
      for (let index = 0; index < 5; index++) {
        $(".car" + index).hide();
    }
    var queryURL = "https://api.rawg.io/api/games?search=" + currentGame;
    $.ajax({
      url: queryURL,
      method: "GET"
  }).then(function (data0) {
      this.currentgame = data0.results[0].name;
      window.console.log(data0);
      window.console.log(data0.results[0].name);

      // //FIXME: start youtube
      // // youtube ajax call
      // $.ajax({
      //     type: "get",
      //     url: "https://www.googleapis.com/youtube/v3/search?part=snippet&q=review " + data0.results[0].name + "&type=videos&key=AIzaSyDhIq2RbDOejDvlF0ihBgO92LTwp6I1U28",
      //     success: function (data1) {
      //         window.console.log(data1);
      //         /* window.console.log(data1.items[index].id.videoId); */

      //         itemNo = 0;
      //         for (var index = 0; index < data1.items.length; index++) {

      //             if (itemNo < 5) {
      //                 $(".Slide" + (index + 1) + "youtube").attr("src", "https://www.youtube.com/embed/" + data1.items[index].id.videoId);
      //                 itemNo++;
      //             }
      //         }
      //     }
      // });
      // //FIXME: end youtube



      //display game name
      $(".game-name").html(data0.results[0].name);
      $("#game-modal").css("visibility", "visible");

      // display platforms
      if (data0.results[0].platforms.length != 0) {
          var platforms = "";
          for (var platindex = 0; platindex < data0.results[0].platforms.length; platindex++) {
              whichPlatforms.push(data0.results[0].platforms[platindex].platform.name);
              platforms += data0.results[0].platforms[platindex].platform.name;
              if (platindex < (data0.results[0].platforms.length - 1)) {
                  platforms += ", ";
              }
          }

          $("#game-platforms").html(platforms);
      }

      // display genres
      if (data0.results[0].genres.length != 0) {
          var genres = "";
          for (var genindex = 0; genindex < data0.results[0].genres.length; genindex++) {
              genres += data0.results[0].genres[genindex].name;
              if (genindex < (data0.results[0].genres.length - 1)) {
                  genres += ", ";
              }
          }

          $("#game-genres").html(genres);
      }

      //display screenshots
      for (var ssindex = 0; ssindex < 5; ssindex++) {

          if (itemNo < 5) {
              if (ssindex < data0.results[0].short_screenshots.length) {
                  // if (itemNo == 0) {
                  //     // $("#slick-slide00").attr("class", "slick-active slick-current");
                  //     $("#slick-slide00").attr("style", "width: 100%;");
                  //     $("#slick-slide00").attr("aria-describedby", "slick-slide-control00");

                  // } 
                  // else {
                  //     $(".car" + (ssindex + 1)).attr("class", "carousel-item car" + (ssindex + 1));
                  // }

                  $(".car" + (ssindex + 1)).show();
                  $(".Slide" + (ssindex + 1) + "iframe").hide();
                  $(".Slide" + (ssindex + 1) + "youtube").hide();

                  $(".Slide" + (ssindex + 1) + "img").attr("src", data0.results[0].short_screenshots[ssindex].image);

                  itemNo++;


              } else {
                  $(".car" + (ssindex + 1)).show();
                  $(".Slide" + (ssindex + 1) + "iframe").hide();
                  $(".Slide" + (ssindex + 1) + "youtube").hide();

                  $(".Slide" + (ssindex + 1) + "img").attr({
                      src: "./assets/images/mediaScreen.JPG",
                      overflow: "hidden"
                  }); //FIXME: need to put princess in another castle here

                  itemNo++;
              }
          }
      }

      //TODO: use this info later for rawg API stuff
      this.currentGameID = data0.results[0].id;

      //Giantbomb call for name to give to twitch
      $.ajax({
          type: 'GET',
          dataType: 'jsonp',
          crossDomain: true,
          jsonp: 'json_callback',
          url: 'https://www.giantbomb.com/api/search/?format=jsonp&api_key=6ce9922ee0247c661db0e2af89818c4e9441b306&query=' + data0.results[0].name,
      }).done(function (gbdata) {
          window.console.log(gbdata);
          window.console.log(gbdata.results[0].name);
          // FIXME: start of twitch xml call

          var XML = new XMLHttpRequest();

          var x_query_game = "https://api.twitch.tv/helix/games?name=" + (gbdata.results[0].name);
          window.console.log(x_query_game);

          $("#game-plot").html(gbdata.results[0].description);

          XML.open("GET", x_query_game);
          XML.setRequestHeader('Client-ID', 'ynhtm2667o42ij79qpienqgfg5jbzr');
          XML.send();
          XML.onload = function () {
              var response = JSON.parse(XML.response);
              window.console.log(response);
              $(".carousel-inner").css("visibility", "visible");
              $("#youtubeBTN").css("visibility", "visible");
              $("#picsBTN").css("visibility", "visible");
              $("#twitchBTN").css("visibility", "visible");

              if (response.data.length != 0) {
                  let x_query_id = "https://api.twitch.tv/helix/streams/?game_id=" + response.data[0].id + "&first=5";
                  XML.open("GET", x_query_id);
                  XML.setRequestHeader('Client-ID', 'ynhtm2667o42ij79qpienqgfg5jbzr');
                  XML.send();
                  XML.onload = function () {
                      response = JSON.parse(XML.response);
                      window.console.log(response);

                      itemNo = 0;
                      for (var index = 0; index < 5; index++) {

                          if (itemNo < 5) {
                              if (index < response.data.length) {
                                  $(".Slide" + (index + 1) + "iframe").attr("src", "https://embed.twitch.tv?channel='" + response.data[index].user_name + "'&layout=video");
                                  window.console.log(response.data[index].user_name);
                                  // new Twitch.Embed("twitch-embed" + (index+1), {
                                  //     width: 854,
                                  //     height: 480,
                                  //     layout: "video",
                                  //     channel: "'" + response.data[index].user_name + "'",                                                         
                                  //   });

                                  itemNo++;
                              } /* else {
                                  $(".Slide" + (index + 1) + "iframe").attr({
                                      src: "./assets/images/mediaScreen.JPG",
                                      scrolling: "no"
                                  });
                                  itemNo++;
                              } */
                          }
                      }

                  }
              } /* else {
                  for (var index = 0; index < 5; index++) {
                      $(".Slide" + (index + 1) + "iframe").attr({
                          src: "./assets/images/mediaScreen.JPG",
                          scrolling: "no"
                      });
                  }

              } */
          }

          //FIXME: start chicken-coop
          // // get and disp metacritic score
          // var settings = {
          //     "async": true,
          //     "crossDomain": true,
          //     "url": "https://chicken-coop.p.rapidapi.com/games/" + currentGame + "?platform="+whichPlatforms[0], //FIXME: can be any part of the string
          //     "method": "GET",
          //     "headers": {
          //         "x-rapidapi-host": "chicken-coop.p.rapidapi.com",
          //         "x-rapidapi-key": "fd02da23cemshd88b3aca85d6883p167846jsnc7607179e7e1"
          //     }
          // }
          // $.ajax(settings).done(function (res) {
          //     window.console.log(res.result);
          //     $("#game-score").text("Metacritic Score: " + res.result.score);
          // });
          //FIXME: end chicken-coop

          //FIXME: trying stuff start
          // $.ajax({
          //     type: 'GET',
          //     dataType: 'jsonp',
          //     jsonp: 'json_callback',
          //     crossDomain: true,
          //     // +gbdata.results[0].guid+
          //     url: 'https://www.giantbomb.com/api/reviews/?format=jsonp&api_key=6ce9922ee0247c661db0e2af89818c4e9441b306&game=796&limit=3',
          // }).done(function (gbrev) {
          //     window.console.log(gbrev);
          // }).fail(function () {
          //     window.console.log("error");

          // })
          //FIXME: trying stuff end

      }).fail(function () {
          window.console.log("error");

      })

  });
    }

  }
}