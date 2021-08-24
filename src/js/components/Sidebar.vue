<template>
<div id="sidebar" v-if="user" class="sidebar">
    <div class="logo">
        <img src="black/img/title-avatar.png" alt="bonVR" data-nsfw-filter-status="sfw" id="logoImage"
        style="visibility: visible; margin-top:20px; margin-left:20px; margin-right:20px">
        <img src="black/img/notitle-avatar.png" alt="bonVR" data-nsfw-filter-status="sfw" id="logoImage-notitle"
        style="visibility: visible; margin-top:40px; display:none">
    </div>
    <div class="sidebar-wrapper">
        <div class="navigation_wrapper">
            <ul class="nav sidebar-nav" id="menuList">
                <div style="height:60px"></div>
                <li v-on:click="onMenuSelected($event)" id="Dashboard" class="active">
                    <router-link :to="{ name: 'home' }" class="nav-link" active-class="active">
                        <font-awesome-icon icon="home"/>
                        <div class="nav_label">Dashboard</div>
                    </router-link>
                </li>
                <div style="height:30px"></div>
                <li v-on:click="onMenuSelected($event)" id="Chat">
                    <router-link :to="{ name: 'chat' }" class="nav-link" active-class="active">
                        <font-awesome-icon icon="comment"/>
                        <div class="nav_label">Chat</div>
                    </router-link>
                </li>
                <li v-on:click="onMenuSelected($event)" id="Groups">
                    <router-link :to="{ name: 'groups' }" class="nav-link" active-class="active">
                        <font-awesome-icon icon="users"/>
                        <div class="nav_label">Groups</div>
                    </router-link>
                </li>
                <li v-on:click="onMenuSelected($event)" id="Files">
                    <router-link :to="{ name: 'files' }" class="nav-link" active-class="active">
                        <font-awesome-icon icon="file"/>
                        <div class="nav_label">Files</div>
                    </router-link>
                </li>
                <div style="height:30px"></div>
                <li v-on:click="onMenuSelected($event)" id="Contacts">
                    <router-link :to="{ name: 'contacts' }" class="nav-link" active-class="active">
                        <font-awesome-icon icon="user"/> 
                        <div class="nav_label">Contacts</div>
                    </router-link>
                </li>
                <li v-on:click="onMenuSelected($event)" id="Calendar">
                    <router-link :to="{ name: 'calendar' }" class="nav-link" active-class="active">
                        <font-awesome-icon icon="calendar"/>
                        <div class="nav_label">Calendar</div>
                    </router-link>
                </li>
                <li v-on:click="onMenuSelected($event)" id="Schedule">
                    <router-link :to="{ name: 'meeting' }" class="nav-link" active-class="active">
                        <font-awesome-icon icon="video"/>
                        <div class="nav_label">Schedule</div>
                    </router-link>                        
                </li>
                <div style="height:30px"></div>
                <li v-on:click="onMenuSelected($event)" id="Settings">                    
                    <router-link :to="{ name: 'settings' }" class="nav-link" active-class="active">
                        <font-awesome-icon icon="cog"/>
                        <div class="nav_label">Settings</div>
                    </router-link>
                </li>
                <li>
                    <a href="#" class="nav-link" @click.prevent="logout">                    
                        <font-awesome-icon icon="sign-out-alt"/>
                        <div class="nav_label">Logout</div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>

<style scoped>
.nav_label {
    display:inline;
    margin-left:10px
}
.sidebar{
    transition:width 0.5s;
}
.sidebar{
    width:fit-content;
}

</style>

<script>
import { mapGetters } from 'vuex'
import config from '../../config'
import firebase from 'firebase'

export default {
  components: {
  },
  computed: mapGetters({
    user: 'auth/user'
  }),
  methods: {
    async logout () {
        await firebase.auth().signOut();

        // Log out the user.
        await this.$store.dispatch('auth/logout')

        // Redirect to login.
        this.$router.push({ name: 'login' })

    },
    onMenuSelected: function(event){
        // console.log(event);
        var menulist = document.getElementById("menuList").getElementsByTagName("li");
        for (let i = 0; i < menulist.length; i++) {
            menulist[i].classList.remove('active');
        }
        event.target.closest("li").classList.add('active');
        var selected = event.target.closest("li")
        if (selected.id == "Settings" || selected.id == "Chat") {
            $('.nav_label').addClass('animated fadeIn').hide();
            document.getElementById("logoImage").style.display = "none";
            document.getElementById("logoImage-notitle").style.display = "block";
            document.getElementById("navbar").style.display = "none";
        }
        else {
            $('.nav_label').addClass('animated fadeIn').show();
            document.getElementById("logoImage").style.display = "block";
            document.getElementById("logoImage-notitle").style.display = "none";
            document.getElementById("navbar").style.display = "block";
        }

    },
  }
}


</script>

