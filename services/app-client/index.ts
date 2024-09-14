import type { AxiosResponse } from 'axios'
import axios from './axios'
import {
    type PaginatedResponse,
    type SingleObjectResponse,
} from '~/utils/types/ApiResponses'

interface IAppClient<T> {
    get: (
        url: string,
        id?: string,
        params?: Record<string, any>
    ) => Promise<AxiosResponse<PaginatedResponse<T> | SingleObjectResponse<T>>>
    post: (url: string, data: T) => Promise<AxiosResponse<T>>
    put: (url: string, data: T) => Promise<AxiosResponse<T>>
    delete: (url: string, id: string) => Promise<AxiosResponse<T>>
    deleteMulti: (url: string, idlist: T) => Promise<AxiosResponse<T>>
}

export class AppClient<T> implements IAppClient<T> {
    get(
        url: string,
        id?: string | null,
        params?: Record<string, any>
    ): Promise<AxiosResponse<PaginatedResponse<T> | SingleObjectResponse<T>>> {
        // if (params) {
        //     params.deleted = false
        // }
        if (id) url += '/' + id
        return axios.get<PaginatedResponse<T> | SingleObjectResponse<T>>(url, {
            params,
        }) as Promise<
            AxiosResponse<PaginatedResponse<T> | SingleObjectResponse<T>>
        >
    }

    post(url: string, data: T): Promise<AxiosResponse<T>> {
        return axios.post<T>(url, data)
    }

    put(url: string, data: T): Promise<AxiosResponse<T>> {
        return axios.put(url, data)
    }

    delete(url: string, id: string): Promise<AxiosResponse<any>> {
        return axios.delete(`${url}/${id}`)
    }

    deleteMulti(url: string, idlist): Promise<AxiosResponse<any>> {
        return axios.delete(url, {
            data: {
                customersId: idlist,
            },
        })
    }
}
