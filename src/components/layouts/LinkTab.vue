<template>
    <div class="border-b-2 px-4 py-2 text-gray-400 tracking-wide border-transparent" :class="{ 'border-indigo-400 text-gray-700': currentRouteName === route_name }">
        <router-link :to="{ name: route_name }">
            <span class="capitalize">{{route_name}}</span>
        </router-link>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        
    },
    computed: {
        currentRouteName() {
            return this.$route.name;
        }
    },
    props: {
        route_name: String,
    }
})
</script>
