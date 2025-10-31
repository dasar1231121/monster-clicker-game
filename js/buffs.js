// Buffs system (temporary bonuses for diamonds)
const Buffs = {
    active: [],
    
    list: [
        {
            id: 'damage',
            name: 'Бафф урона',
            description: 'Удваивает урон на 5 минут',
            cost: 10,
            duration: 300,
            icon: '⚔️'
        },
        {
            id: 'gold',
            name: 'Бафф золота',
            description: 'Удваивает получаемое золото на 5 минут',
            cost: 10,
            duration: 300,
            icon: '💰'
        },
        {
            id: 'speed',
            name: 'Бафф скорости',
            description: 'Увеличивает скорость атаки на 10 минут',
            cost: 15,
            duration: 600,
            icon: '⚡'
        }
    ],
    
    buy(buffId) {
        const buff = this.list.find(b => b.id === buffId);
        if (!buff) return false;
        
        if (Player.diamonds < buff.cost) return false;
        
        Player.diamonds -= buff.cost;
        this.activate(buffId, buff.duration);
        return true;
    },
    
    activate(buffId, duration) {
        const existingBuff = this.active.find(b => b.id === buffId);
        if (existingBuff) {
            existingBuff.endTime = Date.now() + duration * 1000;
        } else {
            this.active.push({
                id: buffId,
                endTime: Date.now() + duration * 1000
            });
        }
    },
    
    update() {
        const now = Date.now();
        this.active = this.active.filter(buff => buff.endTime > now);
    },
    
    isActive(buffId) {
        return this.active.some(b => b.id === buffId);
    },
    
    getTimeRemaining(buffId) {
        const buff = this.active.find(b => b.id === buffId);
        if (!buff) return 0;
        return Math.max(0, Math.floor((buff.endTime - Date.now()) / 1000));
    }
};
