var Feed, FeedAppView, FeedView, Feeds;
Feed = (Feeds = (FeedView = (FeedAppView = null)));
$(document).ready(function() {
  var App, FeedList, feedUrl, pipe;
  Feed = Backbone.Model.extend({
    initialize: function() {
      this.attributes['read'] = false;
      return (this.attributes['like'] = false);
    }
  });
  FeedList = Backbone.Collection.extend({
    model: Feed,
    comparator: function(feed) {
      return feed.get('createdAt');
    }
  });
  Feeds = new FeedList();
  FeedView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#item-template').html()),
    events: {
      'click a': 'togglePreview'
    },
    initialize: function() {
      return (this.model.view = this);
    },
    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      this.setContent();
      return this;
    },
    setContent: function() {
      var title;
      title = $.trim(this.model.get('title'));
      console.log(title);
      return $(this.el).attr('data-icon', 'up');
    },
    togglePreview: function(e) {
      this.toggleRead($(this.el).hasClass('preview'));
      return $(this.el).toggleClass('preview ui-btn-icon-right').find('div.item-content').toggle();
    },
    collapse: function() {},
    toggleLike: function(btn) {
      btn.toggleClass('likes');
      return this.model.toggleLike(btn.hasClass('likes'));
    },
    markUnread: function() {
      return this.toggleRead(false);
    },
    toggleRead: function(bool) {
      return this.model.set({
        read: bool
      });
    }
  });
  FeedAppView = Backbone.View.extend({
    tagName: 'ul',
    events: {},
    initialize: function() {
      _.bindAll(this, 'addItem', 'addAll', 'render');
      $('#content').append(this.make('ul', {
        className: 'stuff'
      }));
      return (this.list = $('#content > ul'));
    },
    addItem: function(item) {
      var view;
      view = new FeedView({
        model: item
      });
      return this.list.append(view.render().el);
    },
    addAll: function() {
      Feeds.each(this.addItem);
      return this.list.listview();
    }
  });
  App = null;
  feedUrl = 'http://pipes.yahoo.com/pipes/pipe.run?_id=rC8rwjy92xG1tszndLq02Q&_render=json&_callback=?';
  pipe = null;
  $.getJSON(feedUrl, function(data) {
    var _i, _len, _ref, feed;
    _ref = data.value.items;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      feed = _ref[_i];
      Feeds.add(feed);
    }
    return App.addAll();
  });
  return (App = new FeedAppView());
});