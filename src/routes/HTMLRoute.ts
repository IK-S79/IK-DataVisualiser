import * as Fastify from 'fastify';

async function htmlRoute (fastify: Fastify.FastifyInstance) {
    fastify.get('/html', async (request, reply) => {
        reply.type('text/html')

        const fs = require('fs');
        const stream = fs.createReadStream('./src/pages/test.html', 'utf8');

        return stream;
    })
}

module.exports = htmlRoute;