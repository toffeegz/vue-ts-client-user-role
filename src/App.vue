<template>
  <router-view/>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { mapGetters } from 'vuex'

  export default defineComponent({
    name: 'App',
    components: {},
    computed: {
      ...mapGetters({
        authenticated: 'auth/authenticated',
        user: 'auth/user',
      })
    },
    mounted() {
      if(!this.authenticated) {
        this.$router.push('/login');
      }
    }
  });

</script>