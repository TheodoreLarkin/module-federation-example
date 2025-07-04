<template>
  <div class="vue-module-loader">
    <div ref="moduleContainer" class="module-container">
      <div v-if="loading" class="loading-container">
        <p>Loading module...</p>
      </div>
      <div v-else-if="error" class="error-container">
        <p>Error: {{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VueModuleLoader',
  
  props: {
    moduleName: {
      type: String,
      required: true
    },
    componentName: {
      type: String,
      default: 'App'
    },
    moduleProps: {
      type: Object,
      default: () => ({})
    }
  },
  
  data() {
    return {
      loading: false,
      error: null,
      moduleApp: null,
      moduleInstance: null
    }
  },
  
  async mounted() {
    await this.loadModule()
  },
  
  async beforeUnmount() {
    await this.unmountModule()
  },
  watch: {
    moduleName: {
      async handler(newModule, oldModule) {
        if (newModule !== oldModule) {
          await this.unmountModule()
          await this.loadModule()
        }
      }
    },
    componentName: {
      async handler(newComponent, oldComponent) {
        if (newComponent !== oldComponent) {
          await this.unmountModule()
          await this.loadModule()
        }
      }
    }
  },  
  methods: {
    async loadModule() {
      this.loading = true
      this.error = null
      try {
        await this.$nextTick()
        
        if (!this.$refs.moduleContainer) {
          throw new Error('Container for module not found')
        }
        
        console.log('Container found:', this.$refs.moduleContainer)
        console.log(`Loading module: ${this.moduleName}/${this.componentName}`)
        
        const module = await import(/* @vite-ignore */ 'remote_app/HelloWorld')
        console.log('Module loaded:', module)
        
        if (!module || !module.default) {
          throw new Error(`Module ${this.moduleName}/${this.componentName} does not export a default component`)
        }
        
        const { createApp } = await import('vue')
        const app = createApp(module.default, this.moduleProps)
        
        console.log('App created:', app)
        
        this.loading = false
        this.error = null
        await this.$nextTick()
        
        this.moduleApp = app
        this.moduleInstance = app.mount(this.$refs.moduleContainer)
                
        this.$emit('module-loaded', {
          moduleName: this.moduleName,
          componentName: this.componentName,
          instance: this.moduleInstance
        })
        
      } catch (err) {
        console.error('Error during module loading:', err)
        this.error = err.message
        this.loading = false
        
        this.$emit('module-error', {
          moduleName: this.moduleName,
          componentName: this.componentName,
          error: err
        })
      }
    },
    
    async unmountModule() {
      if (this.moduleApp) {
        try {
          console.log('Unmounting module');
          this.moduleApp.unmount()
          this.moduleApp = null
          this.moduleInstance = null

          if (this.$refs.moduleContainer) {
            this.$refs.moduleContainer.innerHTML = ''
          }
          
          console.log('Module unmounted');
          
        } catch (err) {
          console.error('Error during unmounting module:', err)
        }
      }
    }
  },
  
  expose: ['loadModule', 'unmountModule']
}
</script>

<style scoped>
.vue-module-loader {
  width: 100%;
  height: 100%;
  position: relative;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 16px;
}

.error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #d32f2f;
  font-size: 16px;
  text-align: center;
  padding: 20px;
}

.module-container {
  width: 100%;
  height: 100%;
  min-height: 100px;
  border: 1px dashed #ccc;
}
</style>