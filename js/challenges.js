// Challenges and class unlock system
const Challenges = {
    list: [
        {
            id: 'speed_run',
            name: 'Спидран',
            description: 'Достигните волны 10 за 5 минут',
            reward: 'Разблокирует класс: Берсерк',
            completed: false,
            active: false,
            classUnlock: 'berserker'
        },
        {
            id: 'no_damage',
            name: 'Неуязвимость',
            description: 'Пройдите волну без получения урона',
            reward: 'Разблокирует класс: Защитник',
            completed: false,
            active: false,
            classUnlock: 'tank'
        },
        {
            id: 'crit_master',
            name: 'Мастер критов',
            description: 'Нанесите 50 критов подряд',
            reward: 'Разблокирует класс: Ассасин',
            completed: false,
            active: false,
            classUnlock: 'assassin'
        }
    ],
    
    activate(challengeId) {
        const challenge = this.list.find(c => c.id === challengeId);
        if (!challenge || challenge.completed) return false;
        challenge.active = true;
        return true;
    },
    
    complete(challengeId) {
        const challenge = this.list.find(c => c.id === challengeId);
        if (!challenge || challenge.completed) return false;
        challenge.completed = true;
        challenge.active = false;
        if (challenge.classUnlock && typeof Classes !== 'undefined') {
            Classes.unlock(challenge.classUnlock);
        }
        alert(`✅ Испытание выполнено!\n${challenge.name}\n${challenge.reward}`);
        return true;
    }
};
