americano = require 'americano'
path = require 'path'
fs = require 'fs'

publicPath = "#{__dirname}/../client/public"
staticMiddleware = americano.static publicPath, maxAge: 86400000


console.log "***************************************************************"
console.log __dirname
viewsDir = path.resolve __dirname, 'views'
useBuildView = fs.existsSync path.resolve viewsDir, 'index.js'
console.log useBuildView

publicStatic = (req, res, next) ->

    # Allows assets to be loaded from any route
    detectAssets = /\/(stylesheets|javascripts|images|fonts)+\/(.+)$/
    assetsMatched = detectAssets.exec req.url

    if assetsMatched?
        req.url = assetsMatched[0]

    staticMiddleware req, res, (err) -> next err

module.exports =

    common:
        use: [
            staticMiddleware
            publicStatic
            americano.bodyParser keepExtensions: true
        ]
        afterStart: (app, server) ->
            app.use americano.errorHandler
                dumpExceptions: true
                showStack: true

        set:
            'view engine': if useBuildView then 'js' else 'jade'
            'views': viewsDir

        engine:
            js: (path, locales, callback) ->
                callback null, require(path)(locales)


    development: [
        americano.logger 'dev'
    ]

    production: [
        americano.logger 'short'
    ]

    plugins: [
        'cozydb'
    ]

