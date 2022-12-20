import axios from 'axios'
import conf from './config'

export default class ApiUtils {
  constructor(headers = {}) {
    const BASE_API = conf.API_BASE_URI

    this.api = axios.create({
      baseURL: BASE_API,
      headers,
    })
  }

  get(path, params = {}) {
    params._ = Date.now()
    return this.api.get(path, { params })
  }

  post(path, params = {}) {
    return this.api.post(path, { params })
  }
}
