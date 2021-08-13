<template>
  <div id="CustomCalendar">
    <vc-calendar is-dark is-range is-expanded :attributes='attrs'/>
    <ul class="timeline">
        <li class="timeline-inverted">
          <div class="timeline-badge">Today 13</div>
          <div class="timeline-panel">
            <div class="timeline-heading">
              <h4 class="timeline-title">Test Topic</h4>
              <p><small class="text-muted"><i class="glyphicon glyphicon-time"></i> 10:00 AM - 11:30 AM</small></p>
            </div>
            <div class="timeline-body">
              <p>this is optional description</p>
            </div>
          </div>
        </li>
        <li class="timeline-inverted">
          <div class="timeline-badge">OCT 21</div>
          <div class="timeline-panel">
            <div class="timeline-heading">
              <h4 class="timeline-title">Mussum ipsum cacilds</h4>
            </div>
            <div class="timeline-body">
              <p>Mussum ipsum cacilds,</p>
              <p>Suco de cevadiss, é um leite divinis.</p>
            </div>
          </div>
        </li>
    </ul>
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
          attr.highlight.color = 'green'
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

