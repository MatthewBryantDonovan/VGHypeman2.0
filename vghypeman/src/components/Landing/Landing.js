import Meet from '../Meet/index.vue';

import {
  EventBus
} from "../event-bus";



export default {
  name: 'twitch',
  components: {
    Meet
  },
  props: [],
  data() {
    return {
      MeetShow: false,
      meetShow: true
    }
  },
  computed: {

  },
  mounted() {

    EventBus.$on("close-meet", closeMeet => {   
      this.MeetShow = closeMeet;
  });
    EventBus.$on("meetShow", meetShow => {   
      this.meetShow = meetShow;
  });
    
    consoleText(['HYPEMAN', 'SEARCH GAMES', 'SCREENSHOTS', 'TWITCH STREAMS', 'YOUTUBE REVIEWS', 'GET HYPED'], 'text',['#45A29E','#ffff66', '#00e664','#6441a5','#c4302b','#66FCF1']);
    // consoleText(['HYPEMAN', 'STEP 1: SEARCH GAMES', 'STEP 2: WATCH GAMES', 'STEP 3: ???????', 'STEP 4: PROFIT!'], 'text',['#45A29E','#ffff66', '#00e664','#6441a5','#c4302b','#66FCF1']);

    function consoleText(words, id, colors) {
      if (colors === undefined) colors = ['#fff'];
      var visible = true;
      // var con = document.getElementById('console');
      var letterCount = 1;
      var x = 1;
      var waiting = false;
      var target = document.getElementById(id)
      target.setAttribute('style', 'color:' + colors[0])
      window.setInterval(function() {
    
        if (letterCount === 0 && waiting === false) {
          waiting = true;
          target.innerHTML = words[0].substring(0, letterCount)
          window.setTimeout(function() {
            var usedColor = colors.shift();
            colors.push(usedColor);
            var usedWord = words.shift();
            words.push(usedWord);
            x = 1;
            target.setAttribute('style', 'color:' + colors[0])
            letterCount += x;
            waiting = false;
          }, 1000)
        } else if (letterCount === words[0].length + 1 && waiting === false) {
          waiting = true;
          window.setTimeout(function() {
            x = -1;
            letterCount += x;
            waiting = false;
          }, 1000)
        } else if (waiting === false) {
          target.innerHTML = words[0].substring(0, letterCount)
          letterCount += x;
        }
      }, 120)
      window.setInterval(function() {
        if (visible === true) {
          // con.className = 'console-underscore hidden'
          visible = false;
    
        } else {
          // con.className = 'console-underscore'
    
          visible = true;
        }
      }, 400)
    }
   
  },
  methods: {
    display_meet: function () {
      this.MeetShow = true;
    }
  }
}


