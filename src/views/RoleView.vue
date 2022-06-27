<template>
    <div id="roles">
        <NavigationBar></NavigationBar>
        <section class="py-1 bg-gray-50">
          <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
            <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl ">
              <div class="rounded-t mb-0 px-2 py-3 border-0">
                <div class="flex flex-wrap items-center">
                  <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 class="font-semibold text-base text-blueGray-700">Manage Roles</h3>
                  </div>
                  <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                    <button @click="newRoleModal = !newRoleModal" class="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                      <i class="fa-solid fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="block w-full overflow-x-auto">
                <table class="items-center bg-transparent w-full border-collapse ">
                  <thead>
                    <tr>
                      <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Name
                      </th>
                      <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Description
                      </th>
                      <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="(item,index) in roles" :key="item.id">
                      <th class="px-6 align-middle text-sm whitespace-nowrap p-4 text-left font-normal  border-t border-gray-200">
                        {{ item.name }}
                      </th>
                      <td class="px-6 align-middle text-sm p-4 font-normal border-t border-gray-200">
                        {{ item.description }}
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
          
        </section>

        
        <!-- New Role Modal -->
        <div v-show="newRoleModal">
            <div class="py-12 bg-transparent transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
                <div role="alert" class="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                    <form @submit.prevent="submit" class="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-200">
                        <div class="w-full flex justify-start text-gray-600 mb-3 py-6 px-2">
                            <i class="fa-solid fa-user fa-2xl"></i>
                        </div>
                        <h1 class="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Enter New Role Details</h1>
                        <div class="space-y-5">
                          <div  v-if="errors_exist" class="bg-red-100 rounded-md text-red-400 border border-red-200 p-4">
                            <div class="text-sm font-semibold mb-2">Something went wrong</div> 
                            <div v-for="message in errors" class="text-xs items-center">
                                <span>
                                  {{ message[0] }}
                                </span>
                            </div>
                          </div>
                          <!-- name -->
                          <div>
                            <label for="name" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Name</label>
                            <input id="name" v-model="form.name" class=" mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-500 font-normal w-full h-10 flex items-center px-4 text-sm border-gray-300 rounded border" placeholder="Jane Doe" />
                            
                          </div>
                          <!-- description -->
                          <div>
                            <label for="description" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Description</label>
                            <input id="description" v-model="form.description" class="mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-500 font-normal w-full h-10 flex px-4 text-sm border-gray-300 rounded border" placeholder="A small description of new role"/>
                          
                          </div>

                          <!-- button -->
                          <div class="flex items-center justify-start w-full">
                            <button type="submit" class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-500 rounded text-white px-8 py-2 text-sm">Submit</button>
                            <button @click="newRoleModal = false" class="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm" >Cancel</button>
                          </div>
                        </div>

                        
                        <button @click="newRoleModal = false" class="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-0 focus:outline-none " aria-label="close modal" role="button">
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
        

        <!-- Edit Role Modal -->
        <div v-show="editRoleModal">
            <div class="py-12 bg-transparent transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
                <div role="alert" class="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                    <div class="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-200">
                        <div class="w-full flex justify-start text-gray-600 mb-3 py-6 px-2">
                            <i class="fa-solid fa-user fa-2xl"></i>
                        </div>
                        <h1 class="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Edit Role Details</h1>
                        <div class="space-y-5">
                          <div  v-if="errors_exist" class="bg-red-100 rounded-md text-red-400 border border-red-200 p-4">
                            <div class="text-sm font-semibold mb-2">Something went wrong</div> 
                            <div v-for="message in errors" class="text-xs items-center">
                                <span>
                                  {{ message[0] }}
                                </span>
                            </div>
                          </div>
                          <!-- name -->
                          <div>
                            <label for="name" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Name</label>
                            <input id="name" v-model="formEdit.name" class=" mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-500 font-normal w-full h-10 flex items-center px-4 text-sm border-gray-300 rounded border" placeholder="Jane Doe" />
                            
                          </div>
                          <!-- description -->
                          <div>
                            <label for="description" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Description</label>
                            <input id="description" v-model="formEdit.description" class="mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-500 font-normal w-full h-10 flex px-4 text-sm border-gray-300 rounded border" placeholder="A small description of new role"/>
                          
                          </div>

                          <!-- button -->
                          <div class="flex items-center justify-start w-full">
                            <button @click="update()" type="button" class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-500 rounded text-white px-8 py-2 text-sm">Save changes</button>
                            <button @click="editRoleModal = false" type="button" class="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm" >Cancel</button>
                          </div>
                        </div>

                        
                        <button @click="editRoleModal = false" class="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-0 focus:outline-none " aria-label="close modal" role="button">
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
                roles: [],
                form: {
                    name: null,
                    description: null,
                },
                formEdit: {
                    name: null,
                    description: null,
                },
                selectedId: null,
                errors: {},
                errors_exist: false,
                newRoleModal: false,
                editRoleModal: false,
            }
        },
        mounted() {
            axios
            .get('roles')
            // .then(response => (console.log(response.data)))
            .then(response => (this.roles = response.data))
        },
        methods: {
          async submit() {
            const xy = this
            await axios.post('roles', this.form)
            .then(function (response) {
                xy.newRoleModal = false
                let new_role = response.data.data
                xy.roles.push(new_role as never)
                xy.form.name = null
                xy.form.description = null
                xy.clearErrors()
            })
            .catch(function (error) {
                if (error.response) {
                    xy.errors = error.response.data.errors
                    xy.errors_exist = true
                }
            })
          },
          edit(item:any) {
              const xy = this
              xy.editRoleModal = true
              xy.formEdit.name = item.name
              xy.formEdit.description = item.description
              xy.selectedId = item.id
          },
          remove(item:any,index:any) {
              const xy = this;
              axios.delete(`roles/${item.id}`)
              .then(function (response) {
                  xy.roles.splice(index,1);
              })
              .catch(function (error) {
                  console.log(error);
              });
          },
          update() {
              const xy = this;
              axios.put(`roles/${xy.selectedId}`, this.formEdit)
              .then(function (response) {
                  xy.editRoleModal = false
                  xy.clearErrors()
                  location.reload();
              })
              .catch(function (error) {
                  console.log(error.response);
                  if (error.response) {
                      xy.errors = error.response.data.errors;
                      xy.errors_exist = error.response.data.message;
                  }
              });
          },
          clearErrors() {
            const xy = this 
            xy.errors = {}
            xy.errors_exist = false
          },
        }
    })
</script>
