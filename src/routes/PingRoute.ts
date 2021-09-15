async function pingRoute (fastify: any, options: any) {
    fastify.get('/ping', async (request: any, reply: any) => {
        return 'Pong!'
    })
}

module.exports = pingRoute;