import axios from 'axios'

export default {
    namespaced: true,

    state: {
        token: null,
        user: null,
    },

    getters: {
        authenticated (state:any) {
            return state.token && state.user
        },

        user (state:any) {
            return state.user
        }
    },

    mutations: {
        SET_TOKEN (state:any, token:any) {
            state.token = token
        },

        SET_USER (state:any, data:any) {
            state.user = data
        }
    },

    actions: {
        async login ({ dispatch }:any, credentials:any) {
            let response = await axios.post('auth/login', credentials)
            dispatch('attempt', response.data.token)
        },

        async attempt ({ commit, state }:any, token:any) {
            if(token) {
                commit('SET_TOKEN', token)
            }

            if (!state.token) {
                return
            }
            

            try {
                // let response = await axios.get('auth/profile', {
                //     headers: {
                //         'Authorization': 'Bearer ' + token
                //     }
                // })
                let response = await axios.get('auth/profile')
                commit('SET_USER', response.data)
            } catch (e) {
                commit('SET_TOKEN', null)
                commit('SET_USER', null)
            }
        }
    },
}
