import $ from 'jquery'
import Slick from "vue-slick"
import {
    EventBus
} from "../event-bus";
import "../../../node_modules/slick-carousel/slick/slick.css";
// import axios from '../../../node_modules/axios/dist/axios.js';


export default {
    name: 'Pic',
    components: {
        Slick
    },
    props: [],
    data() {
        return {
            img1: "./assets/mediaScreen.png",
            img2: "./assets/mediaScreen.png",
            img3: "./assets/mediaScreen.png",
            img4: "./assets/mediaScreen.png",
            img5: "./assets/mediaScreen.png",
            favoriteGames: "",
            favoriteArts: "",
            closeLanding: false
        }
    },
    computed: {},
    mounted() {
        $(".pic-slick").slick({
            // dots: true, FIXME: if we want dots or not
            infinite: true,
            speed: 500,
            fade: true,
            cssEase: 'linear'
        });

        EventBus.$on("clicked-event", game => {
            this.getGameWebs(game);
        });
        EventBus.$on("open-game", game => {
            this.getGameWebs(game);
        });
        EventBus.$on("favorite-games", favoriteGames => {
            this.favoriteGames = favoriteGames;
        });
        EventBus.$on("favorite-arts", favoriteArts => {
        this.favoriteArts = favoriteArts;
        });
    },
    methods: {

        getGameWebs: function (game) {
            var favoriteAccess = true;
            EventBus.$emit("favorite-access", favoriteAccess);

            var whichPlatforms = [];
            var itemNo = 0;
            var currentGame = game;
            var queryURL = "https://api.rawg.io/api/games?search=" + currentGame;
            var favoriteGames = this.favoriteGames
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (data0) {
                this.currentgame = data0.results[0].name;
                //   window.console.log(data0);


                //trying to get igdb working
                // axios({
                //         url: "https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/games",
                //         method: 'POST',
                //         headers: {
                //             'Accept': 'application/json',
                //             'user-key': "a3bdc2bd665432559f60ba3f27eccf64"
                //         },
                //         data: "fields *; search '" + currentGame + "'; limit 50;"
                //     })
                //     .then(response => {
                //         window.console.log(response.data);
                //     })
                //     .catch(err => {
                //         window.console.error(err);
                //     });


                //display game name
                $(".game-name").html(data0.results[0].name);
                if (favoriteGames != ""){
                    if (favoriteGames.search(data0.results[0].name) > 0){
                        EventBus.$emit("unfav-enabled", this.closeLanding);
                    }
                }
                $("#fav").attr("data-name", data0.results[0].name);
                $("#unfav").attr("data-name", data0.results[0].name);
                var iShow = true;
                EventBus.$emit("i-show", iShow);
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

                    if(ssindex == 0) {
                        $("#fav").attr("data-img", data0.results[0].short_screenshots[ssindex].image);
                        $("#unfav").attr("data-img", data0.results[0].short_screenshots[ssindex].image);
                    }

                    if (itemNo < 5) {
                        if (ssindex < data0.results[0].short_screenshots.length) {
                            $(".Slide" + (ssindex + 1) + "img").attr("src", data0.results[0].short_screenshots[ssindex].image);
                            itemNo++;


                        } else {
                            $(".Slide" + (ssindex + 1) + "img").attr({
                                src: "./assets/MediaInAnotherCastle.png",
                                overflow: "hidden"
                            });

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
                    url: 'https://www.giantbomb.com/api/search/?format=jsonp&api_key=' + process.env.VUE_APP_GIANT_BOMB_KEY + '&query=' + data0.results[0].name,
                }).done(function (gbdata) {
                    //window.console.log(gbdata);
                    //window.console.log(gbdata.results[0].name);
                    var currentGame = gbdata.results[0].name;
                    $("#game-plot").html(gbdata.results[0].description);
                    EventBus.$emit("response-event", currentGame);
                }).fail(function () {
                    //window.console.log("error");

                })

            });
        }

    }
}