(function () {

	var cats = ['poplinre', 'chewie'];

	cats.forEach(function(catName) {
		var catObj = document.getElementById(catName);
		var clickCounterObj = document.getElementById(catName + '_clickCounter');

		catObj.addEventListener('click', function(e) {
			clickCounterObj.innerText = parseInt(clickCounterObj.innerText) + 1;
		}, false);
	});
})();