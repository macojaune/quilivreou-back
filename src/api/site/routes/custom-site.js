module.exports = {
  routes:[
    {
      method: 'GET',
      path: '/sites/data/:url',
      handler:'site.getSiteData'
    }
  ]
}
