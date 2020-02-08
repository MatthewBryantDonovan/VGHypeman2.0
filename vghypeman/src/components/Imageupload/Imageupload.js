import {
    EventBus
  } from "../event-bus";
//   import $ from 'jquery'
  
  export default {
    name: 'imageupload',
    components: {
    },
    props: [],
    data () {
      return {
        closeImageupload: false
      }
    },
    computed: {
  
    },
    mounted () {
  
    },
    methods: {
      close() {
          EventBus.$emit("close-imageupload", this.closeImageupload);
      }
    } 
  }
  
  
  