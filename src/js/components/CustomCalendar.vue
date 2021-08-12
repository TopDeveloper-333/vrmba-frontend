<template>
  <div id="CustomCalendar">
    <vc-calendar is-dark is-range is-expanded ref="calendar" :attributes='attributes'/>
  </div>
</template>
<script>

import VCalendar from 'v-calendar'

export default{
  components:{
    VCalendar
  },
  data() {
    return {
    }
  }

}
</script>

