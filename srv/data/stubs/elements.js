var q = require('q');
var stubs = [
  {"id":"A1","model_element":"Customer Order","tags": ["web","form","paper","planning","survey"]},
  {"id":"A2","model_element":"Appointment","tags": ["calendar","participant","customer","period","slot","place","venue"]},
  {"id":"A3","model_element":"Offer","tags": ["documentation","text","paper","planning","resource","consumption","estimate"]},
  {"id":"A4","model_element":"Competitive Comparison","tags": ["analysis","investigation","competitor","price","overview"]},
  {"id":"A5","model_element":"Brochures/Leaflets","tags": ["marketing","advertising","paper","print","customer","contact","post"]},
  {"id":"A6","model_element":"Bill / Invoice","tags": ["prices","consumption","list","bill","invoice","resources","customer","participant","document","payment"]},
  {"id":"A7","model_element":"Consumption Analysis","tags": ["consumption","list","price","overview","bill","invoice"]},
  {"id":"A8","model_element":"Approach","tags": ["drive","road","access","way","route","journey","duration","cost","planning"]},
  {"id":"A9","model_element":"Delivery","tags": ["drive","delivery","shipping","transport","costs","duration","route capacity"]},
  {"id":"A10","model_element":"Material Consumption","tags": ["consumption","documentation","stock","warehouse","order","overview"]},
  {"id":"A11","model_element":"Documentation","tags": ["documentation","resource","process","text","model","design","image","video"]},
  {"id":"A12","model_element":"Photos","tags": ["photo","resource","design","document","image"]},
  {"id":"A13","model_element":"Videos","tags": ["video","resource","design","document","image"]},
  {"id":"A14","model_element":"Prototypes","tags": ["prototype","design","process","model"]},
  {"id":"A15","model_element":"Designs","tags": ["design","resource","prototype"]},
  {"id":"A16","model_element":"Sketches","tags": ["design","drawing","sketch","paper","prototype"]},
  {"id":"A17","model_element":"Paper Model","tags": ["design","3D", "3D model","paper","prototype"]},
  {"id":"A18","model_element":"Plans","tags": ["plan","document","documentation","process","resource"]},
  {"id":"A19","model_element":"Schedule","tags": ["plan","time","document","outline","logistics","management","organization"]},
  {"id":"A20","model_element":"Participant","tags": ["participants","actor","invitation","schedule","appointment","place","venue"]},
  {"id":"A21","model_element":"Invitation","tags": ["Participants","actor","invitation","event","time","customer","place","space","appointment"]},
  {"id":"A22","model_element":"Spaces/Rooms","tags": ["place","venue","room","booking","event","appointment"]},
  {"id":"A23","model_element":"Place","tags": ["place","location","map","space"]},
  {"id":"A24","model_element":"Permits","tags": ["approval","authority","contact","timings","permit"]},
  {"id":"A25","model_element":"Maps","tags": ["map","geography","place","GPS","GIS","transport","planning"]},
  {"id":"A26","model_element":"Transport","tags": ["road","drive","route","load","cargo","plan","map","shipping","delivery","pickup","capacity","route","cost"]},
  {"id":"A27","model_element":"Pickup","tags": ["drive","transportation","route","cargo","load","pickup","transport","cost"]},
  {"id":"A28","model_element":"Reviews","tags": ["reviews","opinion","customer","review","rating","reputation"]},
  {"id":"A29","model_element":"Customer File","tags": ["file","records","participant","text","customer","contact","management","survey"]},
  {"id":"A30","model_element":"Time tracking / Timesheet","tags": ["recording","consumed","time","resource","planning"]},
  {"id":"A31","model_element":"Exchange/Substitute","tags": ["stock","inventory","management","planning","customer","reputation"]},
  {"id":"A32","model_element":"Spare parts","tags": ["spare","substitute","usage","warehouse","management","purchase","shopping"]},
  {"id":"A33","model_element":"Assistance/Support","tags":["solution","assistance","help","customer","call","request","spontaneously"]},
  {"id":"A34","model_element":"Experts","tags":["expert","stakeholder","participant","problem","help","assistance","emergency"]},
  {"id":"A35","model_element":"Solutions Research","tags": ["research","documents","solution","help","assistance","emergency"]},
  {"id":"A36","model_element":"Instructions","tags": ["document","text","instructions","help","documentation"]},
  {"id":"A37","model_element":"Workarounds","tags": ["help","immediate","workaround","experts","solution"]},
  {"id":"A38","model_element":"Ad-hoc Solutions","tags": ["instant","help","temporary","solution"]},
  {"id":"A39","model_element":"Diagnosis Guide","tags": ["help","diagnosis","expert","document","resource"]},
  {"id":"A40","model_element":"Diagnosis Device","tags": ["aid","device","diagnostic","expert","resource"]},
  {"id":"A41","model_element":"Machine messages/signals","tags": ["diagnosis","history","overview","document"]},
  {"id":"A42","model_element":"Advertising","tags": ["paper","advertising","companies","print","customer","contact","newspaper"]},
  {"id":"A43","model_element":"Newspaper Advertisement","tags": ["newspaper","paper","advertising","customer","contact","print","newspaper"]},
  {"id":"A44","model_element":"Customer Loyalty","tags": ["actor","user","customer","loyalty","contact","relationship"]},
  {"id":"A45","model_element":"Supervision","tags": ["actor","customer","support","contact","follow-up"]},
  {"id":"A46","model_element":"Follow-up","tags": ["actor","customer","follow-up","contact","call","text"]},
  {"id":"A47","model_element":"Maintenance Schedule","tags": ["maintenance","machine","plan","resource","document"]},
  {"id":"A48","model_element":"Customer Management","tags": ["actor","customer","user","platform","administration","contact","management"]},
  {"id":"A49","model_element":"Stand-by for emergency","tags": ["emergency","contact","customer","help","immediate","urgent"]},
  {"id":"A50","model_element":"Calls","tags": ["telehone","call","customer","contact"]},
  {"id":"A51","model_element":"Messages","tags": ["text","message","customer","actor","user","contact"]},
  {"id":"A52","model_element":"Mailing List","tags": ["customer","address","contact","management","contacts overview","group"]},
  {"id":"A53","model_element":"Logistics Planning","tags": ["logistics","logistic planning","planning","transportation","capacity","duration","cost","overview","management"]},
  {"id":"A54","model_element":"Purchase","tags": ["planning","purchase","prices","costs","capacity"]},
  {"id":"A55","model_element":"Web presence","tags": ["company","profile","presentation","customer","contacts","fair","web","email","call","resource","reputation"]},
  {"id":"A56","model_element":"Model","tags": ["design","resource","prototype"]},
  {"id":"A57","model_element":"Stock/Storage/Warehouse","tags": ["planning","purchase","consumption","usage","resource","stock","inventory"]},
  {"id":"A58","model_element":"Financial Planning","tags": ["bill","billing","account","invoice","planning","summary","overview","status","finance","budget"]},
  {"id":"A59","model_element":"Material Planning","tags":["planning","stock","inventory","usage","consumption","resources","documentation"]},
  {"id":"A60","model_element":"Recommendation","tags": ["customer","actor","user","reputation","recommendation","acquisition"]}

];

var lastStubIndex = stubs.length;

function getAll() {
    return q(stubs);
}

function getOne(id) {
    var element = null;
    stubs.some( function(stub)  {
        element = stub.id == id ? stub : null;
        return element;
    });
    return q(element);
}

function save(element) {
    element.id = ++lastStubIndex;
    stubs.push(element);
    return q(element);
}

function update(element) {
    var stubToUpdateIndex = _getStubIndexById(element.id);
    stubs[stubToUpdateIndex] = element;
    return q(element);
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
