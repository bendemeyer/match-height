(function ($) {
	$.fn.matchHeight = function (arg) {
		$.fn.matchHeight.count = $.fn.matchHeight ? $.fn.matchHeight + 1 : 1;
		
		var _this = this;
		
		function match(hander) {
		
			var run = true;
			
			if (typeof(handler) == 'function') {
				run = handler.call(_this);
			} else if (handler !== undefined) {
				run = handler;
			}
			
			if (run) {
				var maxHeight = 0;
				
				_this.each(function () {
					maxHeight = $(this).css('height', '').height() > maxHeight ? $(this).height() : maxHeight;
				});
				
				_this.css('height', maxHeight);
			} else {
				_this.css('height', '');
			}
		};
		
		$(window).on('resize.matchheight:' + curr, function () {
			match(arg);
		});
		
		_this.destroy = function () {
			$(window).off('resize.matchheight:' + curr);
		};
		
		match(arg);
		
		return this;
	};
})(jQuery);