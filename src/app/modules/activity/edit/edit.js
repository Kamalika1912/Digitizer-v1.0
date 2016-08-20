(function() {
  'use strict';
  angular.module('app.profile').controller('ActivityController', activityController);
  activityController.$inject = ['data', 'activityResource', '$state', 'shortHistory', 'notificator', '$http'];

  function activityController(data, activityResource, $state, shortHistory, notificator, $http) {
    var vm = this;
    vm.activity = data;
    vm.showReturnBtn = vm.activity.id && shortHistory.from.state.name;
    vm.update = function() {
      //vm.activity.date = (new Date()).toISOString();
      activityResource.update(vm.activity, function(p) {
        shortHistory.goTo('from');
        notificator.success('Activity was successfully updated')
      });
    };
    vm.return = function() {
      $state.go(shortHistory.from.state.name, shortHistory.from.params);
    };
    vm.save = function() {
      //vm.activity.date = (new Date()).toISOString();
      activityResource.save(this.activity, function(savedActivity) {
        shortHistory.goTo('from');
        notificator.success('Activity was successfully saved')
      });
    };

    vm.loadTags = function($query) {
      var tags = [{'text':'3D'},{'text':'GIS'},{'text':'GPS'},{'text':'OSM'},{'text':'participants'},{'text':'VoIP'},{'text':'access'},{'text':'accessibility'},{'text':'account'},{'text':'accounting'},{'text':'acquisition'},{'text':'actor'},{'text':'address'},{'text':'administration'},{'text':'administrator'},{'text':'advanced'},{'text':'advertisement'},{'text':'advertising'},{'text':'aid'},{'text':'analysis'},{'text':'android'},{'text':'app'},{'text':'appointment'},{'text':'approval'},{'text':'assistance'},{'text':'augmented reality'},{'text':'authority'},{'text':'availability'},{'text':'bill'},{'text':'billing'},{'text':'booking'},{'text':'budget'},{'text':'calendar'},{'text':'call'},{'text':'campaign'},{'text':'capacity'},{'text':'cargo'},{'text':'checking'},{'text':'checklists'},{'text':'community'},{'text':'companies'},{'text':'company'},{'text':'competition'},{'text':'competitor'},{'text':'consumed'},{'text':'consumption'},{'text':'contact'},{'text':'contacts'},{'text':'control'},{'text':'coordination'},{'text':'cost'},{'text':'costs'},{'text':'critical'},{'text':'customer'},{'text':'database'},{'text':'date'},{'text':'delivery'},{'text':'design'},{'text':'device'},{'text':'diagnose'},{'text':'diagnosis'},{'text':'diagnostic'},{'text':'diagram'},{'text':'digital'},{'text':'direct'},{'text':'discount'},{'text':'document'},{'text':'documentation'},{'text':'documents'},{'text':'doodle'},{'text':'download'},{'text':'drawing'},{'text':'drive'},{'text':'duration'},{'text':'email'},{'text':'emergency'},{'text':'estimate'},{'text':'event'},{'text':'exchange'},{'text':'expert'},{'text':'experts'},{'text':'fair'},{'text':'faq'},{'text':'file'},{'text':'finance'},{'text':'finances'},{'text':'finder'},{'text':'follow-up'},{'text':'form'},{'text':'geography'},{'text':'glasses'},{'text':'gps'},{'text':'group'},{'text':'help'},{'text':'history'},{'text':'hours'},{'text':'iOS'},{'text':'image'},{'text':'immediate'},{'text':'information'},{'text':'instant'},{'text':'instructions'},{'text':'inventory'},{'text':'investigation'},{'text':'invitation'},{'text':'invoice'},{'text':'journey'},{'text':'language'},{'text':'list'},{'text':'load'},{'text':'location'},{'text':'logistic'},{'text':'logistics'},{'text':'loyalty'},{'text':'machine'},{'text':'mail'},{'text':'mailing'},{'text':'maintenance'},{'text':'management'},{'text':'map'},{'text':'maps'},{'text':'marketing'},{'text':'material'},{'text':'message'},{'text':'milestone'},{'text':'model'},{'text':'monitoring'},{'text':'multimedia'},{'text':'newspaper'},{'text':'offer'},{'text':'opening'},{'text':'opinion'},{'text':'order'},{'text':'organisation'},{'text':'organization'},{'text':'outline'},{'text':'overview'},{'text':'paper'},{'text':'participant'},{'text':'participants'},{'text':'path'},{'text':'payment'},{'text':'period'},{'text':'permit'},{'text':'phone'},{'text':'photo'},{'text':'pickup'},{'text':'place'},{'text':'plan'},{'text':'planning'},{'text':'platform'},{'text':'poll'},{'text':'post'},{'text':'presentation'},{'text':'price'},{'text':'prices'},{'text':'print'},{'text':'printer'},{'text':'problem'},{'text':'process'},{'text':'product'},{'text':'profile'},{'text':'program'},{'text':'promotions'},{'text':'prototype'},{'text':'purchase'},{'text':'rating'},{'text':'reachability'},{'text':'receiver'},{'text':'recipient'},{'text':'recommendation'},{'text':'record'},{'text':'recording'},{'text':'records'},{'text':'registration'},{'text':'relationship'},{'text':'reminder'},{'text':'repository'},{'text':'reputation'},{'text':'request'},{'text':'research'},{'text':'reservation'},{'text':'resource'},{'text':'resources'},{'text':'review'},{'text':'reviews'},{'text':'road'},{'text':'room'},{'text':'route'},{'text':'satellite'},{'text':'schedule'},{'text':'secure'},{'text':'service'},{'text':'shipping'},{'text':'shopping'},{'text':'signed'},{'text':'sketch'},{'text':'skype'},{'text':'slot'},{'text':'smart'},{'text':'smartphone'},{'text':'sms'},{'text':'solution'},{'text':'space'},{'text':'spare'},{'text':'spontaneously'},{'text':'stakeholder'},{'text':'status'},{'text':'stock'},{'text':'streaming'},{'text':'substitute'},{'text':'summary'},{'text':'supply'},{'text':'support'},{'text':'survey'},{'text':'telephone'},{'text':'temporary'},{'text':'text'},{'text':'time'},{'text':'times'},{'text':'timings'},{'text':'tracking'},{'text':'transport'},{'text':'transportation'},{'text':'tts'},{'text':'urgent'},{'text':'usage'},{'text':'used'},{'text':'user'},{'text':'vcard'},{'text':'vector'},{'text':'venue'},{'text':'video'},{'text':'virtual reality'},{'text':'voting'},{'text':'warehouse'},{'text':'way'},{'text':'web'},{'text':'wireless'},{'text':'workaround'}];
        return tags.filter(function(tag) {
          return tag.text.toLowerCase().indexOf($query.toLowerCase()) != -1;
        });
    };

  }
})();