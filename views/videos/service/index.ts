import { AppClient } from '~/services/app-client'
import type { Video } from '../types'
import type { PaginatedResponse } from '~/utils/types/ApiResponses'
import { FileUploaderClient } from '~/services/app-client/FileUploader'

interface IVideosService {
    getAll(params: any): Promise<PaginatedResponse<Video>>
    getSingle(id: string): Promise<Video>
    create(video: Video): Promise<Video>
    delete(id: string): Promise<void>
    update(id: string, video: Video): Promise<void>
    getFilePath(file: FileList): Promise<string>
}

export class VideosService implements IVideosService {
    apiService: AppClient<Video>
    apiFileService: FileUploaderClient
    constructor() {
        this.apiService = new AppClient<Video>()
        this.apiFileService = new FileUploaderClient()
    }
    async getAll(params: any): Promise<PaginatedResponse<Video>> {
        const response = await this.apiService.get('/video', null, params)
        return response.data as PaginatedResponse<Video>
    }

    async getSingle(id: string): Promise<Video> {
        const response = await this.apiService.get('/video', id)
        return response.data as Video
    }

    async delete(id: string): Promise<void> {
        await this.apiService.delete('/video', id)
    }
    async create(video: Video): Promise<Video> {
        if (video.file) {
            const file = await this.getFilePath(video.file as FileList)
            video.file = file
        }
        const response = await this.apiService.post('/video', video)
        return response.data
    }

    async update(id: string, video: Video): Promise<void> {
        if (video.file instanceof FileList) {
            const file = await this.getFilePath(video.file as FileList)
            video.file = file
        }
        await this.apiService.put('/video' + '/' + id, video)
    }

    async getFilePath(file: FileList): Promise<string> {
        return await this.apiFileService.post(file)
    }
}
