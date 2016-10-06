var count = 1;
var generateBtn = document.getElementById('simple-notification-btn');

generateBtn.addEventListener('click', function() {
    window.markoNotification.createNotification({
        position: 'tr',
        message: 'Notification ' + count,
        showButtons: true,
        ttl: 5000

    });
    count++;
});
