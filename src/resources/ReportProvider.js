import HttpRequest from './HttpRequest'
import { getAuthToken } from '@/utils/js/Auth'

export default class ReportProvider extends HttpRequest {

  createReport ( payload ){
    this.setHeader(getAuthToken())
    return this.post(`/report`, payload)
  }

  getReport () {
    this.setHeader(getAuthToken())
    return this.get(`/projects/report`)
  }

  getReportReq(id) {
    this.setHeader(getAuthToken())
    return this.get(`/requirements/getReport/${id}`)
  }


}