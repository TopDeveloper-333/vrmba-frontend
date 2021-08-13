<template>
  <div id="CustomCalendar">
    <vc-calendar is-dark is-range is-expanded :attributes='attrs'/>
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
      handler: function(mine) {
        debugger
        console.log(this.attrs)
        this.attrs = []

        console.log("Watch meetings: " + JSON.stringify(mine))
        var invited = JSON.parse(JSON.stringify(mine.invited))
        for (const w in invited) {
          var attr = {}
          attr.key = invited[w].topic
          attr.highlight = {}
          attr.highlight.color = 'purple'
          attr.highlight.fillMode = 'light'
          attr.dates = new Date(w)

          this.attrs.push(attr)
        }

        var created = JSON.parse(JSON.stringify(mine.meetings))
        for (const ww in created) {
          var attr = {}
          attr.key = created[ww].topic
          attr.highlight = {}
          attr.highlight.color = 'red'
          attr.highlight.fillMode = 'light'
          attr.dates = new Date(ww)

          this.attrs.push(attr)
        }
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

