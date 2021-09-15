import * as Fastify from 'fastify';

async function loginRoute (fastify: Fastify.FastifyInstance) {
    fastify.get('/login', async (request, reply) => {
        reply.type('text/html')

        const fs = require('fs');
        const stream = fs.createReadStream('./src/pages/login.html', 'utf8');

        return stream;
    })
}

module.exports = loginRoute;