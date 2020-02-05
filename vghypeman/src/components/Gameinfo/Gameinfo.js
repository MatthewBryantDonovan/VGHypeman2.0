import {
  EventBus
} from "../event-bus";
import $ from 'jquery'

export default {
  name: 'gameinfo',
  components: {
  },
  props: [],
  data () {
    return {
      show: true,
      closeGameinfo: false
    }
  },
  computed: {

  },
  mounted () {
//add's giant bomb site to descriptions
$('body').mousedown(function( event ) {

  if ($(event.target).attr("data-ref-id") != undefined) {
      if ($(event.target).attr("data-touched") == undefined){
          $(event.target).attr("target", "_blank")
          $(event.target).attr("data-touched", "true")
      var hrefsuffix = $(event.target).attr("href");
      $(event.target).attr("href", "https://www.giantbomb.com" + hrefsuffix);
      }
  }

  //for strong elements nested within a tag
  if ($(event.target.parentElement).attr("data-ref-id") != undefined) {
      if ($(event.target.parentElement).attr("data-touched") == undefined){
          $(event.target.parentElement).attr("target", "_blank")
          $(event.target.parentElement).attr("data-touched", "true")
      var hrefsuffix2 = $(event.target.parentElement).attr("href");
      $(event.target.parentElement).attr("href", "https://www.giantbomb.com" + hrefsuffix2);
      }
  }
  


});
  },
  methods: {
    close() {
      EventBus.$emit("close-gameinfo", this.closeGameinfo);
    },
  }
}


