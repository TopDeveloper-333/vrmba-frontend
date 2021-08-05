<template>
  <div class="container" style="padding-top:120px">
    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <card :title="$t('User Registration')">
          <label class="col-form-label text-md-left">Congratulations! Please verify your email for new user.
          </label>
          <router-link :to="{ name: 'login' }" class="nav-link text-md-right" active-class="active">
            Go to Login Page
          </router-link>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
