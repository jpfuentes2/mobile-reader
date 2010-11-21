/*
 * jGFeed 1.0 - Google Feed API abstraction plugin for jQuery
 *
 * Copyright (c) 2009 jQuery HowTo
 *
 * Licensed under the GPL license:
 *   http://www.gnu.org/licenses/gpl.html
 *
 * URL:
 *   http://jquery-howto.blogspot.com
 *
 * Author URL:
 *   http://me.boo.uz
 *
 */
(function($){
  $.extend({
    jGFeed : function(url, fnk, num, key){
      // Make sure url to get is defined
      if(url == null) return false;
      // Build Google Feed API URL
      var pipe;
      var gurl = "http://www.poweringnews.com/feed-to-json.aspx?feedurl="+url;
      var gurl = 'http://pipes.yahoo.com/pipes/pipe.run?_callback=piper&_id=9oyONQzA2xGOkM4FqGIyXQ&_render=json&feed=http://del.icio.us/rss/popular/javascript';
      var gurl = 'http://pipes.yahoo.com/pipes/pipe.run?_id=rC8rwjy92xG1tszndLq02Q&_render=json&_callback=?';

      console.log(gurl);
      $.getJSON(gurl, function(data){
      	console.log(data);
        if(typeof fnk == 'function')
					fnk.call(this, data.responseData.feed);
				else
					return false;
      });
    }
  });
})(jQuery);

function piper() {

	alert('here');
}

