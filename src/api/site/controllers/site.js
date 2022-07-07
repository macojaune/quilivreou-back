'use strict';

/**
 *  site controller
 */

const {createCoreController} = require('@strapi/strapi').factories

module.exports = createCoreController('api::site.site', ({strapi}) => ({
  async getSiteData(ctx) {
    const {url} = ctx.params

    return strapi.service('api::site.site').getSiteData(url)
  }
}));
