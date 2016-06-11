var q = require('q');
var stubs = [
  {"id":"D1","digital_component":"Web Form","tags":["form", "web", "database", "overview", "information", "customer", "actor"]},
  {"id":"D2","digital_component":"Appointment","tags":["appointment", "finder", "doodle", "user", "organisation", "poll", "voting", "coordination"]},
  {"id":"D3","digital_component":"Digital Document","tags":["signed", "document", "mail", "resource", "text", "exchange"]},
  {"id":"D4","digital_component":"Digital Advertising","tags":["marketing", "web", "advertisement", "offer", "contact", "customer"]},
  {"id":"D5","digital_component":"Digital Lists","tags":["checklists", "prices", "consumption", "used hours", "status", "checking", "monitoring", "control", "survey"]},
  {"id":"D6","digital_component":"Routes","tags":["maps", "GPS", "route", "way", "costs", "duration"]},
  {"id":"D7","digital_component":"Blog","tags":["document", "multimedia", "photo", "video", "documentation", "overview", "summary", "resource"]},
  {"id":"D8","digital_component":"Photo Database","tags":["photo", "database", "document", "overview", "resource", "documentation"]},
  {"id":"D9","digital_component":"Video Streaming","tags":["multimedia", "resource", "video", "streaming"]},
  {"id":"D10","digital_component":"3D Printer","tags":["prototype", "3D", "design", "printer", "resource"]},
  {"id":"D11","digital_component":"Digital Image","tags":["prototype", "design", "image", "photo", "resource"]},
  {"id":"D12","digital_component":"Graphics tablets","tags":["sketch", "design", "diagram", "resource", "prototype"]},
  {"id":"D13","digital_component":"3D Model","tags":["prototype", "3D", "printer", "model", "design", "resource"]},
  {"id":"D14","digital_component":"Vector Plans","tags":["document", "plan", "diagram", "resource", "design", "vector"]},
  {"id":"D15","digital_component":"Gantt-Charts","tags":["planning", "process", "critical", "milestone", "path"]},
  {"id":"D16","digital_component":"vCards","tags":["address", "actor", "customer", "user", "contact", "availability", "email"]},
  {"id":"D17","digital_component":"Invitation Management","tags":["event", "invitation", "planning", "actor", "customer", "user", "overview", "summary"]},
  {"id":"D18","digital_component":"Room Booking","tags":["place", "venue", "location", "room", "reservation", "capacity", "event", "organisation"]},
  {"id":"D19","digital_component":"Room Reservation","tags":["place", "venue", "location", "map", "database", "event", "room", "organisation", "overview", "summary", "database"]},
  {"id":"D20","digital_component":"Authority access","tags":["authority", "administrator", "approval", "opening", "times", "contact", "schedule"]},
  {"id":"D21","digital_component":"Digital Maps","tags":["maps", "geography", "satellite", "OSM", "GIS"]},
  {"id":"D22","digital_component":"Transportation Service","tags":["transportation", "drive", "load", "cargo", "route", "way", "map", "cost", "duration", "capacity"]},
  {"id":"D23","digital_component":"Review Portals","tags":["opinion", "review", "customer", "user", "rating", "reputation", "actor"]},
  {"id":"D24","digital_component":"Digital Customer Records","tags":["file", "record", "document", "digital", "text", "user", "video", "photo", "customer"]},
  {"id":"D25","digital_component":"Logging Systems","tags":["registration", "time", "consumption", "status", "cost", "planning"]},
  {"id":"D26","digital_component":"Replacement Service","tags":["inventory", "management", "planning", "spare", "overview", "summary"]},
  {"id":"D27","digital_component":"Spare Parts Management","tags":["stock", "inventory", "planning", "spare", "overview", "summary"]},
  {"id":"D28","digital_component":"Solutions Database","tags":["database", "solution", "experts", "overview", "summary"]},
  {"id":"D29","digital_component":"Experts Finder","tags":["database", "experts", "vcard", "actor", "user", "help", "support"]},
  {"id":"D30","digital_component":"Internet Research","tags":["web", "research", "information", "competition", "status", "product"]},
  {"id":"D31","digital_component":"Multimedia Document","tags":["multimedia", "document", "video", "text", "model", "help", "support"]},
  {"id":"D32","digital_component":"FAQ","tags":["multimedia", "faq", "help", "support", "immediate"]},
  {"id":"D33","digital_component":"Event History","tags":["event", "help", "support", "history", "platform", "documentation"]},
  {"id":"D34","digital_component":"Dashboard","tags":["diagnose", "overview", "summary", "device", "status", "emergency"]},
  {"id":"D35","digital_component":"PDFs","tags":["documentation", "process", "text", "resource", "signed"]},
  {"id":"D36","digital_component":"Digital Advertising","tags":["offer", "advertisement", "promotions", "customer", "user", "contact", "address", "campaign", "web"]},
  {"id":"D37","digital_component":"Call","tags":["actor", "customer", "user", "contact", "telephone", "phone", "call", "skype"]},
  {"id":"D38","digital_component":"Voucher/Coupon","tags":["actor", "customer", "user", "contact", "discount", "offer"]},
  {"id":"D39","digital_component":"Mailing","tags":["customer", "user", "actor", "relationship", "text", "contact", "offer", "resource", "mailing"]},
  {"id":"D40","digital_component":"Reminder System","tags":["reminder", "plan", "maintenance", "schedule"]},
  {"id":"D41","digital_component":"Customer Community","tags":["actor", "customer", "user", "management", "community", "contact", "platform"]},
  {"id":"D42","digital_component":"Emergency Contacts","tags":["text", "tts", "customer", "user", "help", "support", "reachability", "accessibility", "call"]},
  {"id":"D43","digital_component":"VoIP Service","tags":["VoIP", "telephone", "call", "contact", "customer", "user", "call"]},
  {"id":"D44","digital_component":"E-Mail Database","tags":["text", "contact", "customer", "user", "recipient", "receiver", "database", "management", "overview", "summary"]},
  {"id":"D45","digital_component":"Digital Address Lists","tags":["email", "address", "mailing", "customer", "user", "contact", "resource", "group"]},
  {"id":"D46","digital_component":"Digital Logistics Planning","tags":["GPS", "planning", "transportation", "place", "venue", "location", "delivery", "capacity", "costs", "duration", "date", "appointment"]},
  {"id":"D47","digital_component":"Group Calendar","tags":["customer", "user", "appointment", "calendar", "actor", "overview", "summary", "organisation"]},
  {"id":"D48","digital_component":"Company representation","tags":["company", "profile", "customer", "user", "contact", "web", "resource"]},
  {"id":"D49","digital_component":"Data Repository","tags":["database", "repository", "multimedia", "customer", "user", "document", "documentation", "overview", "summary", "planning", "room"]},
  {"id":"D50","digital_component":"Organisations Systems","tags":["organisation", "planning", "overview", "summary", "logistic"]},
  {"id":"D51","digital_component":"Prototyping","tags":["prototype", "resource", "design"]},
  {"id":"D52","digital_component":"Journey Management","tags":["logistics", "transport", "shipping", "delivery", "place", "venue", "location", "overview", "summary", "planning"]},
  {"id":"D53","digital_component":"Fax","tags":["contact", "customer", "user", "text", "document"]},
  {"id":"D54","digital_component":"App","tags":["smartphone", "app", "program", "download"]},
  {"id":"D55","digital_component":"SMS","tags":["smartphone", "sms", "contact", "emergency"]},
  {"id":"D56","digital_component":"Smartphone","tags":["augmented reality", "glasses", "smartphone", "android", "iOS"]},
  {"id":"D57","digital_component":"Augmented Reality","tags":["augmented reality", "glasses", "smartphone", "smart", "app", "advanced", "prototype"]},
  {"id":"D58","digital_component":"Wireless","tags":["wireless", "contact", "language", "direct"]},
  {"id":"D59","digital_component":"GPS-Tracking","tags":["GPS", "delivery", "status", "tracking", "transportation", "drive", "duration", "overview", "summary", "costs", "place", "venue", "location"]},
  {"id":"D60","digital_component":"Payment Service Provider","tags":["secure", "payment", "service", "customer", "user", "accounting", "overview", "summary", "finances"]},
  {"id":"D61","digital_component":"Smart Glasses","tags":["glasses", "smart", "app", "virtual reality", "augmented reality", "prototype"]},
  {"id":"D62","digital_component":"Recommendation Systems","tags":["review", "customer", "user", "actor", "rating", "reputation", "recommendation", "related products"]},
  {"id":"D63","digital_component":"Supply Management","tags":["planning", "stock", "inventory", "supply", "material", "stock", "consumption", "overview", "summary"]}
];

var lastStubIndex = stubs.length;

function getAll() {
    return q(stubs);
}

function getOne(id) {
    var digitalService = null;
    stubs.some( function(stub)  {
        digitalService = stub.id == id ? stub : null;
        return digitalService;
    });
    return q(digitalService);
}

function save(digitalService) {
    digitalService.id = ++lastStubIndex;
    stubs.push(digitalService);
    return q(digitalService);
}

function update(digitalService) {
    var stubToUpdateIndex = _getStubIndexById(digitalService.id);
    stubs[stubToUpdateIndex] = digitalService;
    return q(digitalService);
}

function remove(id) {
    var stubToDeleteIndex = _getStubIndexById(id);
    stubToDeleteIndex != -1 && stubs.splice(stubToDeleteIndex,1);
    return q(stubToDeleteIndex != -1 && id);
}

function _getStubIndexById(id) {
    var stubIndex = -1;
    stubs.some( function(stub, index)  {
        var isFound = stub.id == id;
        stubIndex = isFound ? index : -1
        return isFound;
    });
    return stubIndex;
}

exports.getAll =  getAll;
exports.getOne = getOne;
exports.remove = remove;
exports.update = update;
exports.save = save;
