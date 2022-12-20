import Api from './APIUtil'

class Circle {
  constructor() {
    this.api = new Api()
  }

  async get(params = {}) {
    return await this.api.get('/circle?' + new URLSearchParams(params).toString()).then((response) => {
      return response.data
    })
  }
}

export default new Circle()
