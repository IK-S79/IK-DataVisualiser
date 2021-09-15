import * as Fastify from 'fastify';

async function pingRoute (fastify: Fastify.FastifyInstance) {
    fastify.get('/ping', async () => {
        return 'Pong!'
    })
}

module.exports = pingRoute;