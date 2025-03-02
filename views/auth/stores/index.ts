import { useAppToaster } from '~/services/toaster/toaster'
import type { UserData } from '../types'
import type { User } from '../types'
import { AuthsService } from '../service'

const authsService = new AuthsService()
export const useAuthStore = defineStore('Auth-page', () => {
    const userData = computed<User>({
        get() {
            const userData = localStorage.getItem('userData')
            if (userData) return JSON.parse(userData)

            return {} as User
        },
        set(value) {
            localStorage.setItem('userData', JSON.stringify(value))
        },
    })

    const token = ref<string>()
    const router = useRouter()

    const user = ref<User>({} as User)
    const loading = ref(false)
    const toaster = useAppToaster()

    const login = async () => {
        loading.value = true
        try {
            const response = await authsService.login(user.value)
            console.log(response)
            if (response.role !== 1) {
                toaster.show('danger', 'المستخدمين غير مخولين بدخول النظام')
                return
            }
            localStorage.setItem('userData', JSON.stringify(response) as any)
            localStorage.setItem('accessToken', (response as any).token)
            router.push('/')
        } catch (e) {
            console.log(e)
        } finally {
            loading.value = false
        }
    }
    return {
        userData,
        token,
        user,
        loading,
        login,
    }
})
