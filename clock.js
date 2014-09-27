/**
 * Global Settings
 */
var canvas = null,
        context = null,
        settings = {
    font: {
        family: '"Duru Sans", Helvetica, sans-serif',
        style: 'default' // default or shadow
    },
    timeFormat: '24hr'
};
var scale = 0.5;

// resize the canvas to fill browser window dynamically
window.addEventListener('resize', resizeCanvas, false);

// initialize...
window.onload = function() {
    init();
};

/**
 * Initialize Clock
 */
function init() {
    // Grab the canvas
    canvas = document.getElementById('clock');
    context = canvas.getContext('2d');
    resizeCanvas();
    setInterval(displayClock, 1000);
}

function resizeCanvas() {

    canvas.width = $("#clock").width();
    canvas.height = $("#clock").height();

    console.log($("#clock").width());
    if (canvas.width < 450)
    {
        scale = canvas.width / 450;
        context.scale(scale, scale);
    }
    // elements need to be redrawn after resize
    displayClock();
}

// add a leading zero to numbers less then 10
function zeroPad(num) {
    return (num < 10 ? '0' : '') + num;
}

function setRing(time, type) {
    //circle
    var percentage = type == 0 ? time / 24 : time / 60;
    var degrees = percentage * 360.0;
    var radians = degrees * (Math.PI / 180);



    var x = type == 0 ? 85 : type == 1 ? 225 : 365;
    var y = 70;
    var r = 55;
    var s = Math.PI / 2 * 3;

    context.beginPath();
    context.lineWidth = 18;
    context.strokeStyle = type == 0 ? '#de5f1b' : type == 1 ? '#8a4091' : '#94c020';
    context.arc(x, y, r, s, s + radians, false);
    context.stroke();

    var textTime = "" + time;
    var xt = x - (context.measureText(textTime).width / 2);
    var yt = 30;
    context.fillText(textTime, xt, yt);
}

/**
 * Set the clock time & date
 */
function displayClock() {
    // grab the current time
    var dateTime = new Date();

    // add text lookups for month and days
    var months = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'];
    var days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

    // parse the separate elements out of the date/time
    var year = dateTime.getFullYear();
    var month = months[dateTime.getMonth()].toUpperCase();
    var day = dateTime.getDate();
    var dayOfWeek = days[dateTime.getDay()].toUpperCase();

    var hours = zeroPad(dateTime.getHours());
    var minutes = zeroPad(dateTime.getMinutes());
    var seconds = zeroPad(dateTime.getSeconds());

    // clear canvas
    context.clearRect(0, 0, 500, 500);

    // render text to canvas
    context.textBaseline = 'top';

    context.fillStyle = '#767571';
    context.shadowColor = '#222';
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowBlur = 4;

    // render the date text
    context.font = '30pt' + settings.font.family;
    var textDate = dayOfWeek + ' ' + day + ' ' + month + ', ' + year;

    x = (450 - context.measureText(textDate).width) / 2;

    y = 135;
    context.fillText(textDate, x, y);

    context.font = 'bold 48pt ' + settings.font.family;
    setRing(hours, 0);
    setRing(minutes, 1);
    setRing(seconds, 2);

}
