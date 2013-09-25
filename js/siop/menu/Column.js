define([
  "dojo/_base/declare", // declare
  "dojo/text!./templates/Column.html",

  "dijit/layout/_LayoutWidget"
], function(
  declare,
  template,

  /* Parents */
  _LayoutWidget){

  // module:
  //    siop/menu/MultiColumnMenu

  return declare("siop.menu.Column",
    [_LayoutWidget], {
    // summary:
    //    A group of menu items.

    templateString: template,

    baseClass: 'siopMenuColumn'
  });
});
