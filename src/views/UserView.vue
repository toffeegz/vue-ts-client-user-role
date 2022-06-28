<template>
    <div id="users">
        <NavigationBar></NavigationBar>
        <section class="py-1 bg-gray-50">
            <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
                <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl ">
                    <div class="rounded-t mb-0 px-2 py-3 border-0">
                        <div class="flex flex-wrap items-center pb-2">
                            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h3 class="font-semibold text-base text-blueGray-700">Manage Users</h3>
                            </div>
                            <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                <button @click="newUserModal = !newUserModal" class="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                                    <i class="fa-solid fa-plus"></i>
                                </button>
                            </div>
                        </div>
                        <div class="block w-full overflow-x-auto">
                            <table class="items-center bg-transparent w-full border-collapse ">
                                <thead>
                                    <tr>
                                        <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Full Name
                                        </th>
                                        <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Email
                                        </th>
                                        <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Role
                                        </th>
                                        <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr v-for="(item,index) in users" :key="item.id">
                                        <td class="px-6 align-middle text-sm p-4 text-left font-normal  border-t border-gray-200">
                                            {{ item.name }}
                                        </td>
                                        <td class="px-6 align-middle text-sm p-4 font-normal border-t border-gray-200">
                                            {{ item.email }}
                                        </td>
                                        <td class="px-6 align-middle text-sm p-4 font-normal border-t border-gray-200">
                                            <span v-if="item.role">{{ item.role.name }}</span>
                                            <span v-else>N/A</span>
                                        </td>
                                        <td class="px-6 align-middle whitespace-nowrap p-4 flex space-x-2 border-t border-gray-200">
                                            <a href="#" class="text-blue-500" @click="edit(item)">
                                                <i class="fa-solid fa-pen-to-square"></i>
                                            </a>
                                            <a href="#" class="text-red-500" @click="remove(item,index)">
                                                <i class="fa-solid fa-trash"></i>
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
          
        </section>

        <!-- New User Modal -->
        <div v-show="newUserModal">
            <div class="py-12 bg-transparent transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
                <div role="alert" class="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                    <form @submit.prevent="submit" class="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-200">
                        <div class="w-full flex justify-start text-gray-600 mb-3 py-6 px-2">
                            <i class="fa-solid fa-user fa-2xl"></i>
                        </div>
                        <h1 class="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Enter New User Details</h1>
                        <div class="space-y-5">
                            <div  v-if="errors_exist" class="bg-red-100 rounded-md text-red-400 border border-red-200 p-4">
                                <div class="text-sm font-semibold mb-2">Something went wrong</div> 
                                <div v-for="message in errors" class="text-xs items-center" v-bind:key="message">
                                    <span>
                                    {{ message[0] }}
                                    </span>
                                </div>
                            </div>
                            <!-- name -->
                            <div>
                                <label  class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Name</label>
                                <input  type="text" v-model="form.name" class=" mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-500 font-normal w-full h-10 flex items-center px-4 text-sm border-gray-300 rounded border" placeholder="Jane Doe" />
                            </div>
                            <!-- email -->
                            <div>
                                <label  class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Email</label>
                                <input  type="email" v-model="form.email" class="mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-500 font-normal w-full h-10 flex px-4 text-sm border-gray-300 rounded border" placeholder="jane@app.com"/>
                            </div>
                            <!-- role -->
                            <div>
                                <label for="role_id" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Assign Role</label>
                                <select name="role_id" id="role_id" v-model="form.role_id" class="mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-500 font-normal w-full h-10 flex px-4 text-sm border-gray-300 rounded border">
                                    <option value="null">- select role -</option>
                                    <option v-for="(item , index) in roles" v-bind:value="item.id" v-bind:key="index">{{ item.name }}</option>
                                </select>
                            </div>
                            <!-- password -->
                            <div>
                                <label class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Password</label>
                                <input  type="password" v-model="form.password" class="mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-500 font-normal w-full h-10 flex px-4 text-sm border-gray-300 rounded border"/>
                            </div>
                            <!-- password confirmation -->
                            <div>
                                <label for="password_confirmation" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Confirm Password</label>
                                <input  type="password" v-model="form.password_confirmation" class="mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-500 font-normal w-full h-10 flex px-4 text-sm border-gray-300 rounded border"/>
                            </div>

                            <!-- button -->
                            <div class="flex items-center justify-start w-full">
                                <button type="submit" class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-500 rounded text-white px-8 py-2 text-sm">Submit</button>
                                <button type="button" @click="newUserModal = false; clearErrors()" class="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm" >Cancel</button>
                            </div>
                        </div>

                        
                        <button type="button" @click="newUserModal = false; clearErrors()" class="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-0 focus:outline-none " >
                            <svg  xmlns="http://www.w3.org/2000/svg"  class="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>

        <!-- Edit User Modal -->
        <div v-show="editUserModal">
            <div class="py-12 bg-transparent transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
                <div role="alert" class="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                    <div class="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-200">
                        <div class="w-full flex justify-start text-gray-600 mb-3 py-6 px-2">
                            <i class="fa-solid fa-user fa-2xl"></i>
                        </div>
                        <h1 class="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Edit User Details</h1>
                        <div class="space-y-5">
                            <div  v-if="errors_exist" class="bg-red-100 rounded-md text-red-400 border border-red-200 p-4">
                                <div class="text-sm font-semibold mb-2">Something went wrong</div> 
                                <div v-for="message in errors" v-bind:key="message" class="text-xs items-center">
                                    <span>
                                    {{ message[0] }}
                                    </span>
                                </div>
                            </div>
                            <!-- name -->
                            <div>
                                <label  class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Name</label>
                                <input  type="text" v-model="formEdit.name" class=" mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-500 font-normal w-full h-10 flex items-center px-4 text-sm border-gray-300 rounded border" placeholder="Jane Doe" />
                            </div>
                            <!-- email -->
                            <div>
                                <label  class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Email</label>
                                <input  type="email" v-model="formEdit.email" class="mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-500 font-normal w-full h-10 flex px-4 text-sm border-gray-300 rounded border" placeholder="jane@app.com"/>
                            </div>
                            <!-- role -->
                            <div>
                                <label class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Assign Role</label>
                                <select name="role_id" v-model="formEdit.role_id" class="mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-500 font-normal w-full h-10 flex px-4 text-sm border-gray-300 rounded border">
                                    <option value="null">- select role -</option>
                                    <option v-for="(item,index) in roles" v-bind:value="item.id" v-bind:key="index">{{ item.name }}</option>
                                </select>
                            </div>
                            <!-- password -->
                            <div>
                                <label class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Password</label>
                                <input  type="password" v-model="formEdit.password" class="mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-500 font-normal w-full h-10 flex px-4 text-sm border-gray-300 rounded border"/>
                            </div>
                            <!-- password confirmation -->
                            <div>
                                <label for="password_confirmation" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Confirm Password</label>
                                <input  type="password" v-model="formEdit.password_confirmation" class="mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-500 font-normal w-full h-10 flex px-4 text-sm border-gray-300 rounded border"/>
                            </div>

                            <!-- button -->
                            <div class="flex items-center justify-start w-full">
                                <button @click="update()" class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-500 rounded text-white px-8 py-2 text-sm">Save Changes</button>
                                <button @click="editUserModal = false; clearErrors()" class="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm" >Cancel</button>
                            </div>
                        </div>

                        
                        <button @click="editUserModal = false; clearErrors()" class="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-0 focus:outline-none " aria-label="close modal" role="button">
                            <svg  xmlns="http://www.w3.org/2000/svg"  class="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script lang="ts">
  import NavigationBar from '@/components/layouts/NavigationBar.vue'
  import { defineComponent } from 'vue'
  import axios from 'axios'

  export default defineComponent({
    components: {
      NavigationBar
    },
    data () {
            return {
                users: [],
                roles: [],
                form: {
                    name: null,
                    email: null,
                    role_id: null,
                    password: null,
                    password_confirmation: null,
                },
                formEdit: {
                    id: null,
                    name: null,
                    email: null,
                    role_id: null,
                    password: null,
                    password_confirmation: null,
                },
                selectedId: null,
                errors: {},
                errors_exist: false,
                newUserModal: false,
                editUserModal: false,
            }
        },
        mounted() {
            axios
            .get('users')
            // .then(response => (console.log(response.data)))
            .then(response => (this.users = response.data))

            axios
            .get('roles')
            // .then(response => (console.log(response.data)))
            .then(response => (this.roles = response.data))
        },
        methods: {
            async submit() {
                const xy = this
                await axios.post('users', this.form)
                .then(function (response) {
                    xy.newUserModal = false
                    let new_user = response.data.data
                    xy.users.push(new_user as never)
                    xy.form.name = null
                    xy.form.email = null
                    xy.form.role_id = null
                    xy.form.password = null
                    xy.form.password_confirmation = null
                })
                .catch(function (error) {
                    if (error.response) {
                        xy.errors = error.response.data.errors
                        xy.errors_exist = true
                    }
                })
            },
            remove(item:any,index:any) {
                const xy = this
                axios.delete(`users/${item.id}`)
                .then(function (response) {
                    // xy.users.splice(index,1)
                    location.reload()
                })
            },
            edit(item:any) {
                const xy = this
                xy.editUserModal = true
                xy.formEdit.id = item.id
                xy.formEdit.name = item.name
                xy.formEdit.email = item.email
                xy.formEdit.role_id = item.role_id
                xy.formEdit.password = null
                xy.formEdit.password_confirmation = null
                xy.selectedId = item.id
            },
            update() {
                const xy = this
                axios.put(`users/${xy.selectedId}`, this.formEdit)
                .then(function (response) {
                    alert(response.data.message)
                    location.reload()
                })
                .catch(function (error) {
                    console.log(error.response)
                    if (error.response) {
                        xy.errors = error.response.data.errors
                        xy.errors_exist = true
                    }
                })
            },
            clearErrors() {
                const xy = this
                xy.errors = {}
                xy.errors_exist = false
            }
        }
  })
  

</script>
