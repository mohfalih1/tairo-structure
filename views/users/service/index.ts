import { AppClient } from "~/services/app-client"
import type { User } from "../types"
import type { PaginatedResponse } from "~/utils/types/ApiResponses"

interface IUsersService {
    getAll(params: any): Promise<PaginatedResponse<User>>
    getSingle(id: string): Promise<User>
    create(user: User): Promise<User>
    delete(id: string): Promise<void>
    update(id: string, user: User): Promise<void>
}

export class UsersService implements IUsersService {
    apiService: AppClient<User>;
    constructor() {
        this.apiService = new AppClient<User>()
    }
    async getAll(params: any): Promise<PaginatedResponse<User>> {
        const response = await this.apiService.get('/users', null, params)
        return response.data as PaginatedResponse<User>
    }

    async getSingle(id: string): Promise<User> {
        const response = await this.apiService.get('/users', id)
        return response.data as User
    }

    async delete(id: string): Promise<void> {
        await this.apiService.delete('/users', id)
    }
    async create(user: User): Promise<User> {
        const response = await this.apiService.post('/auth/register', user)
        return response.data
    }

    async update(id: string, User: User): Promise<void> {
        await this.apiService.put('/auth' + '/' + id, User)
    }

    async updatePass(User: User): Promise<void> {
        await this.apiService.put('/auth/changepassword', User)
    }
}
