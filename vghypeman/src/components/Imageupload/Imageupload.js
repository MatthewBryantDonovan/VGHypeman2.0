import {
    EventBus
  } from "../event-bus";
  import $ from 'jquery'
  import axios from '../../../node_modules/axios/dist/axios.js'
  
  export default {
    name: 'imageupload',
    components: {
    },
    props: [],
    data () {
      return {
        closeImageupload: false,
        userId: 0
      }
    },
    computed: {
  
    },
    mounted () {
      EventBus.$on("user-id", theuserId => {
        this.userId = theuserId;
      });
  
    },
    methods: {
      close() {
          EventBus.$emit("close-imageupload", this.closeImageupload);
      },
      update_image() {

        if($("#update-image").val() == ""){
          return;
        }
        let request = {
          picture: $("#update-image").val().trim(),
        }

        window.console.log($("#update-image").val().trim());
        window.console.log(this.userId);

        axios.put('https://vghypeman.herokuapp.com/api/update/' + this.userId + '/picture', request).then( res => {
          this.close();
          $("#user-picture").attr("src", request.picture);
          return res;       
        })
      }
    } 
  }
  
  
  