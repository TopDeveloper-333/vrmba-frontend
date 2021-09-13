<template>
<div style="max-width:700px;padding-top:50px;padding-left:50px">
  <p class="bold">Profile Appearance</p>
  <form style="margin-top:15px">
    <div class="row">
      <div class="col-6">
        <label for="avatar">Profile Picture</label><br>
        <div style="display:flex">
          <v-avatar size="150" style="margin: auto">
            <v-img src="/black/img/account-1.png"></v-img>
          </v-avatar>
        </div>
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
            <input class="form-control" id="name" type="text" value="John">
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
            <textarea class="form-control" rows="3" >
              Dev-Ops Engineer at Sparkelon
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
            <input class="form-control" id="phone" type="tel" value="+316 12345678">
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
            <input class="form-control" id="emailAddr" type="text" value="example@gmail.com">
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
			<button type="submit" class="btn btn-primary" style="margin-left:10px">
				Update
			</button>      
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
import meeting from '../meeting/meeting.vue'

export default {
  components: { meeting },
  data() {
    return {
      toggle1: false,
      toggle2: true,
      toggle3: false
    }
  }
}
</script>
