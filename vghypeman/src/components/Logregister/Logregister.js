import {
  EventBus
} from "../event-bus";

export default {
  name: 'Logregister',
  components: {},
  props: [],
  data () {
    return {
      closeLogregister: false,
      LoginShow: true,
      RegisterShow: false,
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    handleFocus() {
      
      //sum here
      // EventBus.$emit("close-logregister", this.LoginShow);
    },

    handleFocusOut() {
     
      //sum more here
      // EventBus.$emit("close-logregister", this.closeLogregister);
    },

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
      var LoggedIn = true;
        EventBus.$emit("logged-in", LoggedIn);
        EventBus.$emit("close-logregister", this.closeLogregister);
    },
  }
}


