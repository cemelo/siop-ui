define([
  'dojo/_base/declare',
  'dijit/MenuItem'
], function(declare, MenuItem) {


  return declare('siop.menu.MenuItem', [MenuItem], {
    baseClass: 'siopMenuItem'
  });
});