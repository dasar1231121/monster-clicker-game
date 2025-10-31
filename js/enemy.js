// Enemy management
const Enemy = {
    name: 'Гоблин',
    hp: 50,
    maxHp: 50,
    damage: 5,
    goldDrop: 10,
    isBoss: false,
    type: 'goblin',
    
    spawn() {
        this.isBoss = (Player.kills % 10 === 0 && Player.kills > 0);
        if (this.isBoss) {
            this.spawnBoss();
        } else {
            this.spawnNormal();
        }
    },
    
    spawnNormal() {
        const wave = Player.wave;
        if (wave < 5) {
            this.type = 'goblin';
            this.name = 'Гоблин';
        } else if (wave < 10) {
            this.type = 'orc';
            this.name = 'Орк';
        } else if (wave < 20) {
            this.type = 'troll';
            this.name = 'Тролль';
        } else if (wave < 30) {
            this.type = 'demon';
            this.name = 'Демон';
        } else {
            this.type = 'dragon';
            this.name = 'Дракон';
        }
        this.maxHp = Math.floor(50 + wave * 10);
        this.hp = this.maxHp;
        this.damage = Math.floor(5 + wave * 2);
        this.goldDrop = Math.floor(10 + wave * 5);
        this.isBoss = false;
    },
    
    spawnBoss() {
        const wave = Player.wave;
        this.type = 'boss';
        this.name = 'БОСС ' + (Math.floor(Player.kills / 10) + 1);
        this.maxHp = Math.floor((50 + wave * 10) * 3);
        this.hp = this.maxHp;
        this.damage = Math.floor((5 + wave * 2) * 3);
        this.goldDrop = Math.floor((10 + wave * 5) * 5);
        this.isBoss = true;
    },
    
    takeDamage(amount) {
        this.hp = Math.max(0, this.hp - amount);
        return this.hp === 0;
    },
    
    die() {
        Player.addGold(this.goldDrop);
        Player.addKill();
        if (this.isBoss) {
            Player.nextWave();
        }
        this.spawn();
    },
    
    attack() {
        Player.takeDamage(this.damage);
    }
};