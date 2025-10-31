// Game Loop and Global Functions
const Game = {
    lastEnemyAttack: Date.now(),
    enemyAttackInterval: 2000, // Enemy attacks every 2 seconds
    
    init() {
        Storage.load();
        Enemy.spawn();
        UI.update();
        this.setupEventListeners();
        this.startGameLoop();
        
        // Auto-save every 30 seconds
        setInterval(() => Storage.save(), 30000);
    },
    
    setupEventListeners() {
        // Attack button
        const attackBtn = document.getElementById('attack-btn');
        if (attackBtn) {
            attackBtn.addEventListener('click', () => {
                Combat.attack();
            });
        }
        
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tabName = e.target.dataset.tab;
                this.switchTab(tabName);
            });
        });
        
        // Prestige button
        const prestigeBtn = document.getElementById('prestige-btn');
        if (prestigeBtn) {
            prestigeBtn.addEventListener('click', () => {
                Prestige.doPrestige();
            });
        }
    },
    
    switchTab(tabName) {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        const activeBtn = document.querySelector(`[data-tab="${tabName}"]`);
        const activeContent = document.getElementById(`${tabName}-tab`);
        
        if (activeBtn) activeBtn.classList.add('active');
        if (activeContent) activeContent.classList.add('active');
        
        UI.update();
    },
    
    startGameLoop() {
        setInterval(() => {
            this.update();
        }, 100); // Update every 100ms
    },
    
    update() {
        const now = Date.now();
        
        // Enemy attacks player
        if (now - this.lastEnemyAttack >= this.enemyAttackInterval) {
            Combat.enemyAttack();
            this.lastEnemyAttack = now;
        }
        
        // Update buffs
        Buffs.update();
        
        // Check achievements
        Achievements.check();
        
        // Update UI
        UI.update();
    }
};

// Global functions for onclick handlers
function buyUpgrade(upgradeId) {
    if (Upgrades.buy(upgradeId)) {
        UI.update();
    }
}

function buyPrestigeUpgrade(upgradeId) {
    if (Prestige.buy(upgradeId)) {
        UI.update();
    }
}

function activateChallenge(challengeId) {
    if (Challenges.activate(challengeId)) {
        UI.update();
    }
}

function selectClass(classId) {
    if (Classes.select(classId)) {
        Player.maxHp = Player.getMaxHp();
        Player.hp = Player.maxHp;
        UI.update();
    }
}

function buyBuff(buffId) {
    if (Buffs.buy(buffId)) {
        UI.update();
    }
}