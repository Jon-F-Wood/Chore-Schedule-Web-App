$( document ).ready(function() {	
//Text input Validation
    var validations ={
	    email: [/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/, 'Please enter a valid email address'],
		password: [/.{8,}/, 'Password must be 8 or more characters.']
		addChoresTextField: [/^[a-z\d\-_\s]+$/i, 'Your chore name can only be Alphanumeric Characters']
	};
    // Check all the input fields of type email. This function will handle all the email addresses validations
    $("#registerEmail").change( function(){
        // Set the regular expression to validate the email 
        validation = new RegExp(validations['email'][0]);
        // validate the email value against the regular expression
        if (!validation.test(this.value)){
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
        if (!validation.test(this.value)){
            // If the validation fails then we show the custom error message
            this.setCustomValidity(validations['password'][1]);
            return false;
        } else {
            // This is really important. If the validation is successful you need to reset the custom error message
            this.setCustomValidity('');
        }
	});
	$("#addChore").change( function(){
        // Set the regular expression to validate the email 
        validation = new RegExp(validations['addChoresTextField'][0]);
        // validate the email value against the regular expression
        if (!validation.test(this.value)){
            // If the validation fails then we show the custom error message
            this.setCustomValidity(validations['addChoresTextField'][1]);
            return false;
        } else {
            // This is really important. If the validation is successful you need to reset the custom error message
            this.setCustomValidity('');
        }
	});

//Register.html
	var toggleForms = function(){
		$("#login").toggleClass("hide");
		$("#register").toggleClass("hide");
	};
	
	if (localStorage.getItem("email") === null){
		toggleForms();
	} 

	/*$("#clear").on("click", function(){
		localStorage.clear();
	});	*/
	$(".switch").on("click", function(){
		toggleForms();
	});
    $("#registerBtn").on("click", function(){
    	localStorage.setItem("email", $("#registerEmail").val().toLowerCase());
	    localStorage.setItem("password", $("#registerPassword").val());	
	    toggleForms();
    });
    $("#loginBtn").on("click", function(){
		if  (localStorage.getItem("email") == $("#loginEmail").val().toLowerCase() && 
			localStorage.getItem("password") == $("#loginPassword").val()) {
			if (localStorage.getItem("choreList") === null || localStorage.getItem("choreList") == "" )	{
				window.location.replace("file:///C:/Users/woodj/Desktop/Chore-Schedule-Web-App/html/addChores.html");
			} else {
				window.location.replace("file:///C:/Users/woodj/Desktop/Chore-Schedule-Web-App/html/displayChores.html");
			}

		} else {
			alert("Email or password was incorrect.  Please try again.");
		}
	});

//addChores.html
	var chores = [];
	var setItems = localStorage.getItem("choreList");
	
	// Store todo in variable on keyup
	$("#addChore").on("keyup", function() {
	  chores = $(this).val();
	});

	// When enter key is pressed add item to list | Check for an empty input if true shake and skew the input box
	$("#addChore").on("keypress", function(whicheverKey) {
		//Add chores list item if enter is pressed 
		if (whicheverKey.which == 13) {
			//Verify that there is something in the input field    
		    if ($(this).val().length <= 0) {
		    	alert("You must name your Chore.");
		    } else {		    
			    var choreItem = $("<div class='choreLI'><span class='toDo'>" + chores  
			    	+ "</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; " 
			    	+ "<input type='button' value='delete' class='delete' /></div>");
		    }
		   
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

	/*/ Delete click handler
	$(".clearList").on("click", function() {
	 localStorage.removeItem("set");
	  $(".choreLI").remove();
	});*/

//DisplayChores.html

	var localChoreList = localStorage.getItem("choreList").split(",");
	var histRecord = localStorage.getItem("history");	
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

    $(".choreListToDo").on("click", ".checkbox", function() {
		//delete div from the dom
		$(this).delay(400).queue(function() {
            $(this).parent().remove();
        });		
		
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
	});
	
	$(".addMoreChores").on("click", function() {
		window.location.replace("file:///C:/Users/woodj/Desktop/Chore-Schedule-Web-App/html/addChores.html");
	});

	$(".goToHistory").on("click", function() {
		window.location.replace("file:///C:/Users/woodj/Desktop/Chore-Schedule-Web-App/html/displayHistory.html");
	});

//Display History	
	console.log("verify alpha numeric and spaces in add chores .html");
	if (histRecord !== "" || histRecord !== null) {			
		//make history into two dimentional array
		var histRecordList = [];
		var histRecordConverter = histRecord.split(",")
		
		for (var i = 0; (histRecordConverter.length/2) > i; i++) {
			histRecordList.push(histRecordConverter.splice(i*2,2));
			var choreName = histRecordList[i][0]; 
			var choreDateTime = histRecordList[i][1];

			var choreHistory = $("<div class='choreHistLI'><span class='choreHistName'>" + choreName
					    	+ " was preformed on </span><span class='choreHistDate'>" + choreDateTime 
					    	+ "</span></div>");
			//Append list and clear text field
		    $(".choreListHistory").append(choreHistory);
		}
    } else {
    	//if there are no chores done write " no chores done"
    }




	
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
});
*/