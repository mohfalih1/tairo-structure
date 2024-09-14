import axios from 'axios'
import { useAppToaster } from '../toaster/toaster'

export const baseURL = 'https://66e20e92c831c8811b571102.mockapi.io/'
const axiosIns = axios.create({
    baseURL: `${baseURL}api`,
})
const router = useRouter()

axiosIns.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken')

    config.headers = config.headers || {}
    config.headers['Accept-Language'] = 'ar'
    config.headers.Authorization = token ? `Bearer ${token}` : ''

    return config
})

// ℹ️ Add response interceptor to handle 401 response

axiosIns.interceptors.response.use(
    (response) => {
        // Check for post, put, delete methods and status 200
        if (response.status === 200) {
            switch (response.config.method) {
                case 'post':
                    useAppToaster().show('success', 'تمت إضافة البيانات بنجاح')
                    break
                case 'put':
                    useAppToaster().show(
                        'success',
                        'تم التعديل بنجاح، ونراقب النتائج للتأكد من سير الأمور بشكل صحيح.'
                    )
                    break
                case 'delete':
                    useAppToaster().show('success', 'تم حذف البيانات بنجاح')
                    break
                default:
                    break
            }
        }
        return response
    },
    (error) => {
        console.log(error)
        // Handle error
        useAppToaster().show(
            'danger',
            'هناك خطأ ما في هذا الأمر يتطلب التحقق منه وإصلاحه'
        )
        if (error.response.status === 401) {
            // ℹ️ Logout user and redirect to login page
            // Remove "userData" from localStorage
            localStorage.removeItem('userData')

            // Remove "accessToken" from localStorage
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userAbilities')
            // router.push('/login')
        }
    }
)

export default axiosIns
