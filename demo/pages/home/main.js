var count = 1;
var dogeCount = 0;
var generateNumberedSnackBtn = document.getElementById('simple-notification-btn');
var generateDogeSnackBtn = document.getElementById('doge-notification-btn');
var dismissableSnackBtn = document.getElementById('dismissable-notification-btn');

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

generateDogeSnackBtn.addEventListener('click', function() {
    var notification = dogeNotifications[dogeCount % dogeNotifications.length];
    markoSnackbars.createNotification(notification);
    dogeCount++;
});

dismissableSnackBtn.addEventListener('click', function() {
    markoSnackbars.createNotification({
        message: 'Dismiss this',
        denyText: 'Dismiss',
        onDeny: function() {
            markoSnackbars.createNotification({
                message: 'Notification was dismissed!',
                bgColor: 'red'
            });
        },
        ttl: -1
    });
});
