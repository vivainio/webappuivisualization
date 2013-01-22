selectTab = (num, maxnum) ->

	first = """
	mwl.setGroupTarget("#tab_control_content", "#tab_#{num}_content", "show", "hide");
  	mwl.switchClass("#tab_#{num}", "tab_not_selected", "tab_selected");
  	"""

	rest = ("""mwl.setGroupTarget("#tab_control_content", "#tab_#{exc}_content", "show", "hide");""" \
		for exc in [1..maxnum] if exc != num).join " "
	return first + rest

exports.selectTab = selectTab
