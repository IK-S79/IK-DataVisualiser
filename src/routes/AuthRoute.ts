import * as Fastify from 'fastify'

type AuthRequest = Fastify.FastifyRequest<{
    Querystring: {
        username: string,
        password: string
    };
}>

async function authRoute (fastify: Fastify.FastifyInstance) {
    const options: Fastify.RouteOptions = {
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
        // @ts-ignore TODO: Figure out why this is causing trouble when removing ts-ignore
        preValidation: async function(request: AuthRequest, reply, done) {
            const {username, password} = request.query;
            done(username !== 'admin' ? new Error('Must be admin') : undefined) // only validate `admin` account
        },
        handler: async function() {
            return 'Logged in!'
        }
    }

    fastify.route(options);
}

module.exports = authRoute;