const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('data.json')
const middlewares = jsonServer.defaults()

router.render = (request, response) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', '*');
    response.header('Access-Control-Request-Headers', '*');
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.header('Access-Control-Request-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    if (Array.isArray(response.locals.data)) {
        response.json({
            status: 200,
            success: true,
            data: {
                items: result,
                _links: req.url,
                _meta: {
                    currentPage: 1,
                    page: 1,
                    limitPerPage: 100,
                    totalPages: 100,
                    countPerPage: 100,
                    countTotal: 1000
                }
            }
        })
    } else {
        response.json({
            status: 200,
            success: true,
            data: response.locals.data
        })
    }
}

server.post('/api/user/:id', (request, response) => {
    response.json({
        status: 200,
        success: true
    })
})

server.use(jsonServer.bodyParser)
server.use((request, response, next) => {
    if (request.method === 'POST') {
        request.body.created_at = 1554076800
        request.body.updated_at = 1554076800
    }
    // Continue to JSON Server router
    next()
})

server.use(jsonServer.rewriter({
    '/api/user': '/user',
    '/api/user/:id': '/user/:id',
}))

server.use(middlewares)
server.use(router)
server.listen(3000, '0.0.0.0', () => {
    console.log('JSON Server is running')
})
