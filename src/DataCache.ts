const airtable = require('airtable');
const base = new airtable({apiKey: 'keyJqUAOTD2NolCLF'}).base('appm8f92LjQairrC2');

import {Player} from './types/Player'
import {Record} from "airtable";

// For now, this cache uses separate containers for every category of data the database has to offer
// Ideally, we'd like to be able to store data with a key, and to retrieve some data, we pass in the key,
// just to make it easier to pull the required data
// TODO: Determine if this is a good idea or not
class DataCache {
    public IsCacheAvailable: boolean;

    // Singleton
    private static _instance: DataCache = new this();
    private _timerID: any;

     // private readonly _allianceCache: any[];
    private readonly _playerCache: Player[];

    private constructor() {
        this.IsCacheAvailable = true;
        // this._allianceCache = [];
        this._playerCache = [];

        // When first starting the server, we want to construct our cache right away
        this.UpdateDataCache().then();

        DataCache.Log("Constructor has been called...");
        this._timerID = setInterval(async () => {
            DataCache.Log("Timer...");
            await this.UpdateDataCache();
        }, 1800000); // TODO: Pull update rate from an external file
    }

    // Singleton
    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    public get PlayerCache() {
        return this._playerCache;
    }

    // How do we store data on the database?
    // Per IK server, per alliance, all players in a table, all alliances in another table etc?
    public async UpdateDataCache() {
        this.IsCacheAvailable = false;
        DataCache.Log("Started updated data cache...");

        // TODO: Consider not awaiting these individual calls, simply store the promises and await them at the end
        await this.FetchPlayerData();
        await this.FetchAllianceData();

        this.IsCacheAvailable = true;
        DataCache.Log("Finished updating data cache.");
    }

    private static Log(message: string) {
        console.log(message);
    }

    private static LogError(message: string) {
        console.error(message);
    }

    private async FetchPlayerData() {
        DataCache.Log("Started fetching player data...")

        // TODO: Check if this is faster / slower than doing the paginating manually
        let records = await base('Players').select({view: "Grid view"}).all();

        // TODO: The alliance is a reference to the Alliances table, not the actual name of the alliance, fix this
        records.forEach((record: Record<any>) => {
            let player = new Player(
                record.get('frmAlliance'),
                record.get('Troop Power'),
                record.get('Tech Contributions'),
                record.get('Highest Power'),
                record.get('Defeat'),
                record.get('Dismantle Durability'),
                record.get('Rank'),
                record.get('NameOverride'),
                record.get('NameInterpreted'));

            this._playerCache.push(player);
        })

        DataCache.Log("Finished fetching player data.")
    }

    private async FetchAllianceData() {

    }
}

export {DataCache}