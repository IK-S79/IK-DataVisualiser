import * as Fastify from 'fastify'
import {Error, Record, Records} from "airtable";

const airtable = require('airtable');
const base = new airtable({apiKey: 'keyJqUAOTD2NolCLF'}).base('appm8f92LjQairrC2');

class Player {
    Alliance: string | '';
    TroopPower: number | 0;
    TechContributions: number | 0;
    HighestPower: number | 0;
    Defeat: number | 0;
    DismantleDurability: number | 0;
    Rank: string | '';
    NameOverride: string | '';
    NameInterpreted: string | '';

    constructor(Alliance: string, TroopPower: number, TechContributions: number, HighestPower: number, Defeat: number, DismantleDurability: number, Rank: string, NameOverride: string, NameInterpreted: string) {
        this.Alliance = Alliance;
        this.TroopPower = TroopPower;
        this.TechContributions = TechContributions;
        this.HighestPower = HighestPower;
        this.Defeat = Defeat;
        this.DismantleDurability = DismantleDurability;
        this.Rank = Rank;
        this.NameOverride = NameOverride;
        this.NameInterpreted = NameInterpreted;
    }
}

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
            let playerCache: Player[] = [];
            let records = await base('Players').select({view: "Grid view"}).all();

            // TODO: The alliance is a reference to the Alliances table, not the actual name of the alliance, fix this
            records.forEach(function (record: Record<any>) {
                let player = new Player(
                    record.get('Alliance'),
                    record.get('Troop Power'),
                    record.get('Tech Contributions'),
                    record.get('Highest Power'),
                    record.get('Defeat'),
                    record.get('Dismantle Durability'),
                    record.get('Rank'),
                    record.get('NameOverride'),
                    record.get('NameInterpreted'));

                playerCache.push(player);
            })

            reply.type('application/json');
            reply.send(playerCache);
        }
    }

    fastify.route(options);
}

module.exports = PlayerDataRequest;