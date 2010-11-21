Feed = Feeds = FeedView = FeedAppView = null
$(document).ready ->
	Feed = Backbone.Model.extend
		initialize: ->
			@attributes['read'] = false
			@attributes['like'] = false

	FeedList = Backbone.Collection.extend
		model: Feed

		comparator: (feed) ->
			feed.get('createdAt')

	Feeds = new FeedList

	FeedView = Backbone.View.extend
		tagName: 'li'
		template: _.template($('#item-template').html())
		events:
			'click a': 'togglePreview'

		initialize: ->
			#_.bindAll @, 'render'
			#@model.bind('change', @render)
			@model.view = @

		render: ->
			$(@el).html(@template(@model.toJSON()))
			@setContent()
			@

		setContent: ->
			title = $.trim(@model.get('title'))
			console.log title
			$(@el).attr('data-icon', 'up')
			#.append('<a href="#"></a>')

		togglePreview: (e) ->
			@toggleRead $(@el).hasClass('preview')
			$(@el).toggleClass('preview ui-btn-icon-right').find('div.item-content').toggle()

		collapse: ->

		toggleLike: (btn) ->
			btn.toggleClass 'likes'
			@model.toggleLike btn.hasClass('likes')

		markUnread: -> @toggleRead false

		toggleRead: (bool) -> @model.set {read: bool}

	FeedAppView = Backbone.View.extend
		tagName: 'ul'

		events: {}

		initialize: ->
			_.bindAll(@, 'addItem', 'addAll', 'render')
			$('#content').append(@make('ul', { className: 'stuff' }))
			@list = $('#content > ul')

		addItem: (item) ->
			view = new FeedView(model: item)
			@list.append(view.render().el)

		addAll: ->
			Feeds.each @addItem
			@list.listview()

	App = null
	feedUrl = 'http://pipes.yahoo.com/pipes/pipe.run?_id=rC8rwjy92xG1tszndLq02Q&_render=json&_callback=?'
	pipe = null

	$.getJSON feedUrl, (data) ->
		for feed in data.value.items
			Feeds.add(feed)
		App.addAll()

	App = new FeedAppView
