// Achievements system
const Achievements = {
    list: [
        {
            id: 'kills_10',
            name: 'Первая кровь',
            description: 'Убейте 10 врагов',
            reward: 5,
            check: () => Player.totalKills >= 10,
            completed: false
        },
        {
            id: 'kills_100',
            name: 'Охотник',
            description: 'Убейте 100 врагов',
            reward: 10,
            check: () => Player.totalKills >= 100,
            completed: false
        },
        {
            id: 'kills_1000',
            name: 'Истребитель',
            description: 'Убейте 1000 врагов',
            reward: 25,
            check: () => Player.totalKills >= 1000,
            completed: false
        },
        {
            id: 'wave_10',
            name: 'Выживший',
            description: 'Достигните волны 10',
            reward: 10,
            check: () => Player.wave >= 10,
            completed: false
        },
        {
            id: 'wave_25',
            name: 'Ветеран',
            description: 'Достигните волны 25',
            reward: 20,
            check: () => Player.wave >= 25,
            completed: false
        },
        {
            id: 'wave_50',
            name: 'Легенда',
            description: 'Достигните волны 50',
            reward: 50,
            check: () => Player.wave >= 50,
            completed: false
        },
        {
            id: 'prestige_1',
            name: 'Новое начало',
            description: 'Совершите первый престиж',
            reward: 15,
            check: () => Player.prestigePoints >= 1,
            completed: false
        },
        {
            id: 'gold_10k',
            name: 'Богач',
            description: 'Накопите 10000 золота',
            reward: 10,
            check: () => Player.gold >= 10000,
            completed: false
        }
    ],
    
    check() {
        this.list.forEach(achievement => {
            if (!achievement.completed && achievement.check()) {
                achievement.completed = true;
                Player.addDiamonds(achievement.reward);
                this.showNotification(achievement);
            }
        });
    },
    
    showNotification(achievement) {
        alert(`🏆 Достижение разблокировано!\n${achievement.name}\n+${achievement.reward} 💎`);
    },
    
    getProgress() {
        const completed = this.list.filter(a => a.completed).length;
        return { completed, total: this.list.length };
    }
};
