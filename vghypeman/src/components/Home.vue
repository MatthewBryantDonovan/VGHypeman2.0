

<template>
  <div class="Home">
    <Display />
  </div>
</template>



<script>
import Display from './Display/index.vue';
import axios from '../../node_modules/axios/dist/axios.js'

export default {
  name: "Home",
  components: {
    Display
  },
  data() {
    return {
    }
  },

  methods:{
        triggerClick: function (){
          axios.get('https://stardateapi.herokuapp.com/api/csd').then(res => {
            this.text = res.data.a;
          })     
        }
      }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
