import Api from './APIUtil'
import conf from './config'

class Circle {
  constructor() {
    console.log(conf.API_BASE_URI)
    this.api = new Api()
  }

  async get(params = {}) {
    return await this.api.get('/circle?' + new URLSearchParams(params).toString()).then((response) => {
      return response.data
    })
  }
}

export default new Circle()
