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
        document.getElementById('player-hp').textContent = `${Math.floor(Player.hp)}/${Player.maxHp}`;
        document.getElementById('player-damage').textContent = formatNumber(Player.getDamage());
        document.getElementById('player-level').textContent = Player.level;
        
        const hpPercent = (Player.hp / Player.maxHp) * 100;
        const hpBar = document.querySelector('.hp-bar-fill');
        if (hpBar) {
            hpBar.style.width = hpPercent + '%';
        }
    },
    
    updateEnemy() {
        document.getElementById('enemy-name').textContent = Enemy.name;
        document.getElementById('enemy-hp').textContent = `${Math.floor(Enemy.hp)}/${Enemy.maxHp}`;
        
        const enemySprite = document.getElementById('enemy-sprite');
        if (enemySprite) {
            enemySprite.textContent = getEnemyEmoji(Enemy.type);
        }
        
        const hpPercent = (Enemy.hp / Enemy.maxHp) * 100;
        const enemyHpBar = document.querySelector('.enemy-hp-fill');
        if (enemyHpBar) {
            enemyHpBar.style.width = hpPercent + '%';
        }
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
                <button class="upgrade-btn" onclick="buyUpgrade('${upgrade.id}')" ${!canAfford ? 'disabled' : ''}>
                    ${formatNumber(cost)} 💰
                </button>
            `;
            container.appendChild(div);
        });
    },
    
    updatePrestige() {
        const container = document.getElementById('prestige-upgrades');
        if (!container) return;
        
        const canPrestige = Player.canPrestige();
        const prestigeBtn = document.getElementById('prestige-btn');
        if (prestigeBtn) {
            prestigeBtn.disabled = !canPrestige;
            prestigeBtn.textContent = canPrestige ? 
                `Престиж (+${Player.getPrestigePoints()} очков)` : 
                'Требуется волна 10+';
        }
        
        document.getElementById('prestige-points').textContent = Player.prestigePoints;
        
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
                <button class="upgrade-btn" onclick="buyPrestigeUpgrade('${upgrade.id}')