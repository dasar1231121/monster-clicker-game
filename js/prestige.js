// Prestige system
const Prestige = {
    upgrades: [
        {
            id: 'damageMulti',
            name: 'Множитель урона',
            description: '+10% урона навсегда',
            cost: 1,
            icon: '⚔️'
        },
        {
            id: 'goldMulti',
            name: 'Множитель золота',
            description: '+15% золота навсегда',
            cost: 1,
            icon: '💰'
        },
        {
            id: 'xpMulti',
            name: 'Множитель опыта',
            description: '+10% опыта навсегда',
            cost: 1,
            icon: '⭐'
        }
    ],
    
    getCost(upgradeId) {
        const upgrade = this.upgrades.find(u => u.id === upgradeId);
        if (!upgrade) return 0;
        const level = Player.prestigeUpgrades[upgradeId] || 0;
        return upgrade.cost + level;
    },
    
    canAfford(upgradeId) {
        return Player.prestigePoints >= this.getCost(upgradeId);
    },
    
    buy(upgradeId) {
        if (!this.canAfford(upgradeId)) return false;
        const cost = this.getCost(upgradeId);
        Player.prestigePoints -= cost;
        Player.prestigeUpgrades[upgradeId]++;
        return true;
    },
    
    doPrestige() {
        if (!Player.canPrestige()) return false;
        if (confirm('Вы уверены? Весь прогресс будет сброшен, но вы получите очки престижа!')) {
            Player.doPrestige();
            Enemy.spawn();
            if (typeof UI !== 'undefined') UI.update();
            return true;
        }
        return false;
    }
};
