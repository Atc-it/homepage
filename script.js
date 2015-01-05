//google.load("gdata", "2.x");

function init() {
    // init the Google data JS client library with an error handler
    // load the code.google.com developer calendar

//    loadTramdata();
//    sMessage = "test";
//    initClk();
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
    nowdate = new Date();
    var d = nowdate.getFullYear()+'-'+(nowdate.getMonth()+1)+'-'+nowdate.getDate()+'T00%3A00%3A00%2B00%3A00';
    var calendarUrl = 'https://www.googleapis.com/calendar/v3/calendars/'+calendarAddress+'/events?timeMin='+d+'&key=AIzaSyD46IUOz_O6ZzbtAKDYE1MlQfESKE8EDAI&orderBy=startTime&singleEvents=true';

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
  console.log(calendarUrl);
    $.ajax({
      url: calendarUrl,
      dataType: "json"
    }).done(function(data) {
      //console.log(data);
      listEvents(data);
    });
    //service.getEventsFeed(query, listEvents, handleGDError);
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
  //console.log( "Sample of data:", feedRoot.slice( 0, 100 ) );
  console.log(feedRoot);

    if (feedRoot)
        //return;
    feeded = true;
    var entries = feedRoot.items;
    var eventDiv = document.getElementById('events');
    if (eventDiv.childNodes.length > 0) {
        eventDiv.removeChild(eventDiv.childNodes[0]);
    }
    console.log(entries);
    /* loop through each event in the feed */
//    var len = entries.length < 3 ? entries.length : 3;
    var len = entries.length;
    agendaTabSize = len;
    for (var i = 0; i < len; i++) {

        var tr = document.createElement('tr');
	tr.setAttribute("id", "tr" + i);
        var entry = entries[i];
        var title = entry.summary;
        var content = entry.description ? entry.description : '';

	if (content.length > 200)
	    content = content.substring(0,200) + "...";
    //  console.log(content);
        //stocage de la date
        var startDateTime = new Date(entry.start.dateTime);
        var startJSDate = null;
        var times = entry.start.dateTime;
        if (times.length > 0) {
          //startDateTime = times[0].getStartTime();
          //startDateTime = new Date();
          //startJSDate = startDateTime.getDate();
          startJSDate = new Date();

        }
        var dateString = " <div id=\"ag" + i + "\"class=\"date\"><p>" + startDateTime.getDate() + "<span>" + month[startDateTime.getMonth()] + "</span></p>";
//	if (!startDateTime.isDateOnly()) {
//	    dateString += " " + startJSDate.getHours() + ":" +
//		padNumber(startJSDate.getMinutes());
//	}
        var td = document.createElement('td');
        td.innerHTML = dateString;
        tr.appendChild(td);

        td = document.createElement('td');
        td.innerHTML = "<h4>" + title
                + (startDateTime ? " | " + startDateTime.getHours() + "h" + padNumber(startDateTime.getMinutes()) : "") + "</h4> "
                + content;
        tr.appendChild(td);

        eventDiv.appendChild(tr);
    }


}
