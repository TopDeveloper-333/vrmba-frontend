<template>
  <div id="CustomCalendar">
    <vc-calendar is-dark is-range is-expanded :attributes='attrs'/>
    <ul class="timeline">
      <li class="timeline-inverted" v-for="timeline in timelines" v-bind:key="timeline.when">
        <div class="timeline-badge">{{timeline.dates}}</div>
        <div class="timeline-panel" v-bind:style="{background: timeline.background, border:0}" v-on:click="onSelected(timeline)">
          <div class="timeline-heading">
            <h4 class="timeline-title" v-bind:style="{color:timeline.titlecolor}"><b>{{timeline.title}}</b></h4>
            <p><small v-bind:style="{color:timeline.color}"><i class="glyphicon glyphicon-time"></i>{{timeline.duration}}</small></p>
          </div>
          <div class="timeline-body">
            <p v-bind:style="{color:timeline.color}">{{timeline.description}}</p>
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
  border: 0px;
}
.vc-is-dark .vc-weekday{
    color: darkgrey !important;
}
</style>
<script>

import store from '~/store'
import { mapGetters } from 'vuex'
import VCalendar from 'v-calendar'
import ProtocolCheck from '../misc/protocolcheck'
import config from "../../config"

export default{
  components:{
    VCalendar
  },
  data() {
    return {
      attrs: [
      ],
      timelines: [
      ],
    };
  },
  computed: {
    ...mapGetters({
      meetings: 'meeting/meetings'
    }),
  },
  methods: {
    onSelected: function(timeline) {
      ProtocolCheck("vrmba://" + timeline.meetingLink,
        function () {
            var retVal = confirm("You didn't install VRMBA Test App. Are you going to download and install it?");
            if( retVal == true ) {
                console.log('Download Path: ', config.ue4clientPath)
                window.location.href = config.ue4clientPath;
            } 
        }
      );
    }
  },
  watch: {
    meetings: {
      handler: function(mine) {
        this.attrs = []
        this.timelines = []
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

        var invited = JSON.parse(JSON.stringify(mine.invited))
        for (const w in invited) {
          var attr = {}
          attr.key = invited[w].topic
          attr.highlight = {}          
          // attr.highlight.color = 'purple'
          attr.highlight.fillMode = 'light'
          attr.highlight.style = {}
          attr.highlight.style.background = '#2af597'
          attr.dates = new Date(w)
          this.attrs.push(attr)

          var dd = new Date(w)
          var today = new Date()

          if (dd >= today) 
          {
            var timeline = {}
            if ((dd.getMonth() == today.getMonth()) && (dd.getDate() == today.getDate()))
              timeline.dates = "Today " + today.getDate()
            else
              timeline.dates = monthNames[dd.getMonth()] + ' ' + dd.getDate()

            timeline.when = invited[w].when
            timeline.title = invited[w].topic
            timeline.meetingLink = invited[w].meetingLink
            timeline.duration = "Start Time: " + dd.getHours() + ":" + dd.getMinutes() + ", Duration: " + invited[w].duration
            timeline.description = invited[w].description
            timeline.background = '#2af597'
            timeline.titlecolor = 'black'
            timeline.subtitlecolor = 'black'
            timeline.color = 'black'
            this.timelines.push(timeline)
          }

        }

        var created = JSON.parse(JSON.stringify(mine.meetings))
        for (const ww in created) {
          var attr = {}
          attr.key = created[ww].topic
          attr.highlight = {}
          // attr.highlight.color = 'green'
          attr.highlight.fillMode = 'light'
          attr.highlight.style = {}
          attr.highlight.style.background = '#f92c84'
          attr.dates = new Date(ww)
          this.attrs.push(attr)

          var dd = new Date(ww)
          var today = new Date()

          if (dd >= today) 
          {
            var timeline = {}
            if ((dd.getMonth() == today.getMonth()) && (dd.getDate() == today.getDate()))
              timeline.dates = "Today " + today.getDate()
            else
              timeline.dates = monthNames[dd.getMonth()] + ' ' + dd.getDate()

            timeline.when = created[ww].when
            timeline.title = created[ww].topic
            timeline.meetingLink = created[ww].meetingLink
            timeline.duration = "Start Time: " + dd.getHours() + ":" + dd.getMinutes() + ", Duration: " + created[ww].duration
            timeline.description = created[ww].description
            timeline.background = '#f92c84'
            timeline.titlecolor = 'white'
            timeline.subtitlecolor = 'white'
            timeline.color = 'white'
            this.timelines.push(timeline)
          }
        }

        //
        // Sort timeline
        //
        this.timelines.sort(function(a,b) {
          var aa = new Date(a.when)
          var bb = new Date(b.when)
          return aa - bb
        })
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

