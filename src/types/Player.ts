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

export {Player}
