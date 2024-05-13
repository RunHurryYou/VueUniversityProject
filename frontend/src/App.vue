<template>
  <div id="app">
    <navbar/>
    <div class="mt-4">
      <router-view />
    </div>
  </div>
</template>

<script>
    import Navbar from './components/Navbar'
    export default {
        name: 'App',
        components: {
            Navbar: Navbar
        }
    }
</script>

<!--определение стилей-->
<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
  }
</style>