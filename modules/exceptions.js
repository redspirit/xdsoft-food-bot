require('console-stamp')(console, { pattern: 'dd/mm/yyyy HH:MM:ss' });

process.addListener('error', function(err) {
    console.log('HANDLEEXCEPTION from process.addListener.error');
    console.error(err);
});

process.addListener('uncaughtException', function(err) {
    console.log('HANDLEEXCEPTION from process.addListener.uncaughtException');
    console.error(err);
});
