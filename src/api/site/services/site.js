'use strict';

const axios = require("axios");
/**
 * site service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::site.site',({strapi})=>({
     async getSiteData(url){
       try {
            const {data}= await axios.get(`https://jsonlink.io/api/extract?url=${url}`)

                             return data
          } catch (e) {
            console.error(e)
          }
     }
}));
