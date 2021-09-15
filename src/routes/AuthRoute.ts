async function authRoute (fastify, options) {
    // noinspection JSUnusedGlobalSymbols
    options = {
        method: 'GET',
        url: '/auth',
        schema: {
            querystring: {
                username: { type: 'string' },
                password: { type: 'string' }
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' }
                    }
                }
            }
        },
        preValidation: (request, reply, done) => {
            const {username, password} = request.query
            done(username !== 'admin' ? new Error('Must be admin') : undefined) // only validate `admin` account
        },
        handler: function(request, reply) {
            return 'Logged In!';
        }
    }

    fastify.route(options);
}

module.exports = authRoute;