import {defineStore} from 'pinia'

export const useAccountStore = defineStore('account', {
    state: () => ({
        token: '123',
        reFreshToken: '123',
        username: 'bigold'
    }),
    getters: {
        userInfo: (state) => {
            userName:state.username
        }
    },
    actions: {
        SET_USER_INFO() {
            this.token = 'testToken'
            this.reFreshToken = 'testToken'
            this.username = 'BigOld'
        }
    }
})
