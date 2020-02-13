import {
  EventBus
} from "../event-bus";


export default {
  name: 'meet',
  components: {},
  props: [],
  data() {
    return {
      closeMeet: false
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {

    // Close the meet the team modal
    close() {
      EventBus.$emit("close-meet", this.closeMeet);
    }

  }
}