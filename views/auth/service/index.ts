import { AppClient } from '~/services/app-client'
import type { Auth } from '../types'

interface IAuthsService {
    login(Auth: Auth): Promise<Auth>
    register(Auth: Auth): Promise<Auth>
}

export class AuthsService implements IAuthsService {
    apiService: AppClient<Auth>
    constructor() {
        this.apiService = new AppClient<Auth>()
    }
    // async login(auth: Auth): Promise<Auth> {
    //     const response = await this.apiService.post('/auth/login', auth)
    //     return response.data
    // }

    async register(auth: Auth): Promise<Auth> {
        const response = await this.apiService.post('/auth/register', auth)
        return response.data
    }

}
