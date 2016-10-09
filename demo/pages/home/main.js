var count = 1;
var dogeCount = 0;
var generateNumberedSnackBtn = document.getElementById('simple-notification-btn');
var generateDogeSnackBtn = document.getElementById('doge-notification-btn');

var dogeNotifications = [
    {
        message: 'Cool!',
        bgColor: 'red'
    },
    {
        message: 'Wow!',
        bgColor: '#3cdfe8'
    },
    {
        message: 'Much notification!',
        allowText: 'I agree',
        bgColor: 'yellow',
        messageColor: 'black',
        allowTextColor: 'orange'
    },
    {
        message: 'Awesome!',
        bgColor: 'orange'
    },
    {
        message: 'Very snackbar',
        bgColor: 'brown'
    },
    {
        message: 'Much color',
        bgColor: 'purple'
    }
];

generateNumberedSnackBtn.addEventListener('click', function() {
    window.markoSnackbars.createNotification({
        position: 'tr',
        message: 'Notification ' + count,
        ttl: -1
    });
    count++;
});

generateDogeSnackBtn.addEventListener('click', function() {
    var notification = dogeNotifications[dogeCount % dogeNotifications.length];
    window.markoSnackbars.createNotification(notification);
    dogeCount++;
});
