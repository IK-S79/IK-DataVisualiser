import fastify from 'fastify';

const Fastify = fastify({
    logger: true
});

interface IQuerystring {
    username: string;
    password: string;
}

interface IHeaders {
    'h-Custom': string;
}

// Authentication route example
Fastify.get<{ Querystring: IQuerystring, Headers: IHeaders }>('/auth', {
    preValidation: (request, reply, done) => {
        const {username, password} = request.query
        done(username !== 'admin' ? new Error('Must be admin') : undefined) // only validate `admin` account
    }
}, async (request, reply) => {
    const customerHeader = request.headers['h-Custom']
    // do something with request data

    return `logged in!`
})

Fastify.get('/', async () => {
    return {hello: 'fastify'}
})

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