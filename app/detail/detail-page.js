var frameModule = require("tns-core-modules/ui/frame");
var DetailViewModel = require("./detail-view-model");
var Observable = require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;
var detailViewModel = new DetailViewModel();

var press;
var temp;
var pageData;
var place;


var tempColors = [
    "#2400d8",
    "#181cf7",
    "#2857ff",
    "#3d87ff",
    "#56b0ff",
    "#75d3ff",
    "#99eaff",
    "#bcf8ff",
    "#eaffff",
    "#ffffea",
    "#fff1bc",
    "#ffd699",
    "#ffff75",
    "#ff7856",
    "#ff3d3d",
    "#f72735",
    "#d8152f",
    "#a50021"
];

function pageLoaded(args) {
    var page = args.object;
    temp = new ObservableArray();
    press = new ObservableArray();


    pageData = new Observable.fromObject({
        temp: temp,
        press: press
    });

    place = page.navigationContext.place;
    console.log(place);
    pageData.set("place", place);


    fetch("https://api.meteo.uniparthenope.it/products/wrf5/timeseries/"+ place +"?step=24")
        .then((response) => response.json())
        .then((data) => {
            var timeSeries=data['timeseries'];
            for (var i = 0; i < timeSeries.length; i++) {
                let date=timeSeries[i].dateTime;
                let year = date.substring(0, 4);
                let month = date.substring(4, 6);
                let day = date.substring(6, 8);
                let sDateTime=year + "-" + month + "-" + day;

                let color = temp2color(timeSeries[i].t2c);
                console.log(color);
                pageData.set("color_temp", color);

                temp.push({key: sDateTime, val: timeSeries[i].t2c});
                press.push({key: sDateTime, val: timeSeries[i].slp});
            }
        })
        .catch(error => console.error("ERROR DATA ", error));

    page.bindingContext = pageData;
}
exports.pageLoaded = pageLoaded;


function temp2color(temp) {
    var index=0;

    // -40 -30 -20 -15 -10 -5 0 3 6 9 12 15 18 21 25 30 40 50
    if (temp>=-40 && temp<-30) {
        index=0;
    } else if (temp>=-30 && temp<-20) {
        index=1;
    } else if (temp>=-20 && temp<-15) {
        index=2;
    } else if (temp>=-15 && temp<-10) {
        index=3;
    } else if (temp>=-10 && temp<-5) {
        index=4;
    } else if (temp>=-5 && temp<0) {
        index=5;
    } else if (temp>=0 && temp<3) {
        index=6;
    } else if (temp>=3 && temp<6) {
        index=7;
    } else if (temp>=6 && temp<9) {
        index=8;
    } else if (temp>=9 && temp<12) {
        index=9;
    } else if (temp>=12 && temp<15) {
        index=10;
    } else if (temp>=15 && temp<18) {
        index=11;
    } else if (temp>=18 && temp<21) {
        index=12;
    } else if (temp>=21 && temp<25) {
        index=13;
    } else if (temp>=25 && temp<30) {
        index=14;
    } else if (temp>=30 && temp<40) {
        index=15;
    } else if (temp>=40 && temp<50) {
        index=16;
    } else if (temp>=50 ) {
        index=17;
    }

    return tempColors[index];
}
