function unlockTrophy() {
	if (localStorage.getItem("100Trophy") === "Achieved!" {
	    var image = document.getElementById('unlock100');
	    if (image.src.match("images/lock.png")) {
	        image.src = "images/100trophy.png";
	    } 
	}

	if (localStorage.getItem("500Trophy") === "Achieved!") {
	    var image = document.getElementById('unlock500');
	    if (image.src.match("images/lock.png")) {
	        image.src = "images/500trophy.png";
	}

	if (localStorage.getItem("1000Trophy") === "Achieved!") {
		    var image = document.getElementById('unlock1000');
	    if (image.src.match("images/lock.png")) {
	        image.src = "images/1000trophy.png";
	}
}
