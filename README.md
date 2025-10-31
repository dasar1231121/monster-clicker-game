# 🎮 Monster Clicker RPG

Incremental clicker game with RPG elements. Battle monsters, upgrade your character, unlock classes, and become a legend!

## 🌟 Features

- ⚔️ **Combat System**: Click to attack enemies with critical hits and damage animations
- 👹 **5 Enemy Types**: Goblin → Orc → Troll → Demon → Dragon with progressive difficulty
- 👑 **Boss Battles**: Every 10 kills spawns a boss with 3x HP and damage
- 💰 **Economy**: Earn gold, collect diamonds, and buy upgrades
- 🏆 **8 Achievements**: Complete challenges to earn diamond rewards (5-50 💎)
- ⭐ **Prestige System**: Reset after wave 10+ for permanent bonuses
- 🎯 **3 Challenges**: Complete to unlock special classes
- 🛡️ **3 Classes**: Berserker (damage), Tank (health), Assassin (crits)
- ⚡ **Temporary Buffs**: Spend diamonds for 2x damage, 2x gold, or attack speed
- 💾 **Auto-save**: Your progress saves automatically every 30 seconds
- 📱 **Mobile Responsive**: Fully optimized for mobile devices

## 🚀 Quick Start

### Play in Browser (Easiest!)

1. Clone the repository:
```bash
git clone https://github.com/dasar1231121/monster-clicker-game.git
cd monster-clicker-game
git checkout game-initial-setup
```

2. Open `index.html` in your browser - That's it! 🎉

### Run with Local Server

```bash
npm install
npm start
```

Then open http://localhost:8080 in your browser.

## 📱 Build Android APK

### Prerequisites
- Node.js 16+ installed
- Android Studio installed
- Java Development Kit (JDK) 11+ installed

### Steps
1. Install dependencies: `npm install`
2. Initialize Capacitor: `npx cap init`
3. Add Android platform: `npx cap add android`
4. Sync files: `npx cap sync android`
5. Open in Android Studio: `npx cap open android`
6. Build APK: Build → Build Bundle(s) / APK(s) → Build APK(s)

## 🎮 How to Play

1. **Attack**: Click the enemy to deal damage
2. **Earn Gold**: Defeat enemies to collect gold
3. **Upgrade**: Buy upgrades to increase damage, HP, crit chance
4. **Progress**: Advance through waves, each wave brings stronger enemies
5. **Prestige**: After wave 10+, prestige to earn permanent bonuses
6. **Unlock Classes**: Complete challenges to unlock special classes
7. **Earn Diamonds**: Complete achievements to earn premium currency
8. **Use Buffs**: Spend diamonds on temporary powerful bonuses

## 📊 Game Systems

### Upgrades (Gold)
- ⚔️ **Damage**: +5 per level
- ❤️ **Health**: +20 HP per level
- 💰 **Gold Bonus**: +20% per level
- 💥 **Crit Chance**: +5% per level (max 75%)
- 🔥 **Crit Damage**: +0.5x multiplier per level

### Prestige Upgrades (Prestige Points)
- ⚔️ **Damage Multiplier**: +10% permanent damage
- 💰 **Gold Multiplier**: +15% permanent gold
- ⭐ **XP Multiplier**: +10% permanent experience

### Classes (Unlock via Challenges)
- ⚔️ **Berserker**: +50% damage, -30% HP
- 🛡️ **Tank**: +80% HP, -30% damage
- 🗡️ **Assassin**: 2x crit chance, 1.5x crit damage

### Buffs (Diamonds)
- ⚔️ **Damage Buff**: 2x damage for 5 minutes (10 💎)
- 💰 **Gold Buff**: 2x gold for 5 minutes (10 💎)
- ⚡ **Speed Buff**: Faster attacks for 10 minutes (15 💎)

## 🏆 Achievements

- 🏆 **First Blood**: Kill 10 enemies → 5 💎
- 🏆 **Hunter**: Kill 100 enemies → 10 💎
- 🏆 **Slayer**: Kill 1000 enemies → 25 💎
- 🏆 **Survivor**: Reach wave 10 → 10 💎
- 🏆 **Veteran**: Reach wave 25 → 20 💎
- 🏆 **Legend**: Reach wave 50 → 50 💎
- 🏆 **New Beginning**: First prestige → 15 💎
- 🏆 **Rich**: Accumulate 10000 gold → 10 💎

## 📁 Project Structure

```
monster-clicker-game/
├── index.html
├── css/game.css
├── js/
│   ├── utils.js
│   ├── storage.js
│   ├── player.js
│   ├── enemy.js
│   ├── combat.js
│   ├── upgrades.js
│   ├── prestige.js
│   ├── achievements.js
│   ├── challenges.js
│   ├── classes.js
│   ├── buffs.js
│   ├── ui.js
│   ├── game.js
│   └── main.js
├── package.json
├── capacitor.config.json
└── README.md
```

## 🛠️ Technologies

- HTML5, CSS3, Vanilla JavaScript
- Capacitor for Android
- LocalStorage for saves

## 📜 License

MIT License

## 👤 Author

**dasar1231121**

## 🎉 Enjoy the Game!

Have fun clicking monsters and building your ultimate character! 🐉⚔️

Star ⭐ this repo if you enjoy the game!