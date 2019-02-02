// npm i hapi

const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDB = require('./db/mongodb/mongodb')
const HeroiSchema = require('./db/mongodb/schemas/heroSchema')
const HeroRoute = require('./routers/heroRoutes')


const app = new Hapi.Server({
    port:5000
})

function mapRoutes(instance, methods){
    return methods.map( method => instance[method]())
}

async function main() {
    const connection = MongoDB.connect()
    const context = new Context(new MongoDB(connection, HeroiSchema))


    app.route([
        ...mapRoutes(new HeroRoute(context), HeroRoute.methods())    
    ])


    await app.start()
    console.log("serivdor rodando na porta ", app.info.port)
    return app;
}

module.exports = main()