import {
  EventBus
} from "../event-bus";
import $ from 'jquery'
import axios from '../../../node_modules/axios/dist/axios.js'

export default {
  name: 'Logregister',
  components: {},
  props: [],
  data () {
    return {
      closeLogregister: false,
      LoginShow: true,
      RegisterShow: false,
      userEmail: null
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
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
      var userpassword = $('#login-password');
      this.userEmail = $('#login-email');
      var request = {
        password: userpassword,
        email: this.userEmail
      }

      axios.get('http://localhost:5000/api/user/login', request).then(res => {
        $('#user-username').html(res.data.username);
        $('#user-email').html(res.data.email);
        $('#user-picture').attr("src", res.data.picture);
        window.console.log(res);
      })
    },
    register_user: function () {
      axios.post('/api/create/profile').then(res => {
          this.text = res.data.a;
        })
    }
  }
}


