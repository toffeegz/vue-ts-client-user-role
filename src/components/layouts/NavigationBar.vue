<template>
        <nav class="w-full flex justify-between px-8 bg-white border border-gray-200 shadow-sm shadow-red-200 ">
            <div class="flex space-x-12">
                <div class="flex items-center  py-4">
                    <h3 class="text-xl font-medium text-gray-800">Laravel+Vue+Ts</h3>
                </div>   
                <!-- left header section -->
                
                <div class="items-center hidden space-x-4 lg:flex font-semibold" v-if="authenticated">
                    <div class="border-b-2 px-4 py-2 text-gray-400 tracking-wide border-transparent" :class="{ 'border-indigo-400 text-gray-700': currentRouteName === 'users' }">
                        <router-link :to="{ name: 'users' }">
                            <span>Users</span>
                        </router-link>
                    </div>
                    <div class="border-b-2 px-4 py-2 text-gray-400 tracking-wide border-transparent" :class="{ 'border-indigo-400 text-gray-700': currentRouteName === 'roles' }">
                        <router-link :to="{ name: 'roles'}">
                            Roles
                        </router-link>
                    </div>
                </div>
                
            </div>
            
            <!-- right header section -->
            <div class=" py-4">
                <template v-if="authenticated" class="relative text-left dropdown">
                    <span class="rounded-md shadow-sm">
                        <button @click="userDropdown = !userDropdown" class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800" type="button" aria-haspopup="true" aria-expanded="true" aria-controls="headlessui-menu-items-117">
                            <span>{{ user.name }}</span>
                            <svg class="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                    </span>
                    <div v-show="userDropdown" class="dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">
                        <div class="mt-4 absolute right-0 w-56 origin-top-right bg-white border border-gray-300 divide-y divide-gray-100 rounded-md outline-none" aria-labelledby="headlessui-menu-button-1" id="headlessui-menu-items-117" role="menu">
                            <div class="px-4 py-3">         
                                <p class="text-sm leading-5">Signed in as</p>
                                <p class="text-sm font-semibold leading-5 text-gray-900 truncate">{{ user.email }}</p>
                            </div>
                            <div class="py-1">
                                <a href="#" @click.prevent="logout" tabindex="3" class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"  role="menuitem" >Logout</a>
                            </div>
                        </div>
                    </div>
                </template>
                
            </div>
            
        </nav>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { defineComponent } from "vue"
    import { mapGetters, mapActions } from 'vuex'

    export default defineComponent({
        computed: {
            ...mapGetters({
                authenticated: 'auth/authenticated',
                user: 'auth/user',
            }),
            currentRouteName() {
                return this.$route.name;
            }
        },
         data() {
            return {
                userDropdown: false,
            }
        },
        methods: {
            ...mapActions({
                logoutAction: 'auth/logout'
            }),

            logout () {
                this.logoutAction().then(() => {
                    this.$router.replace({
                        name: 'login'
                    })
                })
            }
        }
    });
</script>