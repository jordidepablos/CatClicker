(function () {

	var cats = [
		{
			name: 'Poplinre',
			img: 'poplinre.jpg'
		},
		{
			name: 'Chewie',
			img: 'chewie.jpg',
		},
		{
			name: 'Jetske',
			img: 'jetske.jpg',
		},
		{
			name: 'Mundabor',
			img: 'mundabor.jpg',
		},
		{
			name: 'Sweet',
			img: 'sweet.jpg',
		}
	];

	var Cat = function (catObj) {

		var createViewerElement = function(cat) {
			var att;
			var el;
			var viewerElement = document.createElement('div');

			// set element id
			att = document.createAttribute('id');
			att.value = cat.name;
			viewerElement.setAttributeNode(att);

			// set element class
			att = document.createAttribute('class');
			att.value = 'catPicture';
			viewerElement.setAttributeNode(att);

			// append img child to element
			var img = document.createElement('img');
			att = document.createAttribute('src');
			att.value = 'img/' + cat.img;
			img.setAttributeNode(att);

			viewerElement.appendChild(img);

			// append cats name
			var name = document.createElement('div');
			att = document.createAttribute('class');
			att.value = 'name';
			name.setAttributeNode(att);

			el = document.createElement('h1');
			el.appendChild(document.createTextNode(cat.name));

			name.appendChild(el);

			viewerElement.appendChild(name);

			// append cats counter
			var counter = document.createElement('div');
			att = document.createAttribute('class');
			att.value = 'counter';
			counter.setAttributeNode(att);

			el = document.createElement('h1');
			
			cat.counterElement = document.createElement('span');
			att = document.createAttribute('id');
			att.value = cat.name + '_clickCounter'
			cat.counterElement.setAttributeNode(att);
			cat.counterElement.appendChild(document.createTextNode(cat.counterValue));


			el.appendChild(cat.counterElement);
			el.appendChild(document.createTextNode(' Clicks'));

			counter.appendChild(el);

			// add element listener
			viewerElement.addEventListener('click', (function(cat) {
				return function() {
					cat.counterValue ++;
					cat.counterElement.innerText = cat.counterValue;
				};
			})(cat), false);

			viewerElement.appendChild(counter);

			return viewerElement;
		};

		var createListElement = function(cat) {
			var listElement = document.createElement('li');
			listElement.appendChild(document.createTextNode(cat.name));
			listElement.addEventListener('click', (function(cat) {
				return function() {
					cat.show();
				};
			})(cat), false);

			return listElement;
		};


		this.name = catObj.name;
		this.img = catObj.img;
		this.counterValue = 0;
		this.viewerElement = createViewerElement(this);
		this.listElement = createListElement(this);
		this.show = function() {
			document.getElementById('catsViewer').innerHTML = "";
			document.getElementById('catsViewer').appendChild(this.viewerElement);
		};

		return {
			addToCatsList: (function (cat) {
				return function() {
					document.getElementById('catsList').appendChild(cat.listElement);
				};
			})(this)
		};
	}

	cats.forEach(function (cat) {
		var catObj = new Cat(cat);
		catObj.addToCatsList();
	});
})();