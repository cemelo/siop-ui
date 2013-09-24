define([
  "dojo/_base/declare",
  "dojo/query",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dijit/_OnDijitClickMixin",
  "dojo/text!./templates/ViewSelector.html"
], function(declare, dj, _WidgetBase, _TemplatedMixin,
  _OnDijitClickMixin, template) {

  var ViewSelector = declare(
    "siop.ViewSelector",
    [_WidgetBase, _TemplatedMixin, _OnDijitClickMixin],
    {
      templateString: template,

      baseClass: "siopViewSelector",

      selectedView: "Órgão",

      showListText: "Mostrar Lista",

      _onClick: function() {
        console.log('click');
      }
    });

  return ViewSelector;
});