import type { UserStatus } from '../types'
import type { User } from '../types'

export const userBody: User = {
    name: '',
    password: '',
    phoneNumber: '',
    role: 0,
}

export const userRole: UserStatus[] = [
    {
        value: 1,
        title: 'مدير',
        color: 'primary',
    },
    {
        value: 2,
        title: 'عضو',
        color: 'success',
    },
]
export const genders = [
    {
        label: 'ذكر',
        value: 0,
        color: 'success',
    },
    {
        label: 'انثى',
        value: 1,
        color: 'warning',
    },
]
