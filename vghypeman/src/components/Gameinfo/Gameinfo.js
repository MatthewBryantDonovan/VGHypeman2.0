import Display from '../Display/index.vue';

export default {
  name: 'gameinfo',
  components: {
    Display
  },
  props: [],
  data () {
    return {

    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    close() {
      this.$emit('close');
    },
  }
}


