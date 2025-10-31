// Utility functions
function formatNumber(num) {
    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return Math.floor(num).toString();
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

function showDamageNumber(damage, x, y, isCritical = false) {
    const damageEl = document.createElement('div');
    damageEl.className = 'damage-number' + (isCritical ? ' critical' : '');
    damageEl.textContent = '-' + formatNumber(damage);
    damageEl.style.left = x + 'px';
    damageEl.style.top = y + 'px';
    damageEl.style.color = isCritical ? '#ff0000' : '#ffaa00';
    document.body.appendChild(damageEl);
    
    setTimeout(() => damageEl.remove(), 1000);
}

function getEnemyEmoji(type) {
    const emojis = {
        goblin: '👹',
        orc: '👺',
        troll: '🧟',
        demon: '😈',
        dragon: '🐉',
        boss: '👑'
    };
    return emojis[type] || '👹';
}