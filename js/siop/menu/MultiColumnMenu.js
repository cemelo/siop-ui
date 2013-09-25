define([
  "dojo/_base/declare", // declare
  "dojo/_base/array", // array
  "dojo/_base/lang", // lang
  "dojo/keys", // keys
  "dojo/query",
  "dojo/dom",
  "dojo/dom-construct",
  "dijit/focus",
  "dijit/registry",
  "dojo/text!./templates/MultiColumnMenu.html",

  "dijit/_OnDijitClickMixin",
  "dijit/_MenuBase",
  "./Column",

  "dojo/NodeList-traverse"
], function(
  declare, array, lang, keys, query, dom, domConstruct, focusUtil, registry,
  template,

  /* Parents */
  _OnDijitClickMixin, _MenuBase, Column) {

  // module:
  //    siop/menu/MultiColumnMenu

  return declare("siop.menu.MultiColumnMenu",
    [_MenuBase, _OnDijitClickMixin], {
    // summary:
    //    A group of menu items.

    _columnNodes: [],

    templateString: template,

    baseClass: 'siopMenuGroup',

    childSelector: '.siopMenuItem',

    columns: 4,

    _createColumns: function() {
      for (i = 0; i < this.columns; i++) {
        var column = domConstruct
          .toDom('<div class="siopMenuColumn" '
            + 'data-dojo-attach-point="columnNode_' + i + '"></div>');
        this._columnNodes.push(column);
        domConstruct.place(column, this.containerNode);
      }
    },

    _getSmallestColumnNode: function() {
      var minIndex = 0;
      var minLength = Number.POSITIVE_INFINITY;
      
      array.forEach(this._columnNodes, function (node, i) {
        var colLength = 0;
        var colGroups = node.children;
        
        array.forEach(colGroups, function (group, i) {
          colLength += colGroups[i].children.length;
        });

        if (colLength < minLength) {
          minLength = colLength;
          minIndex = i;
        }
      });

      return this._columnNodes[minIndex];
    },

    buildRendering: function() {
      this.inherited(arguments);

      this._createColumns();

      var children = query('> :not(.siopMenuColumn)', this.containerNode);
      var self = this;

      array.forEach(children, function (group, i) {
        var columnNode = self._getSmallestColumnNode();
        domConstruct.place(group, columnNode);
      });

      array.forEach(this._columnNodes, function (node, i) {
        domConstruct.place(node, self.containerNode);
      });
    },

    getChildItems: function() {
      var children = [];
      var groups = this.getChildren();

      for (i in groups) {
        var items = groups[i].getChildren();
        for (j in items) {
          children.push(items[j]);
        }
      }

      return children;
    },

    _getCurrentColumnGroups: function() {
      var col = null;

      if (this.focusedChild) {
        col = query(this.focusedChild.getParent().domNode).parent();
      } else {
        col = query('> .siopMenuColumn', this.containerNode).first();
      }

      var children = [];

      array.forEach(col.children(), function (group, i) {
        children.push(registry.byNode(group));
      });

      return children;
    },

    _getNextGroup: function(group, dir) {
      var node = query(group)[dir < 0 ? 'prev' : 'next']();

      if (node.length == 0) {
        node = query(group).parent()
          .children()[dir < 0 ? 'last' : 'first']();
      }

      return registry.byNode(node[0]);
    },

    _getFirst: function() {
      // summary:
      //    Returns the first child of the current column.
      // tags:
      //    abstract extension

      var group = (this.focusedChild) ?
        this.focusedChild.getParent().domNode :
        this.getChildren()[0].domNode;

      return this._getNextGroup(group, 1).getChildren()[0];
    },

    _getLast: function() {
      // summary:
      //    Returns the last child of the current column.
      // tags:
      //    abstract extension

      var group = (this.focusedChild) ?
        this.focusedChild.getParent().domNode :
        this.getChildren()[0].domNode;
      
      var children = this._getNextGroup(group, -1).getChildren();

      return children[children.length - 1];
    },

    // Arrow key navigation
    _onUpArrow: function() {
      this.focusPrev();
    },

    _onDownArrow: function() {
      this.focusNext();
    },

    _onRightArrow: function(/*Event*/ evt) {
      
    },

    _onLeftArrow: function() {
      
    }
  });
});
