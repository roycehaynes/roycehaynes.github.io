// todo(royce): create a reset option

const SUCCESS_EVENT_TYPE = 'Success';
const FAILURE_EVENT_TYPE = 'Failure';

let initStorage = () => {

    var timeline = {
        "events": []
    }

    localStorage.setItem("timeline", JSON.stringify(timeline));
}

let stop = (event) => {
    event.preventDefault();
}

let getTimeline = () => {
    try {
        return JSON.parse(localStorage.getItem("timeline"));
    } catch(e) {
        if (e instanceof SyntaxError) {
            return initStorage();
        } else {
            throw e;
        }
    }
}

let updateTimeline = (timeline) => {
    console.log(timeline);
    tl = JSON.stringify(timeline);
    console.log(timeline);
    return localStorage.setItem("timeline", tl);
}

let groupAndSortEvents = (type, events) => {
    let _events = events.filter(event => event["type"] === type)
    _events = _events.sort((e1, e2) => {
        return e1["year"] - e2["year"]
    });
    return _events;
}


let appendElements = (type, events) => {

    let identifier = '';

    if(type == SUCCESS_EVENT_TYPE) {
        identifier = '#success';
    } else if(type == FAILURE_EVENT_TYPE) {
        identifier = '#failures';
    } else {
        return;
    }

    events.forEach(event => {
       let card = "<div class=\"card event mt-2 \">" +
       "<div class=\"card-body\">" +
       "<h5 class=\"card-title\">"+event["year"]+"</h5>" +
       "<p class=\"card-text\">"+event["desc"]+"</p>" +
       "</div>"+
       "</div>";

       $(identifier).append(card);
    });
}

// events

$("#add-event").submit(e => {

stop(e);
// form fields

const year = parseInt(e.target[0].value);
const desc = e.target[1].value;
const eventType = e.target[2].value;


// validate data
const currentYear = new Date().getFullYear();

if(isNaN(year) || year > currentYear || year < 1969) {
    alert("Please enter a valid year");
    stop(e);
    return;
}

if(desc.length <= 0 || desc === "" || desc.length > 240) {
    alert("Please keep description 240 characters or less");
    stop(e);
    return;
}

switch(eventType) {
    case 'Success':
        break;
    case 'Failure':
        break;
    default:
        alert("Please choose an event type");
        stop(e);
        return;
}

// store
const event = {
    "year": year,
    "desc": desc,
    "type": eventType
}

let tl = getTimeline();
tl["events"].push(event);
updateTimeline(tl);

// go to timeline page

e.target.submit();
});


$("a.reset-timeline").click(e => {
    if(window.confirm("Are you sure you want to delete your timeline? This action will clear all events.")){
        initStorage();
    }
});

$(window).on('load', function() {


    if(!localStorage.getItem("timeline")) {
        initStorage();
    }

    let pathName = window.location.pathname;

    if(pathName.includes("timeline.html")) {
        console.log("timelines page");

        // grab timeline
        let tl = getTimeline();

        // group by event type and sort by oldest to recent year
        let events = tl["events"];

        let successEvents = groupAndSortEvents(SUCCESS_EVENT_TYPE, events);
        let failureEvents = groupAndSortEvents(FAILURE_EVENT_TYPE, events);

        // add success event timeline
        appendElements(SUCCESS_EVENT_TYPE, successEvents)
        appendElements(FAILURE_EVENT_TYPE, failureEvents)


        // add failure event timeline

    }

});