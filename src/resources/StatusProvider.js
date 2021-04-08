import HttpRequest from './HttpRequest'
import { getAuthToken } from '@/utils/js/Auth'
export default class StatusProvider extends HttpRequest {
    getStatusTasks () {
        this.setHeader(getAuthToken())
        return this.get(`/statustask?sortBy=id&sortOrder=ASC`)
        // return this.get(`/statustask?${query}`)

    }
    
    getStatusTasksById (id) {
        this.setHeader(getAuthToken())
        return this.get(`/statustask/${id}`)
    }

    updateStatusTaskBar (id, payload) {
        this.setHeader(getAuthToken())
        return this.put(`/statustask/${id}`, payload)
    }

    deleteStatusTaskBar (id) {
        this.setHeader(getAuthToken())
        return this.delete(`/statustask?id=${id}`)
    }
    createStatusTaskBar (payload) {
        this.setHeader(getAuthToken())
        return this.post(`/statustask`, payload)
      }
}