/**
 * Rock, Paper, Scissors game algorithm.
 * 
 * 	 0 - Rock
 *   1 - Paper
 *   2 - Scissors
 */
function rockPaperScissors(playerChoice) {
	var winString;
	var choiceImages = ["img/rock.png", "img/paper.png", "img/scissors.png"];
	var computerChoice = Math.floor(Math.random()*3);

	if ( playerChoice == computerChoice ) {
		winString = "Tie.";
	}
	else if((computerChoice == 0 && playerChoice == 2) ||
			(computerChoice == 1 && playerChoice == 0) ||
			(computerChoice == 2 && playerChoice == 1)) {
		winString = "Computer wins.";
	}
	else {
		winString = "You win.";
	}

	document.getElementById("player_img").src = choiceImages[playerChoice];
	document.getElementById("opponent_img").src = choiceImages[computerChoice];
	document.getElementById("game_over_txt").innerHTML = winString;
	mwl.setGroupTarget('#dynamicLooping_content', '#dynLoop_content_2', 'show', 'hide');
}

function setImageDetails(fileName) {
	var _baseURL = "http://projects.developer.nokia.com/webappsuivisualisation/raw-attachment/wiki/WikiStart/";
	var imgDownloadUrl = _baseURL + "" + fileName;
	
	document.getElementById("download_image_name").innerHTML = fileName;
	document.getElementById("download_image").src = "img/" + fileName;
	var dlBtn = document.getElementById("download_button");
	dlBtn.setAttribute('onclick', 
			"mwl.setGroupTarget('#fileDownload_content', '#fileDownload_base_view', 'show', 'hide');" +
			"mwl.loadURL('" + imgDownloadUrl + "');");
}

function setPickerValue(newValue) {
	mwl.setGroupTarget('#picker_content', '#picker_button_content', 'show', 'hide');
	mwl.setGroupTarget('#navigateToggle', '#miniappGoHomeToggle', 'show', 'hide');
	document.getElementById("picker_button").value = "Value is " + newValue;
}

function _generateSearchItems() {
	var searchItems = [];
	var ItemCount = 15;
	// Generate the items.
	for ( var i = 0; i < ItemCount; i++) {
		searchItems.push("Item " + (i+1));
	}
	
	return searchItems;
}

/**
 * Function for generating HTML structure for the Search mini app.
 * 
 *   Checks the search input field's value, and compares it against
 *   the currently known items (i.e. the ones generated with the
 *   _generateSearchItems() function). 
 */
function createSearchList() {
	var allItems = _generateSearchItems();
	var shownItems = [];
	
	// Fetch the user's input.
	var searchTerm = document.getElementById("search_input").value;
	console.log("search_input was: " + searchTerm);
	
	if (searchTerm) {
		for (var i = 0; i < allItems.length; i++) {
			var item = allItems[i];
			if (item.indexOf(searchTerm) != -1) {
				shownItems.push(item);
			}
		}
	} else {
		shownItems = allItems;
	}

	var outputstr = '<div id="tree_page_content" class="show">';
	for ( var i = 0; i < shownItems.length; i++) {
		outputstr += '<div class="text_list_item" onclick="">'
			  + shownItems[i] + '</div>';
	}
	outputstr += '</div>';

	var searchContainer = document.getElementById("search");
	searchContainer.innerHTML = outputstr;
}

/**
 * Function for generating HTML structure for the tree view mini app.
 * 
 * 	 elementId - HTML element id to which the output is appended.
 *   pageLevel - The current depth of the tree
 *   index1 - The item index selected from the tree's first level.
 *   index2 - The item index selected from the tree's second level.
 */
function generateTreeView(elementId, pagelevel, index1, index2) {
	var pageNames = ["A", "B", "C", "D"];
	var pageCount = pageNames.length;
	
	var treeStructureContainer = document.getElementById(elementId);
	treeStructureContainer.innerHTML = "";
	
	var headerstr = '<div class="list_section_header">Tree ';
	var outputstr = '<div id="tree_page_content" class="show">';
	
	if (pagelevel === 0) {
		for (var i = 0; i < pageCount ; i++) {
			outputstr += '<div class="text_list_item"'
					  + 'onclick="generateTreeView(\'' + elementId + '\',1,' + i + ',' + '0' + ')">'
					  + 'Item ' + (i+1) + '</div>';
		}
		mwl.setGroupTarget('#navigateToggle', '#miniappGoHomeToggle', 'show', 'hide');
	} else if (pagelevel === 1) {
		headerstr += '> Item ' + (index1+1);
		for (var i = 0; i < pageCount ; i++) {
			outputstr += '<div class="text_list_item"'
					  + 'onclick="generateTreeView(\'' + elementId + '\',2,' + index1 + ',' + i + ')">'
					  + 'Item ' + pageNames[i] + '</div>';
		}
		setBackButton(elementId, pagelevel, index1);
	} else if (pagelevel === 2) {
		headerstr += '> Item ' + (index1+1) + ' > ' + pageNames[index2];
		outputstr += '<div class="text_block">'
				  + 'Content item ' + (index1+1)
				  + ' - ' + pageNames[index2] + '</div>';
		setBackButton(elementId, pagelevel, index1);
	} else {
		// Handle error here.
	}
	// Close the header string
	headerstr += '</div>';
	
	treeStructureContainer.innerHTML += headerstr;
	treeStructureContainer.innerHTML += outputstr;
}

function setBackButton(elementId, pagelevel, index1) {
	var treeBackButton = document.getElementById("tree_backButton");
	treeBackButton.onclick = function() {
		generateTreeView(elementId, pagelevel - 1, index1, 0); 
	};
	mwl.setGroupTarget('#navigateToggle', '#tree_backButton', 'show', 'hide');
}

// Save data to the CLOOOUD :O.
function saveCredentials() {
	var username = document.getElementById("usernameEntry").value;
	var password = document.getElementById("passwordEntry").value;
	
	// Check, if the username already has an associated password.
	var msgText = "";
	if (widget.preferences.getItem("username") === username) {
		msgText = "Would you like to replace the currently saved password";
	} else {
		msgText = "Save this password?";
	}

	if (window.confirm(msgText)) {
		widget.preferences.setItem("username", username);
		widget.preferences.setItem("password", password);
		mwl.setGroupTarget('#passwords_content', '#password_login_view', 'show', 'hide');
	}
}

// Clears all the key - value pairs from the CLOOOUD :O.
function resetCredentials() {
	widget.preferences.clear();
	mwl.setGroupTarget('#passwords_content', '#password_query_view', 'show', 'hide');
}
