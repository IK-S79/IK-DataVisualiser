import * as Fastify from 'fastify'
import {DataCache} from "../../DataCache";

async function PlayerDataRequest(fastify: Fastify.FastifyInstance) {
    const options: Fastify.RouteOptions = {
        method: 'GET',
        url: '/data/players',
        schema: {
            response: {
                200: {
                    type: 'array',
                    items: {
                        alliance: {type: 'string'},
                        troop_power: {type: 'number'},
                        tech_contributions: {type: 'number'},
                        highest_power: {type: 'number'},
                        defeat: {type: 'number'},
                        dismantle_durability: {type: 'number'},
                        rank: {type: 'string'},
                        name_override: {type: 'string'},
                        name_interpreted: {type: 'string'},
                    }
                }
            }
        },
        handler: async function (request, reply) {
            reply.type('application/json');
            reply.send(DataCache.Instance.PlayerCache);
        }
    }

    fastify.route(options);
}

module.exports = PlayerDataRequest;