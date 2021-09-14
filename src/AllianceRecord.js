exports.AllianceRecord = class {
    constructor(record) {
        this.Name = record.get('Name');
        this.TroopPower = record.get('TroopPower');
        this.__Record = record
    }

    toString() {
        return this.Name + ' - ' + this.TroopPower + '\n';
    }
}