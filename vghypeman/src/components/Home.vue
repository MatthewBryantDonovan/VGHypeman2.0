<template>
  <div class="home">
    <button type="button" @click="triggerClick()">set</button>
    <h1>{{text}}</h1>
  </div>
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js"></script>

<script>
export default {
  name: "Home",
  data() {
    return {
      text: "Nice!",
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
