/*
To Dos: 
	Make into Single HTML page with append() and empty() 
	Make file locations stored in variables
	Make it possible to have multiple user 
	Refactor Code
	Make display chores draggable
	Change validation from alerts to error messages in DOM 
	Fix bug so i can go back in browser (probably connected to page reload)
	Make it so if URL = button being click it just displays the screen                  
*/			
$( document ).ready(function() {	
//Text input Validation
    var validations = {
	    email: [/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/, 
	    'Your email address is invalid.  Please enter a valid Email.'],
		password: [/.{8,}/, 'Password must be 8 or more characters.'],
		addChoresTextField: [/^([a-z\d\-_\s]{3,})+$/i, 'Your chore name can only be Letters and Numbers and must be 3 or more characters long.']
	};   

//Index.html Login Page
	var internalNavigation;
	var goTo = function (fileName){
		internalNavigation = true;
		window.location.replace("http://www.chore-schedule.com/" + fileName + ".html");	
	};
	window.onload = function() {  
		internalNavigation = false;
	};
 	window.onunload = function(){
 		history.pushState(null, "testing title", window.location);
 		$(window).on('popstate', function() {
	      alert('Back button was pressed.');
	    });
 	};
	window.onbeforeunload = function (e) {
		if (internalNavigation == false) {
			localStorage.setItem("loggedIn", "false");
		}
	};
	//Initialise sideNav
	var mask = $("#mask");
	var menu = $("#leftMenu");
	var btn = $("#menuIcon");
	//Open sideNav when corresponding button is clicked
	btn.on('click', function() {		
		menu.addClass('is-active');
		mask.addClass('is-active');
	});
	//Close sideNav when mask is clicked
	mask.on('click', function() {		
		menu.removeClass('is-active');
		mask.removeClass('is-active');
	});
	$(".accountEmail").append(localStorage.getItem("email"));

	var toggleForms = function(){
		$("#login").toggleClass("hide");
		$("#register").toggleClass("hide");
	};	
	
	if (localStorage.getItem("email") === null){
		toggleForms();
	} 

	if (localStorage.getItem("rememberMe") == "true"){
		$("#remember-me").attr("checked", true);
		$("#loginEmail").val(localStorage.getItem("email"));
		$("#loginPassword").val(localStorage.getItem("password"));
	}

	//Loggout button
	$(".loggout").on("click", function(){
		goTo("index");
		localStorage.setItem("loggedIn", "false");
	});

	$(".switch").on("click", function(){
		toggleForms();
	});
    $("#registerBtn").on("click", function(){
	    var whichFail = "";
	    var validationTest = function() {
		    var validateEmail = new RegExp(validations['email'][0]);
	        // validate the email value against the regular expression
	        if (!validateEmail.test($("#registerEmail").val())){	            
	            whichFail = "email";
	            return false;
	        } 	        
	        var validatePassword = new RegExp(validations['password'][0]);
	        // validate the password value against the regular expression
	        if (!validatePassword.test($("#registerPassword").val())){
	            whichFail = "password";
	            return false;
	        }
	        if ($("#confirmPassword").val() !== $("#registerPassword").val()){
	        	whichFail = "confirm";
	        	return false;
	        }

	        if (validateEmail.test($("#registerEmail").val()) && 
	        	validatePassword.test($("#registerPassword").val()) &&
	        	$("#confirmPassword").val() == $("#registerPassword").val()){
	            return true;
	        }
	        
	    }
	    var emailFailsValidation = function() {
		    var validateEmail = new RegExp(validations['email'][0]);
	        // validate the email value against the regular expression
	        if (!validateEmail.test($("#registerEmail").val())){	            
	            return true;
	        } 	  
	    }
	    if (validationTest() == true ) {
	    	localStorage.clear();
	    	localStorage.setItem("email", $("#registerEmail").val().toLowerCase());
		    localStorage.setItem("password", $("#registerPassword").val());	
		    localStorage.setItem("loggedIn", "true");
			goTo("displayChores");
		} else {
			if (whichFail == "email") {
				alert(validations['email'][1]);
				$('#registerEmail').focus();				
			} else if (whichFail == "password") {
				alert(validations['password'][1]);
				$('#registerPassword').focus();
			} else if (whichFail == "confirm") {
				alert("The passwords don't match. Please try again.");
				$('#confirmPassword').focus();
			} else {
				alert("Unknown Error.  Please try again later.");
				toggleForms();
			}
		}    
		return false;
    });
    $(".remember-me").on("click", function() {
    	if (localStorage.getItem("rememberMe") == "true")	{
    		localStorage.setItem("rememberMe", "false");
    	} else {
    		localStorage.setItem("rememberMe", "true");
    	}
    });

    $("#forgot-password-link").on("click", function(){
    	if (localStorage.getItem("password") !== null && localStorage.getItem("password") !== ""){
    		alert("Your password is: " + localStorage.getItem("password"));
    	} else {
    		alert("You need to register.");
    	}
    	return false;
    });
    $("#loginBtn").on("click", function(){
    	if  (localStorage.getItem("email") == $("#loginEmail").val().toLowerCase() && 
			localStorage.getItem("password") == $("#loginPassword").val()) {
			localStorage.setItem("loggedIn", "true");
			goTo("displayChores");
			return false;
		} else {
			localStorage.setItem("loggedIn", "false");
			alert("Email or password was incorrect.  Please try again.");			
			$('#loginPassword').val("");
			$('#loginPassword').focus();
		}
	});

//When Logged In
	if (window.location == "http://www.chore-schedule.com/displayChores.html") {
		$(".goToHistory").addClass("dim");
		$(".backToChores").removeClass("dim");
	} else if (window.location == "http://www.chore-schedule.com/displayHistory.html"){
		$(".backToChores").addClass("dim");
		$(".goToHistory").removeClass("dim");
	} else {
		$(".backToChores").addClass("dim");
		$(".goToHistory").addClass("dim");
	}
	//Make Sure user is Logged in
//	var currentUrl = $(location).attr('href');	
//    if (localStorage.getItem("loggedIn") == "false" && currentUrl !== "http://www.chore-schedule.com/index.html") {
//    	goTo("index");
//	} else {

	//addChores.html		
		var chores;
		var setItems = localStorage.getItem("choreList");
		
		// Store todo in variable on keyup
		$("#addChore").on("keyup", function() {
		  chores = $(this).val();
		});
		// When enter key is pressed add item to list | Check for an empty input if true shake and skew the input box
		$("#addChore").on("keypress", function(whicheverKey) {			
			//Add chores list item if enter is pressed 
			if (whicheverKey.which == 13) {
				//update setItems
				var setItems = localStorage.getItem("choreList");
				//validate input
				var validate = new RegExp(validations['addChoresTextField'][0]);
				if (!validate.test($(this).val()) || $(this).val().length <= 0){
		            valid = false;
		        } else {
		        	valid = true;
		        }
				
				//Verify that there is something in the input field    
			    if (valid == false) {
			    	alert(validations['addChoresTextField'][1]);
			    } else {		    				    
				    var choreItem = 
				    	$("<tr class='task-row'><td></td>" +
							"<td class='grid_cell_boolean'  >" +
								"<span style='font-size: 16px; padding-left: 5px;'>\u25B6 </span>" +
							"</td>" +
							"<td class='grid_cell_string'>" +
								"<span class='task-row-text-input toDo'>" + chores + "</span>" +
							"</td>" +
							"<td class='grid_cell_assignee '>" + 
								"<div class='delete'>" +
									"<div class='circularButtonView circularButtonView--xsmall circularToggleButtonView-button'>" +
										"<span class='circularButtonView-label'>" +
											"<svg class='svgIcon ' viewBox='0 0 32 32' title='checkmark'>" +
												"<polygon points='5,1 16,12 26,1 30,5 20,16 30,26 26,30 16,20 5,30 1,26 12,16 1,5'></polygon>/>" +
											"</svg>" +
										"</span>" +
									"</div>" +
								"</div>" +
							"</td>" +
							"<td class='grid-cell grid_cell_show_details'></td>" +
						  "</tr>");			    
			    	//Store toDo in a Comma Separated Value (CSV) format in local Storage
				    if (setItems === null || setItems == "")	{
				    	setItems = chores;
				    } else {
				    	setItems = setItems + ',' + chores;
				    }
				    localStorage.setItem("choreList", setItems);  
			    	//Append list and clear text field
			    	$(".postBeforeThis").before(choreItem);
			    	
			    	$(this).val(''); //Empty input field on submit
			    }		        	   
			   	return false;//To make the page not reload
			   
			}
		});
			
		
		$(".choreList").on("click", ".delete", function() {
			//delete div from the dom
			$(this).parents(".task-row").remove();		
			//make choreList into an array
			var localChoreList = localStorage.getItem("choreList").split(",");
			//get the text from Dom that I want to remove from choreList
			var targetChore = $(this).parents(".task-row").children(".grid_cell_string").children(".toDo")[0].textContent;
			//Remove the item from the array
			localChoreList.splice(localChoreList.indexOf(targetChore),1);
			//convert the array back into a string in the right format then put it back into choreList
			localStorage.setItem("choreList", JSON.stringify(localChoreList).replace(/[\[\]"]+/g, ''));
		});	

		$(".done").on("click", function() {
			goTo("displayChores");
		});

	//DisplayChores.html
		if (localStorage.getItem("choreList") !== null) {
			var localChoreList = localStorage.getItem("choreList").split(",");
		}			
		//Display all chores to the dom
		if (setItems === "" || setItems === null) {	
			if (window.matchMedia('(max-width: 950px)').matches){
				var choreToDo = $("<tr class='task-row completed'><td></td>" +
									"<td class='grid_cell_boolean'>" +
									"</td>" +
									"<td class='grid_cell_string'>" +
										"<span class='task-row-text-input'>You have no chores to Do!</span>" +
									"</td>" +
									"<td class='grid_cell_assignee'></td>" +
									"<td class='grid-cell grid_cell_show_details'></td>" +
								"</tr>");
			} else {				
				var choreToDo = $("<tr class='task-row completed'><td></td>" +
									"<td class='grid_cell_boolean'>" +
									"</td>" +
									"<td class='grid_cell_string'>" +
										"<span class='task-row-text-input'>You have no chores to Do! " +
										"&nbsp; &nbsp;  &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;" + 
										" &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;  &nbsp; &nbsp;" + 
										"&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; " + 
										"&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; " + 
										"&nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;" +
										" Click the Add Chores Button below. " + 
										"<span class='downArrow'>\u2B07</span>" +
										"</span>" +
									"</td>" +
								"</tr>");
			}	
			//Append list and clear text field
		    $(".display-chores-table").append(choreToDo);
		} else {
		    var choresNum = 0;
			if (localChoreList !== undefined) {
				choresNum = localChoreList.length;
			}
			for (var i = 0; choresNum > i; i++) {
				var choreName = localChoreList[i];
				var choreToDo = $("<tr class='task-row'><td></td>" +
										"<td class='grid_cell_boolean'>" +
											"<div class='circularToggleButtonView--toggledOff taskCheckboxNodeView'>" +
												"<div class='circularButtonView circularButtonView--xsmall circularToggleButtonView-button'>" +
													"<span class='circularButtonView-label'>" +
														"<svg class='svgIcon ' viewBox='0 0 32 32' title='checkmark'>" +
															"<polygon points='27.672,4.786 10.901,21.557 4.328,14.984 1.5,17.812 10.901,27.214 30.5,7.615'></polygon>" +
														"</svg>" +
													"</span>" +
												"</div>" +
											"</div>" +
										"</td>" +
										"<td class='grid_cell_string'>" +
											"<span class='task-row-text-input'>" + choreName + "</span>" +
										"</td>" +
										"<td class='grid_cell_assignee'></td>" +
										"<td class='grid-cell grid_cell_show_details'></td>" +
									"</tr>");
				//Append list and clear text field
			    $(".display-chores-table").append(choreToDo);
			}
	    }

	    var sendEmails = localStorage.getItem("sendEmails");	    
	    $(".sendEmails").on("click", function() {	    	
	    	if (sendEmails === null || sendEmails == "false"){
	    		localStorage.setItem("sendEmails", "true");
	    	} else {
	    		localStorage.setItem("sendEmails", "false");
	    	}
	    });
	    
	    if (sendEmails === null || sendEmails == "false") { 
    		$(".sendEmails").prop("checked", false);
    	} else {
    		$(".sendEmails").prop("checked", true);
    	}

	    $(".circularButtonView").on("click", function() {
			//Change CSS
			$(this).parent().removeClass("circularToggleButtonView--toggledOff")
							.addClass("circularToggleButtonView--toggledOn");
			$(this).parents(".task-row").toggleClass("completed");				
			//delete div from the dom
			$(this).delay(1000).queue(function() {
	            $(this).parents(".task-row").remove();
	        });		
			//Update histRecord
			var histRecord = localStorage.getItem("history");
			//get the text from Dom that I want to remove from choreList
			var targetChore = $(this).parents(".task-row").children("td.grid_cell_string")
									.children(".task-row-text-input")[0].textContent;
			//Move the targetChore text and time info into history		
			var addZero = function(number) {
				if (number < 10) {
					number = "0" + number;
				}
				return number;
			};			
			var formatTime = function (timeInfo) {
				var hour = timeInfo.getHours();
				var minutes = addZero(timeInfo.getMinutes());
				if (hour > 12) {
					var twelveHourTime = (hour-12)+":"+minutes+"p.m."
				} else {
					var twelveHourTime = hour+":"+minutes+"a.m."
				}
				return twelveHourTime + " on ";
			};

			var formatDate = function(dateInfo) {				
				var month = addZero((dateInfo.getMonth()+1));
				var day = dateInfo.getDate();
				var year = dateInfo.getFullYear().toString().slice(2, 4);

				return month + "/" + day + "/" + year;
			}
			var datetime = new Date();
			var formatedDate = formatDate(datetime);
			var formatedTime = formatTime(datetime);		

			if (histRecord === null)	{
		    	histRecord = targetChore + ',' + formatedTime + ',' + formatedDate;
		    } else {
		    	histRecord = histRecord + ',' + targetChore + ',' + formatedTime + ',' + formatedDate;
		    }
			localStorage.setItem("history", histRecord); 
			//Remove the item from the array
			localChoreList.splice(localChoreList.indexOf(targetChore),1);
			//convert the array back into a string in the right format then put it back into choreList
			localStorage.setItem("choreList", JSON.stringify(localChoreList).replace(/[\[\]"]+/g, ''));
		});
		
		$(".addMoreChores").on("click", function() {
			goTo("addChores");
		});
 
 		$(".addChoreBtn").on("click", function() {
			goTo("addChores");
		});
		$(".addMoreChores").hover(
		    function() {
		      $(".addChoresTitle").removeClass('hide');
		    },
		    function() {
		      $(".addChoresTitle").addClass('hide');
		    }
		);

		$(".goToHistory").on("click", function() {
			goTo("displayHistory");
		});

		$(".disHistBtn").on("click", function() {
			goTo("displayHistory");
		});

	//Display History	
		if (localStorage.getItem("history") !== null) {
			var firstChar = localStorage.getItem("history").charAt(0);
		} 		
		if (firstChar === ",") {
			var correctHistRecord = localStorage.getItem("history").slice(1);
			localStorage.setItem("history", correctHistRecord);
		}
		var histRecord = localStorage.getItem("history");

		if (histRecord === "" || histRecord === null) {	
	    	var choreHistory = 
				$("<tr class='task-row completed'><td></td>" +
					"<td class='grid_cell_boolean'>" +
					"</td>" +
					"<td class='grid_cell_string'>" +
						"<span class='task-row-text-input'>You have yet to complete a chore.</span>" +
					"</td>" +
					"<td class='grid_cell_assignee'></td>" +
					"<td class='grid-cell grid_cell_show_details'></td>" +
				"</tr>");
			$(".choreListHistory").append(choreHistory);
	    } else {	    	
	    	//make history into two dimentional array
			var histRecordList = [];
			if (histRecord !== null){
				var histRecordConverter = histRecord.split(",");
				var histRecLength = histRecordConverter.length;
			}	

				
			for (var i = 0; (histRecLength/3) > i; i++) {
				histRecordList.push(histRecordConverter.splice(0,3));
			}	
			var none = 0;
			for (var i = histRecordList.length-1; 0 <= i; i--) {
				var choreName = histRecordList[i][0]; 
				var choreTime = histRecordList[i][1];
				var choreDate = histRecordList[i][2];
				
				if (window.matchMedia('(max-width: 550px)').matches){
					var choreDateTime = choreDate;
				} else {	
					var choreDateTime = choreTime + choreDate;				
				}

				var choreHistory = 
					$("<tr class='task-row'><td></td>" +
						"<td class='grid_cell_boolean'  >" +
						"<span class='bullet'>\u2022</span>" +
						"</td>" +
						"<td class='grid_cell_string'>" +
							"<span class='task-row-text-input'>" + choreName + "</span>" +
						"</td>" +
						"<td class='grid_cell_assignee'>" + 
							"<span class='date-of-completion'>" + choreDateTime + "</span>" +
						"</td>" +
						"<td class='grid-cell grid_cell_show_details'></td>" +
					  "</tr>");
				//Append list and clear text field
			    $(".choreListHistory").append(choreHistory);
			}	    		
	    }
	    if (window.matchMedia('(max-width: 402px)').matches){
			$(".page-body").addClass("historyMobile");
			$(".historyTitle").empty();
			$(".historyTitle").append("<h2>History:</h2>");
		} else {	
			$(".page-body").removeClass("historyMobile");
			$(".historyTitle").empty();
			$(".historyTitle").append("<h2>History: Completed Chores</h2>")				
		}
	    $(".backToChores").on("click", function() {
			goTo("displayChores");
		});
		
		$(".disChoreBtn").on("click", function() {
			goTo("displayChores");
		});
	//}//end to login if

	
});














