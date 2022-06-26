<template>
    <div id="roles">
        <NavigationBar></NavigationBar>
        <div class="container">
            Manage Role
            
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
export default class RoleView extends Vue {}
</script>
