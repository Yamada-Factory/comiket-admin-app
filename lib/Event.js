import Api from './APIUtil'

class Event {
  constructor() {
    this.api = new Api()
  }

  async get(params = {}) {
    return await this.api.get('/event?' + new URLSearchParams(params).toString()).then((response) => {
      return response.data
    })
  }

  async getCircle(eventId, params = {}) {
    return await this.api.get('/event/' + String(eventId) + '/circle?' + new URLSearchParams(params).toString()).then((response) => {
      return response.data
    })
  }
}

export default new Event()
