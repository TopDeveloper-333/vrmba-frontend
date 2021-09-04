<template>
  <div id="app">
    <loading ref="loading" />

    <transition name="page" mode="out-in">
      <component :is="layout" v-if="layout" />
    </transition>
  </div>
</template>

<script>
import Loading from './Loading'
import config from '../../config';
import firebase from 'firebase'
import 'firebase/messaging'


// Load layout components dynamically.
const requireContext = require.context('~/layouts', false, /.*\.vue$/)

const layouts = requireContext.keys()
  .map(file =>
    [file.replace(/(^.\/)|(\.vue$)/g, ''), requireContext(file)]
  )
  .reduce((components, [name, component]) => {
    components[name] = component.default || component
    return components
  }, {})

export default {
  el: '#app',

  components: {
    Loading
  },

  data: () => ({
    layout: null,
    defaultLayout: 'default'
  }),

  metaInfo () {
    return {
      title: config.appName,
      titleTemplate: `%s`
    }
  },

  created() {
    try {
      firebase.messaging().requestPermission()
        .then(() => {
          console.log('Notification permission granted')
          firebase.messaging().getToken()
            .then((token) => {
              window.console.log(token)
            })
            .catch(err => {
              console.log('Unable to get token', err)
            })
        })
    } catch(e) {
      console.log(e)
    }
  },

  mounted () {
    console.log("App component is mounted");
    this.$loading = this.$refs.loading
  },

  methods: {
    /**
     * Set the application layout.
     *
     * @param {String} layout
     */
    setLayout (layout) {
      if (!layout || !layouts[layout]) {
        layout = this.defaultLayout
      }

      this.layout = layouts[layout]
    }
  }
}
</script>
