<template>
  <div class="home">
      <NavigationBar></NavigationBar>
      <div class="container">
        Hi, Gezryl!aa
        
      </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import NavigationBar from '@/components/layouts/NavigationBar.vue'

@Options({
  components: {
    NavigationBar
  },
})
export default class HomeView extends Vue {}
</script>
