window.addEventListener('load', function () {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(function (reg) {
                console.log(reg);
            }).catch(function (err) {
                console.log(err);
            });
    } else {
        console.log('Service Worker not supported by the browser');
    }
});