import fastify from 'fastify';

const Fastify = fastify({
    logger: true
});

Fastify.get('/', async () => {
    return {hello: 'fastify'}
})

// Register ping route
Fastify.register(require('./routes/PingRoute'));
Fastify.register(require('./routes/AuthRoute'))
Fastify.register(require('./routes/HTMLRoute'))

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