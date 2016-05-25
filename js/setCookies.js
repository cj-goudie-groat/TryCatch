function setCookies() {
	if (currentScore > 100) {
		Cookies.set('100Trophy', 'yes');
	}

	if (currentScore > 500) {
		Cookies.set('500Trophy', 'yes');
	}

	if (currentScore > 1000) {
		Cookies.set('1000Trophy', 'yes');
	}
}
