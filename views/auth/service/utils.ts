import type { AuthStatus } from '../types'
import type { Auth } from '../types'

const registerBody = ref<Auth>({
    password: '',
    email: '',
    fullName: '',
    role: 1,
    phoneNumber: '',
    birthDay: new Date(),
    gender: 0,
})
