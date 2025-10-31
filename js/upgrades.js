// Upgrade system
const Upgrades = {
    list: [
        {
            id: 'damage',
            name: 'Урон',
            description: 'Увеличивает базовый урон на 5',
            baseCost: 50,
            costMultiplier: 1.15,
            icon: '⚔️'
        },
        {
            id: 'health',
            name: 'Здоровье',
            description: 'Увеличивает максимальное HP на 20',
            baseCost: 40,
            costMultiplier: 1.12,
            icon: '❤️'
        },
        {
            id: 'goldBonus',
            name: 'Бонус золота',
            description: 'Увеличивает получаемое золото на 20%',
            baseCost: 100,
            costMultiplier: 1.2,
            icon: '💰'
        },
        {
            id: 'critChance',
            name: 'Шанс крита',
            description: 'Увеличивает шанс критического урона на 5%',
            baseCost: 200,
            costMultiplier: 1.25,
            icon: '💥'
        },
        {
            id: 'critDamage',
            name: 'Урон крита',
            description: 'Увеличивает множитель критического урона на 0.5x',
            baseCost: 300,
            costMultiplier: 1.3,
            icon: '🔥'
        }
    ],
    
    getCost(upgradeId) {
        const upgrade = this.list.find(u => u.id === upgradeId);
        if (!upgrade) return 0;
        const level = Player.upgrades[upgradeId] || 0;
        return Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, level));
    },
    
    canAfford(upgradeId) {
        return Player.gold >= this.getCost(upgradeId);
    },
    
    buy(upgradeId) {
        if (!this.canAfford(upgradeId)) return false;
        const cost = this.getCost(upgradeId);
        Player.gold -= cost;
        Player.upgrades[upgradeId]++;
        if (upgradeId === 'health') {
            Player.maxHp = Player.getMaxHp();
            Player.hp = Player.maxHp;
        }
        return true;
    }
};