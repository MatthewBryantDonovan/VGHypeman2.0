
import Vue from 'vue'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import {
  EventBus
} from "../event-bus";
Vue.use(VueSidebarMenu)
import $ from 'jquery'

export default {
  name: 'Profile',
  components: {},
  props: [],
  data () {
    return {
      menu: [],
      closeProfile: false
    }
  },
  computed: {

  },
  mounted () {
    $(".vsm--toggle-btn").attr("style","display: none")

  },
  methods: {
    close() {
      EventBus.$emit("close-profile", this.closeProfile);
      window.console.log('blur?')
    }
  }
}


