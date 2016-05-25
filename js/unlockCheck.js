function unlockCheck() {
	if (currentScore > 100) {
		localStorage.setItem("100Trophy", "Achieved!");
	}

	if (currentScore > 200) {
		localStorage.setItem('500Trophy', 'Achieved!');
	}

	if (currentScore > 300) {
		localStorage.setItem('1000Trophy', 'Achieved!');
	}
}
