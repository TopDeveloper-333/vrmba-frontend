<template>
  <div id="CustomCalendar">
    <vc-calendar is-dark is-range is-expanded :attributes='meetings'/>
  </div>
</template>
<style scoped>
.vc-container.vc-is-dark {
  background: transparent !important;
  color: grey !important;
}
.vc-is-dark .vc-weekday{
    color: darkgrey !important;
}
</style>
<script>

import store from '~/store'
import { mapGetters } from 'vuex'
import VCalendar from 'v-calendar'

export default{
  components:{
    VCalendar
  },
  data() {
    return {
      attrs: [
        {
          key: 'today',
          highlight:{
            color: 'purple',
            fillMode: 'light'
          },
          dates: new Date(),
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      meetings: 'meeting/meetings'
    }),
  },
  watch: {
    meetings: {
      handler: function(nv) {
        console.log("Watch meetings: " + JSON.stringify(nv))
        //
        // Here I am: to update calendar's attrs
        //
      }
    },
  },
  async mounted() { 
    try {
      const data = await store.dispatch('meeting/fetchAll')
    }
    catch(err) {
      alert(err.description)
      console.log(err)
    }
  }
}
</script>

