const fastify = require('fastify')({logger: true});
const base = require('airtable').base('appm8f92LjQairrC2') // TODO: Extract base ID to separate file
require('classes')

async function getAllianceData() {
    let recordsCache = new AllianceRecords();
    let records = await base('Alliances').select({view: "Grid view"}).all();

    records.forEach(function(record) {
        if (record.get('Name') === 'FASY') {
            recordsCache.RecordList.push(new AllianceRecord(record));
        }
    });

    return recordsCache;
}

fastify.route({
    method: 'GET',
    url: '/',
    schema: {
        querystring: {
            name: {type: 'string'}
        },
        // the response needs to be an object with an `hello` property of type 'string'
        response: {
            200: {
                type: 'object',
                properties: {
                    hello: {type: 'string'}
                }
            }
        }
    },
    // this function is executed for every request before the handler is executed
    preHandler: async () => {
        // E.g. check authentication
    },
    handler: async () => {
        let allianceRecords = await getAllianceData();

        return allianceRecords.toString();
    }
})

const start = async () => {
    try {
        await fastify.listen(3000)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()