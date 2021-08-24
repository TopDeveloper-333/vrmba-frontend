<template>
  <div class="container" style="padding-top:120px">
  <div class="row">
    <div class="col-lg-8 m-auto">
      <card v-if="mustVerifyEmail" :title="$t('register')">
        <div class="alert alert-success" role="alert">
          {{ $t('verify_email_address') }}
        </div>
      </card>
      <card v-else :title="$t('register')">
        <form @submit.prevent="register" @keydown="form.onKeydown($event)">
          <!-- Name -->
          <!-- <div class="form-group row">
            <label class="col-md-3 col-form-label text-md-right">{{ $t('name') }}</label>
            <div class="col-md-7">
              <input v-model="form.name" :class="{ 'is-invalid': form.errors.has('name') }" class="form-control" type="text" name="name">
              <has-error :form="form" field="name" />
            </div>
          </div> -->

          <!-- Email -->
          <div class="form-group row">
            <label class="col-md-3 col-form-label text-md-right">{{ $t('email') }}</label>
            <div class="col-md-7">
              <input v-model="form.email" :class="{ 'is-invalid': form.errors.has('email') }" class="form-control" type="email" name="email">
              <has-error :form="form" field="email" />
            </div>
          </div>

          <!-- Password -->
          <div class="form-group row">
            <label class="col-md-3 col-form-label text-md-right">{{ $t('password') }}</label>
            <div class="col-md-7">
              <input v-model="form.password" :class="{ 'is-invalid': form.errors.has('password') }" class="form-control" type="password" name="password">
              <has-error :form="form" field="password" />
            </div>
          </div>

          <!-- Password Confirmation -->
          <div class="form-group row">
            <label class="col-md-3 col-form-label text-md-right">{{ $t('confirm_password') }}</label>
            <div class="col-md-7">
              <input v-model="form.password_confirmation" :class="{ 'is-invalid': form.errors.has('password_confirmation') }" class="form-control" type="password" name="password_confirmation">
              <has-error :form="form" field="password_confirmation" />
            </div>
          </div>

          <div class="form-group row">
            <div class="col-md-7 offset-md-3 d-flex">
              <!-- Submit Button -->
              <v-button :loading="form.busy">
                {{ $t('register') }}
              </v-button>
              <a class="btn btn-md btn-google btn-block text-uppercase btn-outline" href="#" v-on:click="onGoogleSignup($event)">
                <img src="https://img.icons8.com/color/16/000000/google-logo.png"> Sign up with Google
              </a>
            </div>
          </div>
        </form>
      </card>
    </div>
  </div>
  </div>
</template>

<script>
import Form from 'vform'
import firebase from "firebase";

export default {
  components: {
  },

  middleware: 'guest',

  metaInfo () {
    return { title: this.$t('register') }
  },

  data: () => ({
    form: new Form({
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    }),
    mustVerifyEmail: false
  }),

  methods: {
    onGoogleSignup: function(event) {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;

          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
          console.log(result)
          
        }).catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
          console.log(error)
        });
    },
    register () {
      firebase.auth().createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          this.$router.push({ name: 'register.success' });
        })
        .catch(err => {
          alert(err.message);
        });

      // // Register the user.
      // const { data } = await this.form.post('/api/register')

      // // Must verify email fist.
      // if (data.status) {
      //   this.mustVerifyEmail = true
      // } else {
      //   // Log in the user.
      //   const { data: { token } } = await this.form.post('/api/login')

      //   // Save the token.
      //   this.$store.dispatch('auth/saveToken', { token })

      //   // Update the user.
      //   await this.$store.dispatch('auth/updateUser', { user: data })

      //   // Redirect home.
      //   this.$router.push({ name: 'home' })
      // }
    }
  }
}
</script>
