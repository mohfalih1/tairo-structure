import { AppClient } from '~/services/app-client'
import { FileUploaderClient } from '~/services/app-client/FileUploader'
import type { Ad } from '../types'
import type { PaginatedResponse } from '~/utils/types/ApiResponses'

interface IAdsService {
    getAll(params: any): Promise<PaginatedResponse<Ad>>
    getSingle(id: string): Promise<Ad>
    create(ad: Ad): Promise<Ad>
    delete(id: string): Promise<void>
    update(id: string, ad: Ad): Promise<void>
    getFilesPath(file: FileList): Promise<string[]>
}

export class AdsService implements IAdsService {
    apiService: AppClient<Ad>
    apiFileService: FileUploaderClient
    constructor() {
        this.apiService = new AppClient<Ad>()
        this.apiFileService = new FileUploaderClient()
    }
    async getAll(params: any): Promise<PaginatedResponse<Ad>> {
        const response = await this.apiService.get('/ads', null, params)
        return response.data as PaginatedResponse<Ad>
    }

    async getSingle(id: string): Promise<Ad> {
        const response = await this.apiService.get('/ads', id)
        return response.data as Ad
    }

    async delete(id: string): Promise<void> {
        try {
            await this.apiService.delete('/ads', id)
        } catch (e) {
            throw new Error()
        }
    }
    async create(ad: Ad): Promise<Ad> {
        try {
            if (ad.file) {
                const file = await this.getFilesPath(ad.file as FileList)
                ad.file = file
            }
            const response = await this.apiService.post('/ads', ad)
            return response.data
        } catch (e) {
            throw new Error()
        }
    }

    async update(id: string, ad: Ad): Promise<void> {
        try {
            if (ad.file instanceof FileList) {
                console.log(ad.file);
                
                const file = await this.getFilesPath(ad.file as FileList)
                ad.file = file
            }
            await this.apiService.put('/ads' + '/' + id, ad)
        } catch (e) {
            throw new Error()
        }
    }

    async getFilesPath(file: FileList): Promise<string[]> {
        try {
            return await this.apiFileService.postMulti(file)
        } catch (e) {
            throw new Error()
        }
    }
}
