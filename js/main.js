$( document ).ready(function() {	
	var toggleForms = function(){
		$("#login").toggleClass("hide");
		$("#register").toggleClass("hide");
	};
	
	if (localStorage.getItem("email") == null){
		toggleForms();
	} 

	$("#clear").on("click", function(){
		localStorage.clear();
	});	
	$(".switch").on("click", function(){
		toggleForms();
	});
    $("#registerBtn").on("click", function(){
    	localStorage.setItem("email", $("#registerEmail").val().toLowerCase());
	    localStorage.setItem("password", $("#registerPassword").val());	
	    //toggleForms();
    });
    $("#loginBtn").on("click", function(){
		if  (localStorage.getItem("email") == $("#loginEmail").val().toLowerCase() && 
			localStorage.getItem("password") == $("#loginPassword").val()) {
			alert("In");
		} else {
			//alert("Out "+localStorage.getItem("email")+" is not "+$("#loginEmail").val()+" and/or "
			//	+localStorage.getItem("password")+" is not "+$("#loginPassword").val());
		}
	});

    








    var validations ={
	    email: [/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/, 'Please enter a valid email address'],
		password: [/.{8,}/, 'Password must be 8 or more characters.']
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
        // Set the regular expression to validate the email 
        validation = new RegExp(validations['password'][0]);
        // validate the email value against the regular expression
        if (!validation.test(this.value)){
            // If the validation fails then we show the custom error message
            this.setCustomValidity(validations['password'][1]);
            return false;
        } else {
            // This is really important. If the validation is successful you need to reset the custom error message
            this.setCustomValidity('');
        }
	});








});
















/*//sideNav Constructor
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