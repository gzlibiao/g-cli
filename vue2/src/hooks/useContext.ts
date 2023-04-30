import {getCurrentInstance} from 'vue'

export function useContext() {
    const {proxy} = getCurrentInstance() as { proxy: Vue }
    return {router: proxy.$router, route: proxy.$route, proxy}
}
