var count = 1;
var generateBtn = document.getElementById('simple-notification-btn');

generateBtn.addEventListener('click', function() {
    window.markoSnackbars.createNotification({
        position: 'tr',
        message: 'Notification ' + count,
        showButtons: true,
        allowText: 'allow',
        ttl: count % 2 === 0 ? 1000 : 6000
    });
    count++;
});
