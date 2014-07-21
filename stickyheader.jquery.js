
jQuery.fn.extend({
	stickyHeader: function( options ){
        var settings = $.extend({
            mode 	: "stick",
            offset 	: 0,
            allowCutOffBottom: false
        }, options );
        
        var tables = this; 
        var stickyHeader, cutoffTop, cutoffBottom
        
        var windowScroll = function(){
			var currentPosition = $(window).scrollTop();

			if ( currentPosition > cutoffTop && currentPosition < cutoffBottom ) {
				stickyHeader.removeClass('hide');
				stickyHeader.css('top', settings.offset + 'px');
			}
			else {
				stickyHeader.addClass('hide');
			}
        };

        if (settings.mode == "stick") {
        	return tables.each(function(i){
				var table = tables[i];
				var tableClone = $(table).clone(true).empty().removeClass('stickyHeader');
				var theadClone = $(table).find('thead').clone(true);
				stickyHeader =  $('<div></div>').addClass('stickyHeader hide').attr('aria-hidden', 'true');
				stickyHeader.append(tableClone).find('table').append(theadClone);
				$(table).after(stickyHeader);

				var tableHeight = $(table).height();
				var tableWidth = $(table).width() + Number($(table).css('padding-left').replace(/px/ig,"")) + Number($(table).css('padding-right').replace(/px/ig,"")) + Number($(table).css('border-left-width').replace(/px/ig,"")) + Number($(table).css('border-right-width').replace(/px/ig,""));

				var headerCells = $(table).find('thead th');
				var headerCellHeight = $(headerCells[0]).height();

				var stickyHeaderCells = stickyHeader.find('th');
				stickyHeader.css('width', tableWidth);
				var cellWidths = [];
				for (var i = 0, l = headerCells.length; i < l; i++) {
					cellWidths[i] = $(headerCells[i]).innerWidth();
				}
				for (var i = 0, l = headerCells.length; i < l; i++) {
					$(stickyHeaderCells[i]).css('width', cellWidths[i]);
				}

				cutoffTop = $(table).offset().top;
				cutoffBottom = settings.allowCutOffBottom ? tableHeight + cutoffTop - headerCellHeight : 999999;

				$(window).on( "scroll", windowScroll );


        	});
        }

        else if (settings.mode == "unstick"){
        	return tables.each(function(i){
        		$('div.stickyHeader').remove()
				$(window).off( "scroll", windowScroll );
        	});        	
        }

        else if (settings.mode == "restick"){
        	return tables.each(function(i){
        		$('div.stickyHeader').remove()
        		$(window).off( "scroll", windowScroll );
        		tables.stickyHeader({ mode: "stick", offset: settings.offset, allowCutOffBottom: settings.allowCutOffBottom }).scroll()
        	});
        }


	}
});
