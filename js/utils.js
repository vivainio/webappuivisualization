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
	document.getElementById("picker_button").value = "Value is " + newValue;
}

function generateTreeView(elementId, pagelevel, index1, index2) {
	var pageCount = 4;
	var pageNames = ["A", "B", "C", "D"];
	
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
	} else if (pagelevel === 1) {
		headerstr += '> Item ' + (index1+1);
		for (var i = 0; i < pageCount ; i++) {
			outputstr += '<div class="text_list_item"'
					  + 'onclick="generateTreeView(\'' + elementId + '\',2,' + index1 + ',' + i + ')">'
					  + 'Item ' + pageNames[i] + '</div>';
		}
	} else if (pagelevel === 2) {
		headerstr += '> Item ' + (index1+1) + ' > ' + pageNames[index2];
		outputstr += '<div class="text_block">'
				  + 'Content item ' + (index1+1)
				  + ' - ' + pageNames[index2] + '</div>';
    } else {
    	// Erraneous situation.
    }
	// Close the header string
	headerstr += '</div>';
    
    treeStructureContainer.innerHTML += headerstr;
    treeStructureContainer.innerHTML += outputstr;
}

