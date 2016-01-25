(function () {
	var catObj = document.getElementById('catImg');
	var clickCounterObj = document.getElementById('clickCounter');

	catObj.addEventListener('click', function(e) {
		clickCounterObj.innerText = parseInt(clickCounterObj.innerText) + 1;
	}, false);
})();