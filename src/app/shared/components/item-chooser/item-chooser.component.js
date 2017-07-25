(function () {
  'use strict';

  angular
    .module('shared')
    .component('ttItemChooser', {
      templateUrl: 'app/shared/components/item-chooser/item-chooser.component.html',
      controller: controller,
      controllerAs: '$ctrl',
      bindings: {
        objItem: '<',
        items: '<',
        label: '@'
      }
    });

  /** @ngInject */
  function controller($log) {
    var $ctrl = this;
    // $ctrl.items = [ "a", "x"];
    $ctrl.$onInit = function () {
      $log.log("Is", $ctrl.items);
      $ctrl.outItemId = !$ctrl.objItem.item ? $ctrl.items[0].getId() : $ctrl.objItem.item.getId();
      $log.log("Iid", $ctrl.outItemId);
    }

    $ctrl.$onDestroy = function () {
    }

    $ctrl.update = function() {
       $ctrl.objItem.item = findFromId($ctrl.outItemId);
    }

    function findFromId(id) {
        var itms = $ctrl.items;
        for (var i = 0; i < itms.length; i++) {
            var itm = itms[i];
            if (itm.getId() == id) {
                $log.log("find", itm);
                return itm;
            }
        }
        $log.log("find null", itms);
        return null;
    }
  }

})();
