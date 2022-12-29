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

  async getGenre(eventId) {
    return await this.api.get('/event/options?column=genre&event_id=' + String(eventId))
      .then((response) => {
        return response.data
    })
  }

  async getHall(eventId) {
    return await this.api.get('/event/options?column=hall&event_id=' + String(eventId))
      .then((response) => {
        return response.data
    })
  }

  async getBlock(eventId) {
    return await this.api.get('/event/options?column=block&event_id=' + String(eventId))
      .then((response) => {
        return response.data
    })
  }

  async getSpace(eventId) {
    return await this.api.get('/event/options?column=space&event_id=' + String(eventId))
      .then((response) => {
        return response.data
    })
  }
}

export default new Event()
