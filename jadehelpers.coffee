class TabBar
	constructor: (@prefix, @numtabs) ->

	sel: (num) ->
		tabbar = @prefix + "TabBar"
		contpane = @prefix + "TabControlContent"
		tabid = "#" + @prefix + "Tab_" + num
		s = """      mwl.setGroupTarget("##{contpane}", "#{tabid}_content", "show", "hide");      mwl.setGroupTarget("##{tabbar}", "#{tabid}", "tab_selected", "tab_not_selected");
		"""
		return s

	trId: -> "#{@prefix}TabBar" 
	tdId: (tabnum) -> "#{@prefix}Tab_#{tabnum}"

	classesFirst: ->
		return ['tab', "tab_#{@numtabs}_tabs", "tab_selected"]

	classes: ->
		return ['tab', "tab_#{@numtabs}_tabs", "tab_not_selected"]
	classesLast: ->
		return ['tab', "tab_#{@numtabs}_tabs_right", "tab_not_selected"]

	contId: (tabnum) -> "#{@prefix}Tab_#{tabnum}_content"



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

main = ->
	tb = new TabBar("lists")

	console.log tb.sel 1


exports.selectTab = selectTab
exports.TabBar = TabBar