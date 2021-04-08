import HttpRequest from './HttpRequest'
import { getAuthToken } from '@/utils/js/Auth'
export default class RequirementProvider extends HttpRequest {
    updateRequirement (id, payload) {
        this.setHeader(getAuthToken())
        return this.put(`/requirements/${id}`, payload)
    }

    getRequirementByUserId (id) {
        this.setHeader(getAuthToken())
        return this.get(`/requirements/getRequirement/${id}`)
    }

    getReqInprogress (id) {
        this.setHeader(getAuthToken())
        return this.get(`requirements/reqInpro/${id}`)
    }

    getReqDone (id) {
        this.setHeader(getAuthToken())
        return this.get(`requirements/reqDone/${id}`)
    }

    getPrepo(id){
        this.setHeader(getAuthToken())
        return this.get(`requirements/reqPrepo/${id}`)
    }

    getTesting(id){
        this.setHeader(getAuthToken())
        return this.get(`requirements/reqTesting/${id}`)
    }

    getRepair(id){
        this.setHeader(getAuthToken())
        return this.get(`requirements/reqRepair/${id}`)
    }
}