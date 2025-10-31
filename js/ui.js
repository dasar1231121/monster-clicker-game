// UI Update System
const UI = {
    update() {
        this.updateResources();
        this.updatePlayerStats();
        this.updateEnemy();
        this.updateUpgrades();
        this.updatePrestige();
        this.updateAchievements();
        this.updateChallenges();
        this.updateClasses();
        this.updateBuffs();
    },
    
    updateResources() {
        document.getElementById('gold').textContent = formatNumber(Player.gold);
        document.getElementById('diamonds').textContent = formatNumber(Player.diamonds);
        document.getElementById('wave').textContent = Player.wave;
    },
    
    updatePlayerStats() {
        document.getElementById('player-hp').textContent = Math.floor(Player.hp);
        document.getElementById('player-max-hp').textContent = Player.maxHp;
        document.getElementById('player-damage').textContent = formatNumber(Player.getDamage());
        document.getElementById('player-level').textContent = Player.level;
        
        const hpPercent = (Player.hp / Player.maxHp) * 100;
        document.getElementById('player-hp-bar').style.width = hpPercent + '%';
    },
    
    updateEnemy() {
        document.getElementById('enemy-name').textContent = Enemy.name;
        document.getElementById('enemy-hp').textContent = Math.floor(Enemy.hp);
        document.getElementById('enemy-max-hp').textContent = Enemy.maxHp;
        document.getElementById('kills').textContent = Enemy.kills;
        
        const enemySprite = document.getElementById('enemy-sprite');
        if (enemySprite) {
            enemySprite.textContent = Enemy.emoji;
        }
        
        const hpPercent = (Enemy.hp / Enemy.maxHp) * 100;
        document.getElementById('enemy-hp-bar').style.width = hpPercent + '%';
    },
    
    updateUpgrades() {
        const container = document.getElementById('upgrades-list');
        if (!container) return;
        
        container.innerHTML = '';
        Upgrades.list.forEach(upgrade => {
            const level = Player.upgrades[upgrade.id] || 0;
            const cost = Upgrades.getCost(upgrade.id);
            const canAfford = Upgrades.canAfford(upgrade.id);
            
            const div = document.createElement('div');
            div.className = 'upgrade-item' + (canAfford ? '' : ' disabled');
            div.innerHTML = `
                <div class="upgrade-icon">${upgrade.icon}</div>
                <div class="upgrade-info">
                    <div class="upgrade-name">${upgrade.name} (Ур. ${level})</div>
                    <div class="upgrade-description">${upgrade.description}</div>
                </div>
                <button class="upgrade-btn" onclick="Upgrades.buy('${upgrade.id}')" ${!canAfford ? 'disabled' : ''}>
                    ${formatNumber(cost)} 💰
                </button>
            `;
            container.appendChild(div);
        });
    },
    
    updatePrestige() {
        const container = document.getElementById('prestige-upgrades');
        if (!container) return;
        
        const pointsEl = document.getElementById('prestige-points');
        if (pointsEl) {
            pointsEl.textContent = Player.prestigePoints;
        }
        
        const prestigeBtn = document.getElementById('prestige-btn');
        if (prestigeBtn) {
            const canPrestige = Player.wave >= 10;
            prestigeBtn.disabled = !canPrestige;
            if (canPrestige) {
                const points = Math.floor(Player.wave / 10);
                prestigeBtn.textContent = `🌟 ПРЕСТИЖ (+${points} очков)`;
            }
        }
        
        container.innerHTML = '';
        Prestige.upgrades.forEach(upgrade => {
            const level = Player.prestigeUpgrades[upgrade.id] || 0;
            const cost = Prestige.getCost(upgrade.id);
            const canAfford = Prestige.canAfford(upgrade.id);
            
            const div = document.createElement('div');
            div.className = 'prestige-upgrade' + (canAfford ? '' : ' disabled');
            div.innerHTML = `
                <div class="upgrade-icon">${upgrade.icon}</div>
                <div class="upgrade-info">
                    <div class="upgrade-name">${upgrade.name} (Ур. ${level})</div>
                    <div class="upgrade-description">${upgrade.description}</div>
                </div>
                <button class="upgrade-btn" onclick="Prestige.buyUpgrade('${upgrade.id}')" ${!canAfford ? 'disabled' : ''}>
                    ${formatNumber(cost)} 💎
                </button>
            `;
            container.appendChild(div);
        });
    },
    
    updateAchievements() {
        const container = document.getElementById('achievements-list');
        if (!container) return;
        
        container.innerHTML = '';
        Achievements.list.forEach(achievement => {
            const unlocked = Player.achievements.includes(achievement.id);
            
            const div = document.createElement('div');
            div.className = 'achievement-item' + (unlocked ? ' unlocked' : '');
            div.innerHTML = `
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-info">
                    <div class="achievement-name">${achievement.name}</div>
                    <div class="achievement-description">${achievement.description}</div>
                </div>
                <div class="achievement-status">${unlocked ? '✅' : '🔒'}</div>
            `;
            container.appendChild(div);
        });
    },
    
    updateChallenges() {
        const container = document.getElementById('challenges-list');
        if (!container) return;
        
        container.innerHTML = '';
        Challenges.list.forEach(challenge => {
            const completed = Player.challenges.includes(challenge.id);
            const active = Player.activeChallenge === challenge.id;
            
            const div = document.createElement('div');
            div.className = 'challenge-item' + (completed ? ' completed' : '') + (active ? ' active' : '');
            div.innerHTML = `
                <div class="challenge-icon">${challenge.icon}</div>
                <div class="challenge-info">
                    <div class="challenge-name">${challenge.name}</div>
                    <div class="challenge-description">${challenge.description}</div>
                    <div class="challenge-reward">Награда: ${challenge.reward}</div>
                </div>
                <button class="challenge-btn" onclick="Challenges.start('${challenge.id}')" ${completed || active ? 'disabled' : ''}>
                    ${completed ? '✅ Завершено' : active ? '⚔️ Активно' : '▶️ Начать'}
                </button>
            `;
            container.appendChild(div);
        });
    },
    
    updateClasses() {
        const container = document.getElementById('class-list');
        if (!container) return;
        
        container.innerHTML = '';
        Classes.list.forEach(cls => {
            const selected = Player.class === cls.id;
            
            const div = document.createElement('div');
            div.className = 'class-item' + (selected ? ' selected' : '');
            div.innerHTML = `
                <div class="class-icon">${cls.icon}</div>
                <div class="class-info">
                    <div class="class-name">${cls.name}</div>
                    <div class="class-description">${cls.description}</div>
                </div>
                <button class="class-btn" onclick="Classes.select('${cls.id}')" ${selected ? 'disabled' : ''}>
                    ${selected ? '✅ Выбран' : '🎯 Выбрать'}
                </button>
            `;
            container.appendChild(div);
        });
    },
    
    updateBuffs() {
        const activeContainer = document.getElementById('active-buffs');
        const shopContainer = document.getElementById('buffs-shop');
        
        if (activeContainer) {
            activeContainer.innerHTML = '';
            Player.activeBuffs.forEach(buff => {
                const buffData = Buffs.list.find(b => b.id === buff.id);
                if (!buffData) return;
                
                const remaining = Math.ceil((buff.expires - Date.now()) / 1000);
                
                const div = document.createElement('div');
                div.className = 'active-buff';
                div.innerHTML = `
                    <div class="buff-icon">${buffData.icon}</div>
                    <div class="buff-info">
                        <div class="buff-name">${buffData.name}</div>
                        <div class="buff-time">${remaining}с</div>
                    </div>
                `;
                activeContainer.appendChild(div);
            });
        }
        
        if (shopContainer) {
            shopContainer.innerHTML = '';
            Buffs.list.forEach(buff => {
                const canAfford = Player.diamonds >= buff.cost;
                
                const div = document.createElement('div');
                div.className = 'buff-item' + (canAfford ? '' : ' disabled');
                div.innerHTML = `
                    <div class="buff-icon">${buff.icon}</div>
                    <div class="buff-info">
                        <div class="buff-name">${buff.name}</div>
                        <div class="buff-description">${buff.description}</div>
                        <div class="buff-duration">Длительность: ${buff.duration}с</div>
                    </div>
                    <button class="buff-btn" onclick="Buffs.activate('${buff.id}')" ${!canAfford ? 'disabled' : ''}>
                        ${buff.cost} 💎
                    </button>
                `;
                shopContainer.appendChild(div);
            });
        }
    }
};

// Tab switching
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const panels = document.querySelectorAll('.panel');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetPanel = tab.dataset.tab;
            
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(targetPanel + '-panel').classList.add('active');
        });
    });
});
