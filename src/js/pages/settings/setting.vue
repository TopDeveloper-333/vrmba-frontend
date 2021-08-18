<template>
  <div class="grid-container">
    <div>
      <h3 class="title">Settings</h3>
      <ul class="list-group" id="settingList">
        <li v-on:click="onSettingMenuSelected($event)" id="Account" class="setting-group-item">
          <img src="black/img/setting-1.png" style="display:inline-grid;">
          <div style="display:inline-grid; margin-left:10px">
            <p class="bold">Account</p>
            <p class="tiny">Lorem ipsum dolor sit amet</p>
            <p class="tiny">Consecteur adpiscing elit... Phase</p>
          </div>
        </li>
        <li v-on:click="onSettingMenuSelected($event)" id="Security" class="setting-group-item">
          <img src="black/img/setting-2.png" style="display:inline-grid;">
          <div style="display:inline-grid; margin-left:10px">
            <p class="bold">Security</p>
            <p class="tiny">Lorem ipsum dolor sit amet</p>
            <p class="tiny">Consecteur adpiscing elit... Phase</p>
          </div>
        </li>
        <li v-on:click="onSettingMenuSelected($event)" id="Notification" class="setting-group-item">
          <img src="black/img/setting-3.png" style="display:inline-grid;">
          <div style="display:inline-grid; margin-left:10px">
            <p class="bold">Notification</p>
            <p class="tiny">Lorem ipsum dolor sit amet</p>
            <p class="tiny">Consecteur adpiscing elit... Phase</p>
          </div>
        </li>
        <li v-on:click="onSettingMenuSelected($event)" id="VRDevices" class="setting-group-item">
          <img src="black/img/setting-4.png" style="display:inline-grid;">
          <div style="display:inline-grid; margin-left:10px">
            <p class="bold">VR & Devices</p>
            <p class="tiny">Lorem ipsum dolor sit amet</p>
            <p class="tiny">Consecteur adpiscing elit... Phase</p>
          </div>
        </li>
        <li v-on:click="onSettingMenuSelected($event)" id="AudioVideo" class="setting-group-item">
          <img src="black/img/setting-5.png" style="display:inline-grid;">
          <div style="display:inline-grid; margin-left:10px">
            <p class="bold">Audio & Video</p>
            <p class="tiny">Lorem ipsum dolor sit amet</p>
            <p class="tiny">Consecteur adpiscing elit... Phase</p>
          </div>
        </li>
        <li v-on:click="onSettingMenuSelected($event)" id="Appearance" class="setting-group-item">
          <img src="black/img/setting-6.png" style="display:inline-grid;">
          <div style="display:inline-grid; margin-left:10px">
            <p class="bold">Appearance</p>
            <p class="tiny">Lorem ipsum dolor sit amet</p>
            <p class="tiny">Consecteur adpiscing elit... Phase</p>
          </div>
        </li>
        <li v-on:click="onSettingMenuSelected($event)" id="AppsConnections" class="setting-group-item">
          <img src="black/img/setting-7.png" style="display:inline-grid;">
          <div style="display:inline-grid; margin-left:10px">
            <p class="bold">Apps & Connections</p>
            <p class="tiny">Lorem ipsum dolor sit amet</p>
            <p class="tiny">Consecteur adpiscing elit... Phase</p>
          </div>
        </li>
      </ul>

    </div>
    <div style="background:#262626; height:100vh">There m! </div>
  </div>  
</template>
<style scoped>
.grid-container {
  padding-left: 65px;
  display:grid;
  grid-template-columns: 400px 1fr;
}
.title {
  padding:20px 20px 0px 20px;
  color: white;
}
.setting-group-item {
  position: relative;
  display: block;
  padding: 1rem 1rem;
  border-top: 2px solid #262626;
}
.setting-group-item.active{
  background:#262626;
}
.setting-group-item:last-child {
  position: relative;
  display: block;
  padding: 1rem 1rem;
  border-top: 2px solid #262626;
  border-bottom: 2px solid #262626;
}

.tiny {
  font-weight: 200;
}
.bold {
  color: white;
  font-weight: 600;
  font-size: 16px;
}
</style>
<script>

export default {
  middleware: 'auth',
  setup() {
    
  },
  methods: {
    onSettingMenuSelected: function(event){
      // console.log(event);
      var menulist = document.getElementById("settingList").getElementsByTagName("li");
      for (let i = 0; i < menulist.length; i++) {
          menulist[i].classList.remove('active');
      }
      event.target.closest("li").classList.add('active');
    },

  }
}
</script>
