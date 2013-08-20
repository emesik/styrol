(function ($) {

	$.fn.styrol_select = function () {
		var select = $(this);
		var parent = $(select.parent());
		var options = select.find('option');
		var ssel = $('<div class="styrol wrapper"></div>');
		var current = $('<a class="current" href="#">...</a>');
		var ul = $('<ul class="select"></ul>');

		for (var o=0; o < options.length; o++) {
			var option = $(options[o]);
			var li = $('<li class="option"></li>');
			var a = $('<a href="#" data-value="' + option.attr('value') + '">' + option.text() + '</a>');
			a.click(function(){
				var value = $(this).attr('data-value');
				select.val(value);
				select.change();
				current.html($(this).html());
				ul.slideUp('fast');
				return false;
			});
			li.append(a);
			ul.append(li);
		}

		// use the label of the default value
		var selected_label = ul.find('a[data-value="' + select.val() + '"]').html();
		if (selected_label) current.html(selected_label);

		current.click(function(){
			ul.slideToggle('fast');
			return false;
		});

		// show
		ssel.append(current);
		ssel.append(ul);
		ul.hide();
		select.hide();
		ssel.insertAfter(select);

		return this;
	}

} (jQuery));
