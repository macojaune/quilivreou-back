const axios = require('axios')

module.exports = plugin => {
  plugin.controllers.auth.random = async (ctx) => {
    // get random username/email
    try {
      const {data: {results}} = await axios.get('https://randomuser.me/api/?inc=login&nat=fr&password=upper,lower,number,8-64')
      const {username, password} = results[0].login
      return {username, password, email: username + "@random-user.quilivreou.fr"}
    } catch (e) {
      console.error(e)
    }
  }

  plugin.routes['content-api'].routes.unshift({
    method: 'GET',
    path: '/users/random',
    handler: 'auth.random',
    config: {prefix: '', policies: []}
  })

  return plugin
}
