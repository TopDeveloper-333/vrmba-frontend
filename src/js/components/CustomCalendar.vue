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
}
</script>

