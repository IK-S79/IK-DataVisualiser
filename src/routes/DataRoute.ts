import * as Fastify from 'fastify';

async function dataRoute (fastify: Fastify.FastifyInstance) {
    fastify.get('/data', async (request, reply) => {
        reply.type('text/html')

        const fs = require('fs');
        const stream = fs.createReadStream('./src/pages/data.html', 'utf8');

        return stream;
    })
}

module.exports = dataRoute;