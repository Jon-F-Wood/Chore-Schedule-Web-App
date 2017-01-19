//sideNav Constructor
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
	btnId: 'noteNav'
});






