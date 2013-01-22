selectTab = (num, maxnum) ->

	console.log "Num is", num
	first = """
	mwl.setGroupTarget("#tab_control_content", "#tab_#{num}_content", "show", "hide");
  	mwl.switchClass("#tab_#{num}", "tab_not_selected", "tab_selected");
  	"""

	rest = ("""mwl.switchClass("#tab_#{exc}", "tab_selected", "tab_not_selected");""" \
		for exc in [1..maxnum] when exc!=num).join " "

	console.log(rest)
	return first + rest

exports.selectTab = selectTab
