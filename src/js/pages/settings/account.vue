<template>
<div style="max-width:700px;padding-top:50px;padding-left:50px">
  <p class="bold">Profile Appearance</p>
  <form style="margin-top:15px">
    <div class="row">
      <div class="col-6">
        <label for="avatar">Profile Picture</label><br>
        <image-input v-model="avatar">
          <div style="display:flex" slot="activator">
            <v-avatar size="150" style="margin: auto">
              <v-img :src="avatar.imageURL"></v-img>
            </v-avatar>
          </div>
        </image-input>
      </div>

      <div class="col-6">
        <div class="form-group">
          <label for="name">Display Name</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <font-awesome-icon icon="user" style="color:#00a0fe"/> 
              </div>
            </div>
            <input class="form-control" id="name" type="text" v-model="profile.displayName">
          </div>
        </div>

        <div class="form-group" style="margin-top:20px">
          <label for="status">Status - Biografie</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <font-awesome-icon icon="file" style="color:#00a0fe"/>                 
              </span>
            </div>
            <textarea v-model="profile.status" class="form-control" rows="3">
            </textarea>
          </div>
        </div>

      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label for="phone">Phone Number</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <font-awesome-icon icon="phone-alt" style="color:#00a0fe"/> 
              </div>
            </div>
            <input class="form-control" id="phone" type="tel" v-model="profile.phoneNumber">
          </div>
        </div>
      </div>

      <div class="col-6">
        <div class="form-group">
          <label for="emailAddr">Email</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <font-awesome-icon icon="at" style="color:#00a0fe"/> 
              </div>
            </div>
            <input class="form-control" id="emailAddr" type="text" v-model="profile.email" disabled>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-9">
        <label class="bold">Toggleable settings</label>
        <label>This setting does something but is easily toggled with the flick of this button</label>
      </div>
      <div class="col-3" style="display:flex">
        <label class="switch" style="margin: 0 0 auto auto">
          <input type="checkbox" checked>
          <span class="slider round"></span>
        </label>
      </div>
    </div>

    <div class="row">
      <div class="col-9">
        <label class="bold">Toggleable settings</label>
        <label>This setting does something but is easily toggled with the flick of this button</label>
      </div>
      <div class="col-3" style="display:flex">
        <label class="switch" style="margin: 0 0 auto auto">
          <input type="checkbox" checked>
          <span class="slider round"></span>
        </label>
      </div>
    </div>

    <div class="row">
      <div class="col-9">
        <label class="bold">Toggleable settings</label>
        <label>This setting does something but is easily toggled with the flick of this button</label>
      </div>
      <div class="col-3" style="display:flex">
        <label class="switch" style="margin: 0 0 auto auto">
          <input type="checkbox" checked>
          <span class="slider round"></span>
        </label>
      </div>
    </div>

    <div class="row">
      <label class="btn btn-primary btn-simple active" style="margin-left:10px" v-on:click="onUpdateProfile">Update</label>
    </div>

  </form>


</div>  
</template>
<style scoped>
.bold {
  color: white;
  font-weight: 600;
  font-size: 16px;
}
</style>

<script>
import store from '~/store'
import { mapGetters } from 'vuex'
import meeting from '../meeting/meeting.vue'
import ImageInput from '~/components/ImageInput.vue'


export default {

  components: { 
    meeting, ImageInput
  },

  middleware: 'auth',

  data() {
    return {
      avatar: {
        imageURL : "/black/img/no-avatar.png"
      },
      avatarChanged: false,
      toggle1: false,
      toggle2: true,
      toggle3: false
    }
  },
  
  computed: {
    ...mapGetters({
      profile: 'auth/profile'
    })
  },

  watch: {
    avatar: {
      handler: function() {
        console.log('avatar image changed: ', this.avatar.imageURL)
        this.avatarChanged = true
      }, 
      deep:true
    }
  },

  methods: {
    onUpdateProfile: async function(event){
      await store.dispatch('auth/updateProfile', this.profile)
      if (this.avatarChanged == true) {
        await store.dispatch('auth/uploadAvatar', this.avatar.imageURL)
        await store.dispatch('auth/getProfile')
      }
    }
  },

  async mounted() {
    try {
      await store.dispatch('auth/getProfile')
      this.avatar.imageURL = this.profile.avatarURL
    }
    catch(err) {
      alert(err)
      console.log(err)
    }
  }

}
</script>
