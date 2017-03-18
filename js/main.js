console.log("To Dos: \n"
			+ "- Make into Single HTML page with append() and empty() \n" 
			+ "- Make file locations stored in variables\n"
			+ "- Make it possible to have multiple user \n"
			+ "- Refactor Code \n"
			+ "- Make display chores draggable \n"
			+ "- Fix Bug with login=true and on register(when page is exited make login = false?) \n"
			+ "- Make 'Remember Me' on login page Work \n"
			+ "- Change validation from alerts to error messages in DOM \n"
			+ "- Make Confirm Password on Register Page \n");
$( document ).ready(function() {	
//Text input Validation
    var validations = {
	    email: [/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/, 
	    'Your email address is invalid.  Please enter a valid Email.'],
		password: [/.{8,}/, 'Password must be 8 or more characters.'],
		addChoresTextField: [/^([a-z\d\-_\s]{3,})+$/i, 'Your chore name can only be Letters and Numbers']
	};   

//Login_Register.html
	
	var toggleForms = function(){
		$("#login").toggleClass("hide");
		$("#register").toggleClass("hide");
	};
	
	if (localStorage.getItem("email") === null){
		toggleForms();
	} 

	//Loggout button
	$(".loggout").on("click", function(){
		window.location.replace("file:///C:/Users/woodj/Desktop/Chore-Schedule-Web-App/html/login_register.html");
		localStorage.setItem("loggedIn", "false");
	});

	/*$("#clear").on("click", function(){
		localStorage.clear();
	});	*/
	$(".switch").on("click", function(){
		toggleForms();
	});
    $("#registerBtn").on("click", function(){
	    var validationTest = function() {
		    var validateEmail = new RegExp(validations['email'][0]);
	        // validate the email value against the regular expression
	        if (!validateEmail.test($("#registerEmail").val())){	            
	            return false;
	        } 	        
	        var validatePassword = new RegExp(validations['password'][0]);
	        // validate the password value against the regular expression
	        if (!validatePassword.test($("#registerPassword").val())){
	            return false;
	        }
	        if (validateEmail.test($("#registerEmail").val()) && 
	        	validatePassword.test($("#registerPassword").val())){
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
	    if (validationTest() == true) {
	    	localStorage.setItem("email", $("#registerEmail").val().toLowerCase());
		    localStorage.setItem("password", $("#registerPassword").val());	
		    toggleForms();
		} else {
			if (emailFailsValidation() == true) {
				alert(validations['email'][1]);
				$('#registerEmail').focus();
			} else {
				alert(validations['password'][1]);
				$('#registerPassword').focus();
			}
		}    
    });
    $("#loginBtn").on("click", function(){
    	if  (localStorage.getItem("email") == $("#loginEmail").val().toLowerCase() && 
			localStorage.getItem("password") == $("#loginPassword").val()) {
			localStorage.setItem("loggedIn", "true");			
			if (localStorage.getItem("choreList") === null || localStorage.getItem("choreList") == "" )	{
				window.location.replace("file:///C:/Users/woodj/Desktop/Chore-Schedule-Web-App/html/addChores.html");
				return false;
			} else {
				window.location.replace("file:///C:/Users/woodj/Desktop/Chore-Schedule-Web-App/html/displayChores.html");
				return false;
			}
		} else {console.log("Out");
			localStorage.setItem("loggedIn", "false");
			alert("Email or password was incorrect.  Please try again.");			
			$('#loginPassword').val("");
			$('#loginPassword').focus();
		}
	});

//When Logged In
	//Make Sure user is Logged in
	var currentUrl = $(location).attr('href');	
    if (localStorage.getItem("loggedIn") == "false" && currentUrl !== "file:///C:/Users/woodj/Desktop/Chore-Schedule-Web-App/html/login_register.html") {
    	window.location.replace("file:///C:/Users/woodj/Desktop/Chore-Schedule-Web-App/html/login_register.html");
	} else {

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
				    var choreItem = $("<div class='choreLI'><span class='toDo'>" + chores  
				    	+ "</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; " 
				    	+ "<input type='button' value='delete' class='delete' /></div>");			    
			    	//Store toDo in a Comma Separated Value (CSV) format in local Storage
				    if (setItems === null || setItems == "")	{
				    	setItems = chores;
				    } else {
				    	setItems = setItems + ',' + chores;
				    }
				    localStorage.setItem("choreList", setItems);  
			    	//Append list and clear text field
			    	$(".choreList").append(choreItem);
			    	
			    	$(this).val(''); //Empty input field on submit
			    }		        	   
			   	return false;//To make the page not reload
			   
			}
		});
			
		
		$(".choreList").on("click", ".delete", function() {
			//delete div from the dom
			$(this).parent().remove();		
			//make choreList into an array
			var localChoreList = localStorage.getItem("choreList").split(",");
			//get the text from Dom that I want to remove from choreList
			var targetChore = $(this).parent().children(".toDo")[0].textContent;
			//Remove the item from the array
			localChoreList.splice(localChoreList.indexOf(targetChore),1);
			//convert the array back into a string in the right format then put it back into choreList
			localStorage.setItem("choreList", JSON.stringify(localChoreList).replace(/[\[\]"]+/g, ''));
		});	

		$(".done").on("click", function() {
			window.location.replace("file:///C:/Users/woodj/Desktop/Chore-Schedule-Web-App/html/displayChores.html");
		});

	//DisplayChores.html
		var localChoreList = localStorage.getItem("choreList").split(",");			
		//Display all chores to the dom
		if (setItems !== "") {	
			for (var i = 0; localChoreList.length > i; i++) {
				var choreName = localChoreList[i]; 		
				var choreToDo = $("<div class='choreToDoLI'><input type='checkbox' value='done' class='checkbox' /> &nbsp; &nbsp; &nbsp;" 
						    	+ "<span class='choreToDo'>" + choreName + "</span></div>");
				//Append list and clear text field
			    $(".choreListToDo").append(choreToDo);
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

	    $(".choreListToDo").on("click", ".checkbox", function() {
			//delete div from the dom
			$(this).delay(400).queue(function() {
	            $(this).parent().remove();
	        });		
			//Update histRecord
			var histRecord = localStorage.getItem("history");
			//get the text from Dom that I want to remove from choreList
			var targetChore = $(this).parent().children(".choreToDo")[0].textContent;

			//Move the targetChore text and time info into history
			var x = new Date();
			var datetime = x.toDateString();

			if (histRecord === null)	{
		    	histRecord = targetChore + ',' + datetime;
		    } else {
		    	histRecord = histRecord + ',' + targetChore + ',' + datetime;
		    }
			localStorage.setItem("history", histRecord); 
			//Remove the item from the array
			localChoreList.splice(localChoreList.indexOf(targetChore),1);
			//convert the array back into a string in the right format then put it back into choreList
			localStorage.setItem("choreList", JSON.stringify(localChoreList).replace(/[\[\]"]+/g, ''));

			//Send Email Update
			if (sendEmails == "true") { 
	    		$.ajax({
				    url: "https:  //formspree.io/woodj14123@gmail.com", 
				    method: "POST",
				    data: $(this).serialize(),
				    dataType: "json"
				});
	    	} 


		});
		
		$(".addMoreChores").on("click", function() {
			window.location.replace("file:///C:/Users/woodj/Desktop/Chore-Schedule-Web-App/html/addChores.html");
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
			window.location.replace("file:///C:/Users/woodj/Desktop/Chore-Schedule-Web-App/html/displayHistory.html");
		});

	//Display History	
		var histRecord = localStorage.getItem("history");
		if (histRecord !== "" || histRecord !== null) {		
			//make history into two dimentional array
			var histRecordList = [];
			var histRecordConverter = histRecord.split(",");
			for (var i = 0; (histRecordConverter.length+i-1) > i; i++) {
				histRecordList.push(histRecordConverter.splice(0,2));
				var choreName = histRecordList[i][0]; 
				var choreDateTime = histRecordList[i][1];

				var choreHistory = $("<div class='choreHistLI'><b><span class='choreHistName'>" + choreName
						    	+ "</b> was preformed on </span><span class='choreHistDate'><b>" + choreDateTime 
						    	+ "</b></span></div>");
				//Append list and clear text field
			    $(".choreListHistory").append(choreHistory);
			}
	    } else {
	    	//if there are no chores done write " no chores done"
	    }

	    $(".backToChores").on("click", function() {
			window.location.replace("file:///C:/Users/woodj/Desktop/Chore-Schedule-Web-App/html/displayChores.html");
		});
	
	}//end to login if

	
});
















/*/sideNav Constructor
function sideNav(options) {
	//Initialise sideNav
	var mask = document.getElementById("mask");
	this.menu = document.getElementById(options.side);
	this.btn = document.getElementById(options.btnId);
	//Open sideNav when corresponding button is clicked
	this.btn.addEventListener('click', function() {		
		this.menu.classList.add('is-active');
		mask.classList.add('is-active');
	}.bind(this));
	//Close sideNav when mask is clicked
	mask.addEventListener('click', function() {		
		this.menu.classList.remove('is-active');
		mask.classList.remove('is-active');
	}.bind(this));
}

//Create leftMenu
var slideLeft = new sideNav({
	side: 'leftMenu',
	btnId: 'menu'
});

//Create rightMenu
var slideRight = new sideNav({
	side: 'rightMenu',
	btnId: 'eventNote'
});




var tabs = document.getElementsByClassName('Tab');

Array.prototype.forEach.call(tabs, function(tab) {
	tab.addEventListener('click', setActiveClass);
});

function setActiveClass(evt) {
	Array.prototype.forEach.call(tabs, function(tab) {
		tab.classList.remove('active');
	});
	
	evt.currentTarget.classList.add('active');
}




$( document ).ready(function() {	
	var toggleForms = function(){
		$("#login").toggleClass("hide");
		$("#register").toggleClass("hide");
	};
	
	if (localStorage.key(0) === null){
		toggleForms();
	} 

	$("#clear").on("click", function(){
		localStorage.clear();
	});	
	$("#registerLink").on("click", function(){
		toggleForms();
	});
    $("#registerBtn").on("click", function(){
    	var newUserInfo = {
    		email: $("#registerEmail").val(),
			password: $("#registerPassword").val()
    	}
	    localStorage.setItem(newUserInfo.email, JSON.stringify(newUserInfo));
	    toggleForms();
		
    });
    $("#loginBtn").on("click", function(){
		for (var i = 0; localStorage.length > i; i++) {				
			if  (localStorage.key(i) == $("#loginEmail").val()) {
				var password = (JSON.parse(localStorage.getItem(localStorage.key(i)))).password;
				console.log(password);
				if (password == $("#loginPassword").val()) {
					alert("In");
				}
			} 
			*******if (i == (localStorage.length + 1) &&  (localStorage.key(i) !== $("#loginEmail").val())) {
				console.log("It seems there is no account here by that name.  Would you like to register it?");
			}
		}
	});

	// Check all the input fields of type email. This function will handle all the email addresses validations
    $("#registerEmail").change( function(){
        // Set the regular expression to validate the email 
        validation = new RegExp(validations['email'][0]);
        // validate the email value against the regular expression
        if (!validation.test($(this).val())){
            // If the validation fails then we show the custom error message
            this.setCustomValidity(validations['email'][1]);
            return false;
        } else {
            // This is really important. If the validation is successful you need to reset the custom error message
            this.setCustomValidity('');
        }
	});
    $("#registerPassword").change( function(){
        // Set the regular expression to validate the password 
        validation = new RegExp(validations['password'][0]);
        // validate the password value against the regular expression
        if (!validation.test($(this).val())){
            // If the validation fails then we show the custom error message
            this.setCustomValidity(validations['password'][1]);
            return false;
        } else {
            // This is really important. If the validation is successful you need to reset the custom error message
            this.setCustomValidity('');
        }
	});
});
*/