// Combat system
const Combat = {
    attack() {
        const damage = Player.getDamage();
        const critChance = Player.getCritChance();
        const isCrit = Math.random() * 100 < critChance;
        
        let finalDamage = damage;
        if (isCrit) {
            finalDamage *= Player.getCritMultiplier();
        }
        
        finalDamage = Math.floor(finalDamage);
        
        const enemySprite = document.getElementById('enemy-sprite');
        if (enemySprite) {
            const rect = enemySprite.getBoundingClientRect();
            showDamageNumber(finalDamage, rect.left + rect.width / 2, rect.top, isCrit);
        }
        
        const isDead = Enemy.takeDamage(finalDamage);
        
        if (isDead) {
            Enemy.die();
        }
        
        if (typeof UI !== 'undefined') UI.update();
    },
    
    enemyAttack() {
        if (Enemy.hp > 0) {
            Enemy.attack();
            if (typeof UI !== 'undefined') UI.update();
        }
    }
};