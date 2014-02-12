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
var scale = 1;

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
    var percentage = 1;// type == 0 ? time / 24 : time / 60; 
    var degrees = percentage * 360.0;
    var radians = degrees * (Math.PI / 180);



    var x = type == 0 ? 85 : type == 1 ? 228 : 368;
    var y = 67;
    var r = 55;
    var s = Math.PI / 2 * 3;

    context.beginPath();
    context.lineWidth = 18;
    context.strokeStyle = type == 0 ? '#e15100' : type == 1 ? '#7400cc' : '#89b600';
    context.arc(x, y, r, s, s + radians, false);
    context.stroke();
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
    if (dateTime.getHours() >= 13 && settings.timeFormat == '12hr') {
        hours = hours - 12;
    }
    var minutes = zeroPad(dateTime.getMinutes());
    var seconds = zeroPad(dateTime.getSeconds());
    var ampm = (dateTime.getHours() >= 12) ? 'PM' : 'AM';

    // set the time format (12 or 24 hour)
    var textTime;
    if (settings.timeFormat == '24hr') {
        textTime = hours + '   ' + minutes + '   ' + seconds;
    } else {
        textTime = hours + '   ' + minutes + '  ' + seconds + '  ' + ampm;
    }

    // clear canvas
    context.clearRect(0, 0, 500, 500);

    // render text to canvas
    context.font = 'bold 55pt ' + settings.font.family;
    context.textBaseline = 'top';

    context.fillStyle = '#767571';
    context.shadowColor = '#222';
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowBlur = 2;

    // render the time text
    var x = (450 - context.measureText(textTime).width) / 2;
    var y = 25;
    context.fillText(textTime, x, y);

    // render the date text
    context.font = '40pt' + settings.font.family;
    var textDate = dayOfWeek + ' ' + day + ' ' + month + ', ' + year;

    x = (450 - context.measureText(textDate).width) / 2;

    y = 135;
    context.fillText(textDate, x, y);

    setRing(hours, 0);
    setRing(minutes, 1);
    setRing(seconds, 2);

}