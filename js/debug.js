// Debug script - проверка загрузки
console.log('✅ Debug script loaded!');
console.log('Current URL:', window.location.href);
console.log('Document ready state:', document.readyState);

// Проверка всех скриптов
window.addEventListener('load', () => {
    console.log('🎮 Window loaded!');
    console.log('Game object exists?', typeof Game !== 'undefined');
    console.log('Player object exists?', typeof Player !== 'undefined');
    console.log('Enemy object exists?', typeof Enemy !== 'undefined');
});

// Перехват ошибок
window.addEventListener('error', (e) => {
    console.error('❌ JavaScript Error:', e.message, e.filename, e.lineno);
    alert('Ошибка JS: ' + e.message + ' в ' + e.filename + ':' + e.lineno);
});

// Перехват необработанных промисов
window.addEventListener('unhandledrejection', (e) => {
    console.error('❌ Unhandled Promise Rejection:', e.reason);
    alert('Ошибка Promise: ' + e.reason);
});