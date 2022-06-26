<template>
        <nav class="w-full flex justify-between py-4 px-8 bg-white shadow-md mb-2">
            <div class="flex space-x-12">
                <div class="flex items-center">
                    <h3 class="text-2xl font-medium text-indigo-500">Laravel+Vue+Ts</h3>
                </div>   
                <!-- left header section -->
                
                <div class="items-center hidden space-x-4 lg:flex" v-if="authenticated">
                    <div>
                        <router-link :to="{ name: 'users' }">
                            Users
                        </router-link>
                    </div>
                    <div>
                        <router-link :to="{ name: 'roles'}">
                            Roles
                        </router-link>
                    </div>
                </div>
                
            </div>
            
            <!-- right header section -->
            <div class="">
                <template v-if="authenticated">
                    <a href="#" class="tracking-wide text-sm text-gray-500">
                        {{ user.name }}
                    </a>
                </template>
                
            </div>
            
        </nav>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { mapGetters } from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                authenticated: 'auth/authenticated',
                user: 'auth/user',
            })
        }
    }
</script>