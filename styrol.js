(function ($) {
	function _prepare_select(select) {
		var parent = $(select.parent());
		var options = select.find('option');
		var ssel = $('<div class="styrol select"></div>');
		var current = $('<a class="current" href="#">...</a>');
		var ul = $('<ul></ul>');

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
		parent.find('.styrol.select').remove();
		select.hide();
		ssel.insertAfter(select);
	}

	function _prepare_checkbox(box) {
		var parent = $(box.parent());
		var sbox = $('<a class="styrol checkbox" href="#"><span></span></a>');
		var clickables = sbox;

		if (box.attr('id')) clickables = $.merge(clickables, $('label[for="' + box.attr('id') + '"]'));

		clickables.click(function(){
			var value = box.prop('checked');
			box.prop('checked', !value);
			box.change();
			if (value) sbox.removeClass('checked');
			else sbox.addClass('checked');
			return false;
		});

		if (box.prop('checked')) sbox.addClass('checked');

		// show
		parent.find('.styrol.checkbox').remove();
		box.hide();
		sbox.insertAfter(box);
	}

	$.fn.styrol = function () {
		return this.each(function() {
			var el = $(this);
			if (el.is('select')) _prepare_select(el);
			if (el.is('input[type="checkbox"]')) _prepare_checkbox(el);
			return this;
		});
	}
} (jQuery));
