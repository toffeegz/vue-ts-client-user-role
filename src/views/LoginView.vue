<template>
    <div>
        <div class='bg-white h-screen w-screen flex justify-center items-center'>
            <div class="p-8 rounded-lg border border-gray-100 shadow-lg w-96">
                <div class="flex flex-col items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <h2 class="text-2xl font-bold">Login</h2>
                </div>
                <form @submit.prevent="submit" class="space-y-4" method="POST">

                    <div  v-if="errors_exist" class="bg-red-100 rounded-md text-red-400 border border-red-200 p-4">
                        <div class="text-sm font-semibold mb-2">Something went wrong</div> 
                        <div v-for="message in errors" class="text-xs items-center">
                            <span>
                                {{ message[0] }}
                            </span>
                        </div>
                    </div>
                    <!-- username -->
                    <div class="flex flex-col">
                        <label class="text-sm text-gray-500">Email</label>
                        <input v-model="form.email" class="border rounded px-4 py-2 mt-2" type="email" placeholder="user@app.com"/>
                        
                    </div>
                    <div class="flex flex-col">
                        <label class="text-sm text-gray-500">Password</label>
                        <input v-model="form.password" class="border rounded px-4 py-2 mt-2" type="password" />
                    </div>
                    <div class="flex flex-col items-center justify-center my-3">
                        <button type="submit" class="my-3 py-1 w-full rounded bg-blue-600 text-blue-200">
                            Submit
                        </button>
                        <p class="text-sm text-gray-500">
                            <!-- Forgot password ? 
                                <a href="#" class="font-bold text-gray-700">Click here</a> 
                                to reset your password. -->

                        </p>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import axios from 'axios';
    import { defineComponent } from 'vue';
    import { mapActions } from 'vuex';
    import { mapGetters } from 'vuex'


    export default defineComponent(
    {
        name: 'login',
        computed: {
            ...mapGetters({
                authenticated: 'auth/authenticated',
                user: 'auth/user',
            })
        },
        data () {
            return {
                form: {
                    email: null,
                    password: null,
                },
                errors: {},
                errors_exist: false,
            }
        },
        methods: {
            ...mapActions({
                login: 'auth/login'
            }),
            submit() {
                const xy = this
                this.login(this.form)
                .then(() => {
                    this.$router.replace({
                        name: 'users',
                    })
                })
                .catch(function (error) {
                    if (error.response) {
                        xy.errors = error.response.data.errors
                        xy.errors_exist = true
                    }
                })
            }
        },
        mounted() {
            if(this.authenticated) {
                this.$router.push('/');
            }
        }
    });
</script>
