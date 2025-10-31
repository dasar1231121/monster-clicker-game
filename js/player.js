// Player management
const Player = {
    level: 1,
    hp: 100,
    maxHp: 100,
    baseDamage: 10,
    gold: 0,
    diamonds: 0,
    wave: 1,
    kills: 0,
    totalKills: 0,
    prestigePoints: 0,
    selectedClass: null,
    skillPoints: 0,
    
    upgrades: {
        damage: 0,
        health: 0,
        goldBonus: 0,
        critChance: 0,
        critDamage: 0
    },
    
    prestigeUpgrades: {
        damageMulti: 0,
        goldMulti: 0,
        xpMulti: 0
    },
    
    init() {
        this.maxHp = this.getMaxHp();
        this.hp = this.maxHp;
    },
    
    getDamage() {
        let damage = this.baseDamage;
        damage += this.upgrades.damage * 5;
        damage *= (1 + this.prestigeUpgrades.damageMulti * 0.1);
        if (typeof Buffs !== 'undefined' && Buffs.isActive('damage')) {
            damage *= 2;
        }
        return Math.floor(damage);
    },
    
    getMaxHp() {
        let hp = 100;
        hp += this.upgrades.health * 20;
        return hp;
    },
    
    getCritChance() {
        return Math.min(this.upgrades.critChance * 5, 75);
    },
    
    getCritMultiplier() {
        return 2 + this.upgrades.critDamage * 0.5;
    },
    
    getGoldMultiplier() {
        let multi = 1 + this.upgrades.goldBonus * 0.2;
        multi *= (1 + this.prestigeUpgrades.goldMulti * 0.15);
        if (typeof Buffs !== 'undefined' && Buffs.isActive('gold')) {
            multi *= 2;
        }
        return multi;
    },
    
    heal(amount) {
        this.hp = Math.min(this.hp + amount, this.maxHp);
    },
    
    takeDamage(amount) {
        this.hp = Math.max(0, this.hp - amount);
        if (this.hp === 0) {
            this.die();
        }
    },
    
    die() {
        this.wave = Math.max(1, this.wave - 1);
        this.kills = 0;
        this.maxHp = this.getMaxHp();
        this.hp = this.maxHp;
        if (typeof Enemy !== 'undefined') Enemy.spawn();
    },
    
    addGold(amount) {
        this.gold += Math.floor(amount * this.getGoldMultiplier());
    },
    
    addDiamonds(amount) {
        this.diamonds += amount;
    },
    
    addKill() {
        this.kills++;
        this.totalKills++;
        if (typeof Achievements !== 'undefined') {
            Achievements.check();
        }
    },
    
    nextWave() {
        this.wave++;
        this.kills = 0;
        this.heal(this.maxHp * 0.5);
    },
    
    canPrestige() {
        return this.wave >= 10;
    },
    
    doPrestige() {
        if (!this.canPrestige()) return false;
        const points = Math.floor(this.wave / 5);
        this.prestigePoints += points;
        this.level = 1;
        this.wave = 1;
        this.kills = 0;
        this.gold = 0;
        this.maxHp = 100;
        this.hp = 100;
        for (let key in this.upgrades) {
            this.upgrades[key] = 0;
        }
        return true;
    }
};
