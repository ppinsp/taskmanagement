import HttpRequest from './HttpRequest'
import { getAuthToken } from '@/utils/js/Auth'
export default class CompanyProvider extends HttpRequest {
    getCompany () {
        this.setHeader(getAuthToken())
        return this.get(`/company`)
    }
    createCompany (payload) {
        this.setHeader(getAuthToken()) //เข้าใช้ api 
      return this.post(`/company`, payload)
      }
      getAllCompany (query) {
        this.setHeader(getAuthToken())
        return this.get(`/company?${query}`)
      }
      getCompanyById (id) {
        this.setHeader(getAuthToken())
        return this.get(`/company/${id}`)
      }
    // getStatusTasksById (id) {
    //     this.setHeader(getAuthToken())
    //     return this.get(`/statustask/${id}`)
    // }

    // updateStatusTaskBar (id, payload) {
    //     this.setHeader(getAuthToken())
    //     return this.put(`/statustask/${id}`, payload)
    // }

    deleteCompanyById(id) {
        this.setHeader(getAuthToken())
        return this.delete(`/company?id=${id}`)
    }
    // createStatusTaskBar (payload) {
    //     this.setHeader(getAuthToken())
    //     return this.post(`/statustask`, payload)
    //   }
}