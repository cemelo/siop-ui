define([
  "dojo/_base/declare", // declare
  "dojo/query",
  "dojo/dom-construct",
  "dojo/text!./templates/Group.html",
  "dijit/_Container",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
], function(
  declare, query, domConstruct, template,

  _Container, _WidgetBase, _TemplatedMixin) {

  // module:
  //    siop/menu/MenuGroup

  return declare("siop.menu.Group",
    [_Container, _WidgetBase, _TemplatedMixin], {
    // summary:
    //    A group of menu items.

    templateString: template,

    baseClass: 'MenuGroup',

    _fillContent: function() {
      // summary:
      //    When Menu is declared in markup, this code gets the menu label and
      //    the popup widget from the srcNodeRef.
      // description:
      //    srcNodeRef.innerHTML contains both the menu item text and a popup widget
      //    The first part holds the menu item text and the second part is the popup
      // example:
      // |  <div data-dojo-type="dijit/PopupMenuItem">
      // |    <span>pick me</span>
      // |    <popup> ... </popup>
      // |  </div>
      // tags:
      //    protected

      if (this.srcNodeRef) {
        var labelNode = this.srcNodeRef.firstElementChild;

        if (labelNode && !("label" in this.params)){
          this._set('label', labelNode.innerHTML);
        }

        domConstruct.destroy(labelNode);
        this.inherited(arguments);
      }
    },

    buildRendering: function(){
      this.inherited(arguments);
      this.labelNode.innerHTML = this.label;
    },

    _onItemFocus: function(el) {
      this.getParent()._onItemFocus(el);
    }
  });
});
