<template>
    <div id="users">
        <NavigationBar></NavigationBar>
        <div class="container">
            Manage Users
            
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
export default class UserView extends Vue {}
</script>
