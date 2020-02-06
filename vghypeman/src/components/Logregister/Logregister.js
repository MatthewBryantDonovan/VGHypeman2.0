import {
  EventBus
} from "../event-bus";

export default {
  name: 'Logregister',
  components: {},
  props: [],
  data () {
    return {
      closeLogregister: false
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    close() {
      EventBus.$emit("close-logregister", this.closeLogregister);
    }
  }
}


