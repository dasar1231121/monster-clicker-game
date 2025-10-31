// LocalStorage save/load system
const Storage = {
    saveKey: 'monsterClickerSave',
    
    save(data) {
        try {
            localStorage.setItem(this.saveKey, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('Failed to save:', e);
            return false;
        }
    },
    
    load() {
        try {
            const data = localStorage.getItem(this.saveKey);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Failed to load:', e);
            return null;
        }
    },
    
    clear() {
        localStorage.removeItem(this.saveKey);
    },
    
    export() {
        const data = this.load();
        if (!data) return null;
        return btoa(JSON.stringify(data));
    },
    
    import(encoded) {
        try {
            const data = JSON.parse(atob(encoded));
            this.save(data);
            return true;
        } catch (e) {
            console.error('Failed to import:', e);
            return false;
        }
    }
};