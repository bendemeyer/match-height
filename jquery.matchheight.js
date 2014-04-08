(function ($) {
	$.fn.matchHeight = function (mq, bool) {
		$.fn.matchHeight.count = $.fn.matchHeight ? $.fn.matchHeight + 1 : 1;
		var curr = $.fn.matchHeight.count;
		
		var _this = this;
		
		function match() {
		
			var query = testMediaQuery(mq);
			var support = query || supportsMediaQueries();
			
			if (query || (!support && bool)) {
				var maxHeight = 0;
				
				_this.each(function () {
					maxHeight = $(this).css('height', '').height() > maxHeight ? $(this).height() : maxHeight;
				});
				
				_this.css('height', maxHeight);
				
			} else {
			
				_this.css('height', '');
				
			}
		};
		
		
		//testing for Media Queries based on implementation of Modernizr's 'mq' method
		//http://modernizr.com/docs/#mq
		function testMediaQuery(mq) {

			var matchMedia = window.matchMedia || window.msMatchMedia;
			if (matchMedia) {
				return matchMedia(mq).matches;
			}

			var div = document.createElement('div');
			div.id = 'styleTester';
			div.innerHTML = '<style> @media ' + mq + ' { #styleTester { position: absolute; } }</style>';
			document.getElementsByTagName('body')[0].appendChild(div);
			var bool = (window.getComputedStyle ? getComputedStyle(div, null) : div.currentStyle)['position'] == 'absolute';
			div.parentNode.removeChild(div);

			return bool;

		};

		function supportsMediaQueries() {
			testMediaQuery('only all');
		};
		
		$(window).on('resize.matchheight:' + curr, function () {
			match(arg);
		});
		
		_this.destroy = function () {
			$(window).off('resize.matchheight:' + curr);
		};
		
		match();
		
		return this;
	};
})(jQuery);