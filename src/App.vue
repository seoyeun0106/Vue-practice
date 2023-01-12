<template>
  <div>
    <router-link to="/" class="to-home">
    <span class="material-symbols-outlined homeLink">
    home
    </span>
  </router-link>
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
}
</script>
<style lang="scss">
  .to-home.router-link-exact-active{
    display: none ;
  }
</style>
