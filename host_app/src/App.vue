<template>
  <h1>Host Application</h1>
  <Suspense>
    <template #default>
      <VueModuleLoader 
        module-name="remote_app"
        component-name="HelloWorld"
        :module-props="{ message: 'Hello from host app!' }"
        @module-loaded="onModuleLoaded"
        @module-error="onModuleError"
      />
    </template>
    <template #fallback>
      <div>Loading Remote Component...</div>
    </template>
  </Suspense>
</template>

<script>
import VueModuleLoader from '../components/VueModuleLoader.vue'
export default {
  components: { VueModuleLoader },
  methods: {
    onModuleLoaded(data) {
      console.log('Module loaded:', data)
    },
    onModuleError(error) {
      console.error('Error loading module:', error)
    }
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>