'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({strapi}) {
    const extensionService = strapi.plugin('graphql').service('extension')
    extensionService.use(() => ({
      typeDefs: `
       type RandomUser {
         email: String
         username: String
         password: String
       }
       type SiteData {
        title: String
        description: String
        images: [String]
        duration: Int
        domain: String
        url: String
       }
       extend type Query {
        randomUser: RandomUser
        siteData(url:String): SiteData
       }
       `,
      resolvers: {
        Query: {
          randomUser: {
            description: 'Return a random user',
            resolve: () =>
              strapi.plugin('users-permissions').controllers.auth.random()

          },
          siteData: {
            description: 'Return url\'s metadatas',
            resolve: (parent, args) => strapi.service("api::site.site").getSiteData(args.url)
          }
        },
      },

      resolversConfig: {
        'Query.randomUser': {
          auth: {
            scope: ['plugin::users-permissions.auth.random']
          }
        }
      }
    }))
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {
  },
};
