export interface User {
    id?: number
    name?: string
    // email?: string
    role?: number | null
    phoneNumber?: string
    password?: string
    // birthDay?: Date
    // gender?: 0
}

export interface UserStatus {
    value: number
    title: string
    color: string
}
