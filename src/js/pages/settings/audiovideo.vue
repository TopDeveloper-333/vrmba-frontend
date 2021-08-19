<template>
<div style="max-width:700px;padding-top:50px;padding-left:50px">
  <p class="bold">Voice Settings</p>
  <div class="row" style="margin-top:15px">
    <div class="col-6">

      <div class="form-group">
        <label for="inputDevices">Input Devices</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <div class="input-group-text">
              <font-awesome-icon icon="microphone" style="color:#00a0fe"/> 
            </div>
          </div>
          <select id="inputDevices" class="form-control" >
            <option value="Default">Default</option>
            <option value="VirtualMic">Virtual Mic input</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label for="inputVolume">Input Volume</label>
        <div class="input-group">
          <input type="range" id="inputVolume" min="0" max="100" value="90" step="1" style="width:100%">
        </div>
      </div>

    </div>
    <div class="col-6">

      <div class="form-group">
        <label for="outputDevices">Output Devices</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <div class="input-group-text">
              <font-awesome-icon icon="headset" style="color:#00a0fe"/> 
            </div>
          </div>
          <select id="outputDevices" class="form-control" >
            <option value="Default">Default</option>
            <option value="VirtualSound">Virtual Sound Output</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label for="outputVolume">Output Volume</label>
        <div class="input-group">
          <input type="range" id="outputVolume" min="0" max="100" value="90" step="1" style="width:100%">
        </div>
      </div>

    </div>
  </div>

  <p class="bold" style="margin-top:15px">Input Mode</p>
  <div class="row" >
    <div class="col-6">
      <div class="form-group">
        <div class="input-group">
          <div class="input-group-prepend">
            <div class="input-group-text">
            <input type="radio" name="inputmode">
            </div>
          </div>
          <span class="form-control">Voice Activation</span>
        </div>
      </div>

    </div>
    <div class="col-6">
      <div class="form-group">
        <div class="input-group">
          <div class="input-group-prepend">
            <div class="input-group-text">
            <input type="radio" name="inputmode">
            </div>
          </div>
          <span class="form-control">Push-to-talk</span>
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

</div>

</template>
<style scoped>
.bold {
  color: white;
  font-weight: 600;
  font-size: 16px;
}

.input-group span {
  outline: none !important;
  border-top: 1px solid #00a0fe !important;
  border-bottom: 1px solid #00a0fe !important;
  border-right: 1px solid #00a0fe !important;
  border-top-right-radius: 0.4285rem !important;
  border-bottom-right-radius: 0.4285rem !important;
}

.input-group span:focus {
  border-color: #00a0fe;
}

</style>
<script>
import CustomSlider from 'vue-custom-range-slider'
export default{
  components:{
    CustomSlider
  },
  setup() {
    
  },
  data() {
    return { 
      volume: "76"
    }
  }
}
</script>
