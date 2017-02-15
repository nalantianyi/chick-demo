/**
 * Created by nalantianyi on 2017/2/15.
 */
module.exports = {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || (process.env.NODE_ENV === 'production' ? 8080 : 3000),
    apiHost: process.env.APIHOST || 'localhost',
    apiPort: process.env.APIPORT || 3030,
    app: {
        title: 'Chick Development Platform',
        description: 'React Redux Development Platform',
        head: {
            titleTemplate: 'Chick:%s',
            meta: [
                {
                    name: 'description',
                    content: 'Chick Development Platform'
                },
                {charset: 'utf-8'}
            ]
        }
    }
};