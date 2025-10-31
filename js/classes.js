// Class system
const Classes = {
    list: [
        {
            id: 'berserker',
            name: 'Берсерк',
            description: 'Увеличенный урон, но меньше HP',
            unlocked: false,
            bonuses: {
                damage: 1.5,
                health: 0.7
            }
        },
        {
            id: 'tank',
            name: 'Защитник',
            description: 'Много HP, но меньше урона',
            unlocked: false,
            bonuses: {
                damage: 0.7,
                health: 1.8
            }
        },
        {
            id: 'assassin',
            name: 'Ассасин',
            description: 'Высокий шанс и урон крита',
            unlocked: false,
            bonuses: {
                critChance: 2,
                critDamage: 1.5
            }
        }
    ],
    
    unlock(classId) {
        const cls = this.list.find(c => c.id === classId);
        if (cls) {
            cls.unlocked = true;
        }
    },
    
    select(classId) {
        const cls = this.list.find(c => c.id === classId);
        if (cls && cls.unlocked) {
            Player.selectedClass = classId;
            return true;
        }
        return false;
    },
    
    getActiveClass() {
        if (!Player.selectedClass) return null;
        return this.list.find(c => c.id === Player.selectedClass);
    }
};
