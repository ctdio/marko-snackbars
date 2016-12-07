var count = 1;
var clickDismissCount = 1;
var dogeCount = 0;
var generateNumberedSnackBtn = document.getElementById('simple-notification-btn');
var generateDogeSnackBtn = document.getElementById('doge-notification-btn');
var clickDismissEnabledSnackBtn = document.getElementById('click-dismiss-enabled-notification-btn');

var markoSnackbars = window.markoSnackbars;

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
        buttons: [
            {
                text: 'I agree',
                color: 'orange'
            },
            {
                text: 'Wow',
                color: 'red',
                onClick: function() {
                    markoSnackbars.createNotification({
                        message: 'Much Wow!',
                        bgColor: 'pink'
                    });
                }
            }
        ],
        bgColor: 'yellow',
        messageColor: 'black'
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
    markoSnackbars.createNotification({
        position: 'tr',
        message: 'Notification ' + count,
        ttl: -1
    });
    count++;
});

clickDismissEnabledSnackBtn.addEventListener('click', function() {
    markoSnackbars.createNotification({
        position: 'tr',
        message: 'Click Dismiss Notification ' + clickDismissCount,
        clickDismissEnabled: false,
        onDismiss: function() {
            console.log('Successfully dismissed');
        }
    });
    clickDismissCount++;
});

generateDogeSnackBtn.addEventListener('click', function() {
    var notification = dogeNotifications[dogeCount % dogeNotifications.length];
    markoSnackbars.createNotification(notification);
    dogeCount++;
});
