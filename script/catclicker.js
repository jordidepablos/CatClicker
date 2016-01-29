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
		currentCat: null,
		adminViewVisible: false
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

		toggleAdminView: function() {
			model.adminViewVisible = !model.adminViewVisible;
			adminView.render(model.adminViewVisible);
		},

		updateCurrentCat: function(name, img, counter) {
			model.currentCat.name    = name;
			model.currentCat.img     = img;
			model.currentCat.counter = counter;
			this.toggleAdminView();
			catsViewerView.render();
		},

		init: function() {
			catsListView.init();
			catsViewerView.init();
			adminView.init();
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
			this.catsViewer.find('#admButton').click(function () {
				octopus.toggleAdminView();
			});
		}

	};

	var adminView = {
		init: function() {
			this.adminView = $('.adminView');
			this.admName   = this.adminView.find('#admCatName');
			this.admImg    = this.adminView.find('#admCatImg');
			this.admClicks = this.adminView.find('#admCatClicks');
			this.adminView.find('#admCancelBtn').click(function() {
				octopus.toggleAdminView();
			});
			this.adminView.find('#admSaveBtn').click( (function(data) {
				return function() {
					octopus.updateCurrentCat(data.admName.val(), data.admImg.val(), data.admClicks.val());
				};
			})(this) );
			this.render(false);
		},

		render: function(visibility) {
			if (visibility) {
				currentCat = octopus.getCurrentCat();
				this.admName.val(currentCat.name);
				this.admImg.val(currentCat.img);
				this.admClicks.val(currentCat.counter);
				this.adminView.show();
			}
			else {
				this.adminView.hide();
			}
		}
	};

	octopus.init();
})();