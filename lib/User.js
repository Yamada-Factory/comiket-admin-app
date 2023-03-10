import Api from './APIUtil'
import conf from './config'
import CookieStorage from './CookieStorage'

class User {
  constructor() {
    this.init()
  }

  init() {
    this.cookies = CookieStorage

    const headers = {
      'Authorization': 'Bearer ' + this.cookies.get(conf.API_BEARER_TOKEN_KEY)
    }

    this.authApi = new Api(headers)
  }

  async getUserInfo() {
    this.init()

    return await this.authApi.get('/auth/user')
      .then(response => {
        return response.data
      }).catch (error => {
        return error.response
      })
  }

  async searchFavoriteCircles(eventId, params = {}) {
    return await this.authApi.get('/auth/user/favorite/event/'+ String(eventId) +'/search?' + new URLSearchParams(params).toString(), {})
      .then((response) => {
        return response.data
      }).catch(error => {
        console.log(error.response)

        return error.response
      })
  }

  async getFavoriteCircles(params = {}) {
    return await this.authApi.get('/auth/user/favorite?' + new URLSearchParams(params).toString(), {})
      .then((response) => {
        return response.data
      }).catch(error => {
        console.log(error.response)

        return error.response
      })
  }

  async updateFavoriteCircle(params = []) {
    return await this.authApi.put('/auth/user/favorite', params)
      .then((response) => {
        return response.data
      }).catch(error => {
        console.error(error)

        return error.response
      })
  }

  async getFavoriteCircleDetail(circleId, params = {}) {
    return await this.authApi.get('/auth/user/favorite/' + String(circleId) + '?', {})
      .then((response) => {
        return response.data
      }).catch(error => {
        console.log(error.response)

        return error.response
      })
  }

  async getFavoriteCirlceEvent(eventId, params = {}) {
    return await this.authApi.get('/auth/user/favorite/event/' + String(eventId) + '?', {})
      .then((response) => {
        return response.data
      }).catch(error => {
        console.log(error.response)

        return error.response
      })
  }

  async addFavoriteCircleEvent(eventId, params = {}) {
    return await this.authApi.post('/auth/user/favorite/event/' + String(eventId), params)
      .then((response) => {
        return response.data
      }).catch(error => {
        console.log(error.response)

        return error.response
      })
  }

  async updateFavoriteCircleEvent(eventId, params = []) {
    return await this.authApi.put('/auth/user/favorite/event/' + String(eventId), params)
      .then((response) => {
        return response.data
      }).catch(error => {
        console.error(error)

        return error.response
      })
  }

}

export default new User()
