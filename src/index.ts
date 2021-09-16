import fastify from 'fastify';

const Fastify = fastify({
    logger: true
});

Fastify.get('/', async (request, reply) => {
    reply.redirect('/login')
})

// Register ping route
Fastify.register(require('./routes/PingRoute'));
Fastify.register(require('./routes/AuthRoute'))
Fastify.register(require('./routes/LoginRoute'))
Fastify.register(require('./routes/DataRoute'))
Fastify.register(require('./routes/data/PlayerDataRequest'))

const start = async () => {
    try {
        await Fastify.listen(3000)
    } catch (err) {
        Fastify.log.error(err);
        process.exit(1);
    }
}

// noinspection JSIgnoredPromiseFromCall
start();