(function () {
	var model = {
		catsList: [
			{
				name: 'Poplinre',
				img: 'poplinre.jpg',
				counter: 0
			},
			{
				name: 'Chewie',
				img: 'chewie.jpg',
				counter: 0
			},
			{
				name: 'Jetske',
				img: 'jetske.jpg',
				counter: 0
			},
			{
				name: 'Mundabor',
				img: 'mundabor.jpg',
				counter: 0
			},
			{
				name: 'Sweet',
				img: 'sweet.jpg',
				counter: 0
			},
			{
				name: 'Cowboy Dave',
				img: 'cowboy_dave.jpg',
				counter: 0
			}
		],
		currentCat: null
	};

	var octopus = {
		getCurrentCat: function() {
			return model.currentCat;
		},

		getCatNamesList: function() {
			return model.catsList.map(function(catElement) {
				return catElement.name;
			});
		},

		setCurrentCat: function(catsName) {
			model.currentCat = model.catsList.find(function (catElement) {
				return catsName == catElement.name;
			});
			catsViewerView.render();
		},

		increaseCurrentCatsCounter: function() {
			model.currentCat.counter ++;
			catsViewerView.updateCounter();
		},

		init: function() {
			catsListView.init();
			catsViewerView.init();
		}

	};

	var catsListView = {
		init: function() {
			this.catsListItemTemplate = $('#catsListItemTemplate').html();
			this.catsList = $('#catsList');
			this.render();
		},

		addCatsListItem: function(catName) {
			var catsList = this.catsList,
			    catsListItemTemplate = this.catsListItemTemplate;

			catsList.append(this.catsListItemTemplate.replace(/\{\{catName\}\}/ig, catName));
			catsList.children(':last').click(function(e) {
				octopus.setCurrentCat(catName);
			});
		},

		render: function() {
			var catNamesList = octopus.getCatNamesList();
			for (var i in catNamesList) {
				this.addCatsListItem(catNamesList[i]);
			}
		}
	};

	var catsViewerView = {
		init: function() {
			this.catsViewerTemplate = $('#catsViewerTemplate').html();
			this.catsViewer = $('#catsViewer');
			this.render();
		},


		updateCounter: function() {
			this.counter.text(octopus.getCurrentCat().counter);
		},

		render: function() {
			var currentCat = octopus.getCurrentCat();
			if (currentCat == null) return;

			var catsViewerTemplate = this.catsViewerTemplate
				.replace(/{{catName}}/ig, currentCat.name)
				.replace(/{{catImage}}/ig, currentCat.img)
				.replace(/{{numberOfClicks}}/ig, currentCat.counter);;

			this.catsViewer.html(catsViewerTemplate);
			this.counter = this.catsViewer.find("#counter");
			this.catsViewer.children('.catPicture').click(function() {
				octopus.increaseCurrentCatsCounter();
			});
		}

	};

	octopus.init();
})();