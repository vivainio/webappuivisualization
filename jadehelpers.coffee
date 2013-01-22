ll = console.log

class TabBar
	constructor: (@prefix, @numtabs) ->

	sel: (num) ->
		tabbar = @prefix + "TabBar"
		contpane = @prefix + "TabControlContent"
		tabid = "#" + @prefix + "Tab_" + num
		s = """mwl.setGroupTarget("##{contpane}", "#{tabid}_content", "show", "hide");      mwl.setGroupTarget("##{tabbar}", "#{tabid}", "tab_selected", "tab_not_selected");
		"""
		return s

	contentParentId: -> @prefix + "TabControlContent"

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

exports.ops = (full, ns = null) ->
	#full = "#navigateToggle: SELECT #home show hide; #slider: +show_miniapp -show_main; #appsSection: SELECT #buttons hide, hide"
	if ns 
		full = full.replace /\*/g, ns
		ll "replaced",full
	parts = full.split ";"
	cmd = []

	for instr in parts
		sep = instr.indexOf(":")
		[left, right] = [instr.slice(0, sep).trim(), instr.slice(sep+1).trim()]
		console.log "L",left, "R", right
		idd = left
		rtoks = right.split /\s+/
		ltoks = left.split /\s+/
		for idd in ltoks
			for tok in rtoks				
				ll "RToken", tok
				if tok[0] == "+"
					kl = tok.slice(1)
					cmd.push "mwl.addClass ('#{idd}', '#{kl}')"
				if tok[0] == "-"
					kl = tok.slice(1)
					cmd.push "mwl.removeClass ('#{idd}', '#{kl}')"
				if tok[0] == "/"
					kl = tok.slice(1)
					cmd.push "mwl.toggleClass ('#{idd}', '#{kl}')"


	return cmd.join "; "
		
testOps = ->
	orig = """

    mwl.toggleClass("#category1_items", "show");\
    mwl.toggleClass("#category1_items", "hide");\
    mwl.toggleClass("#category1_closed_arrow", "hide");\
    mwl.toggleClass("#category1_closed_arrow", "show");\
    mwl.toggleClass("#category1_open_arrow", "hide");\
    mwl.toggleClass("#category1_open_arrow", "show");\	
	"""

	# splitting open_arrow to special case just as an example
	ss = exports.ops "*_items *_closed_arrow : /hide /show; *_open_arrow: /hide /show",
		"#category1"

	ll ss









exports.runTests = ->
	testOps()
	tb = new TabBar("lists")



exports.selectTab = selectTab
exports.TabBar = TabBar