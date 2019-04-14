let application = require("tns-core-modules/application");
require('tns-i18n')('en');

global.url_api = "https://api.meteo.uniparthenope.it/";
global.contatore = 0;
global.place_selected = "";
global.global_id = " ";
global.global_data = " ";
global.max_data = " ";

application.run({ moduleName: "app-root" });

application.on(application.exitEvent, (args) => {
    if (args.android) {
        contatore = 0;
        global_id = " ";
        console.log("Exit: " + args.android);
    } else if (args.ios) {
        contatore = 0;
        global_id = " ";
        console.log("Exit: " + args.ios);
    }
});


application.on(application.suspendEvent, (args) => {
    if (args.android) {
        contatore = 1;
        console.log("Suspend: " + args.android);
    } else if (args.ios) {
        contatore = 1;
        console.log("Suspend: " + args.ios);
    }
});