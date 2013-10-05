$(document).ready(function() {
    /* This code is executed after the DOM has been completely loaded */

    $('#fancyClock').tzineClock();

});

google.load("gdata", "2.x");

function init() {
    // init the Google data JS client library with an error handler
    google.gdata.client.init(handleGDError);
    // load the code.google.com developer calendar
    loadDeveloperCalendar();

    loadTramdata();
}

/**
 * Loads the Google Developers Event Calendar
 */
function loadDeveloperCalendar() {
    loadCalendarByAddress('developer-calendar@google.com');
}

/**
 * Adds a leading zero to a single-digit number.  Used for displaying dates.
 */
function padNumber(num) {
    if (num <= 9) {
        return "0" + num;
    }
    return num;
}

/**
 * Determines the full calendarUrl based upon the calendarAddress
 * argument and calls loadCalendar with the calendarUrl value.
 *
 * @param {string} calendarAddress is the email-style address for the calendar
 */
function loadCalendarByAddress(calendarAddress) {
    var calendarUrl = 'https://www.google.com/calendar/feeds/' +
            calendarAddress +
            '/public/full';
    loadCalendar(calendarUrl);
}

/**
 * Uses Google data JS client library to retrieve a calendar feed from the specified
 * URL.  The feed is controlled by several query parameters and a callback 
 * function is called to process the feed results.
 *
 * @param {string} calendarUrl is the URL for a public calendar feed
 */
function loadCalendar(calendarUrl) {
    var service = new
            google.gdata.calendar.CalendarService('gdata-js-client-samples-simple');
    var query = new google.gdata.calendar.CalendarEventQuery(calendarUrl);
    query.setOrderBy('starttime');
    query.setSortOrder('ascending');
    query.setFutureEvents(true);
    query.setSingleEvents(true);
    query.setMaxResults(10);

    service.getEventsFeed(query, listEvents, handleGDError);
}

/**
 * Callback function for the Google data JS client library to call when an error
 * occurs during the retrieval of the feed.  Details available depend partly
 * on the web browser, but this shows a few basic examples. In the case of
 * a privileged environment using ClientLogin authentication, there may also
 * be an e.type attribute in some cases.
 *
 * @param {Error} e is an instance of an Error 
 */
function handleGDError(e) {
    document.getElementById('jsSourceFinal').setAttribute('style',
            'display:none');
    if (e instanceof Error) {
        /* alert with the error line number, file and message */
        alert('Error at line ' + e.lineNumber +
                ' in ' + e.fileName + '\n' +
                'Message: ' + e.message);
        /* if available, output HTTP error code and status text */
        if (e.cause) {
            var status = e.cause.status;
            var statusText = e.cause.statusText;
            alert('Root cause: HTTP error ' + status + ' with status text of: ' +
                    statusText);
        }
    } else {
        alert(e.toString());
    }
}


var month = ["jan", "fev", "mars", "avr", "mai", "juin", "jui", "aout", "sept", "oct", "nov", "dec"];

var feeded = false;
/**
 * Callback function for the Google data JS client library to call with a feed 
 * of events retrieved.
 *
 * Creates an unordered list of events in a human-readable form.  This list of
 * events is added into a div called 'events'.  The title for the calendar is
 * placed in a div called 'calendarTitle'
 *
 * @param {json} feedRoot is the root of the feed, containing all entries 
 */
function listEvents(feedRoot) {
    if (feeded)
        return;
    feeded = true;
    var entries = feedRoot.feed.getEntries();
    var eventDiv = document.getElementById('events');
    if (eventDiv.childNodes.length > 0) {
        eventDiv.removeChild(eventDiv.childNodes[0]);
    }


    /* loop through each event in the feed */
    var len = entries.length < 3 ? entries.length : 3;
    for (var i = 0; i < len; i++) {

        var tr = document.createElement('tr');

        var entry = entries[i];
        var title = entry.getTitle().getText();
        var content = entry.getContent().getText();

        //stocage de la date
        var startDateTime = null;
        var startJSDate = null;
        var times = entry.getTimes();
        if (times.length > 0) {
            startDateTime = times[0].getStartTime();
            startJSDate = startDateTime.getDate();
        }
        var dateString = " <div class=\"date\"><p>" + startJSDate.getDate() + "<span>" + month[startJSDate.getMonth()] + "</span></p>";
//	if (!startDateTime.isDateOnly()) {
//	    dateString += " " + startJSDate.getHours() + ":" + 
//		padNumber(startJSDate.getMinutes());
//	}
        var td = document.createElement('td');
        td.innerHTML = dateString;
        tr.appendChild(td);

        td = document.createElement('td');
        td.innerHTML = "<h4>" + title
                + (!startDateTime.isDateOnly() ? " | " + startJSDate.getHours() + "h" + padNumber(startJSDate.getMinutes()) : "") + "</h4> "
                + content;
        tr.appendChild(td);

        eventDiv.appendChild(tr);
    }


}

google.setOnLoadCallback(init);
//-->
function loadTramdata() {
    $.getJSON("http://timeoapi.haum.org/v1/stations/807/T1_A?callback=?", null, function(a) {
        var eventDiv = document.getElementById('tram');        

        eventDiv.innerHTML = "vos prochains trams :<br/>vers centre-ville dans <br/>" + a.stops[0] + " puis " + a.stops[1] + " !";



    });
     setTimeout(function() {loadTramdata()}, 60000);

}


