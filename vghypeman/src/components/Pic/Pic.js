import $ from 'jquery'
import Slick from "vue-slick"

export default {
  name: 'Pic',
  components: {
    Slick
  },
  props: [],
  data () {
    return {
      img1: "https://media.rawg.io/media/games/596/596d6cb7e6c53a5f0e1fce018b58137e.jpg",
      img2: "https://media.rawg.io/media/games/596/596d6cb7e6c53a5f0e1fce018b58137e.jpg",
      img3: "https://media.rawg.io/media/games/596/596d6cb7e6c53a5f0e1fce018b58137e.jpg",
      img4: "https://media.rawg.io/media/games/596/596d6cb7e6c53a5f0e1fce018b58137e.jpg",
      img5: "https://media.rawg.io/media/games/596/596d6cb7e6c53a5f0e1fce018b58137e.jpg"
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


  },
  methods: {

  }
}