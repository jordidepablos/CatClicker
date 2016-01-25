(function () {

	var cats = [
		{
			name: 'Poplinre',
			img: 'poplinre.jpg'
		},
		{
			name: 'chewie',
			img: 'chewie.jpg',
		}
	];

	var Cat = function (catObj) {
		this.name = catObj.name;
		this.img = catObj.img;
		this.counterValue = 0;
		
		var att;
		var el;

		// create element
		this.element = document.createElement('div');

		// set element id
		att = document.createAttribute('id');
		att.value = this.name;
		this.element.setAttributeNode(att);

		// set element class
		att = document.createAttribute('class');
		att.value = 'catPicture';
		this.element.setAttributeNode(att);

		// append img child to element
		var img = document.createElement('img');
		att = document.createAttribute('src');
		att.value = 'img/' + this.img;
		img.setAttributeNode(att);

		this.element.appendChild(img);

		// append cats name
		var name = document.createElement('div');
		att = document.createAttribute('class');
		att.value = 'name';
		name.setAttributeNode(att);

		el = document.createElement('h1');
		el.appendChild(document.createTextNode(this.name));

		name.appendChild(el);

		this.element.appendChild(name);

		// append cats counter
		var counter = document.createElement('div');
		att = document.createAttribute('class');
		att.value = 'counter';
		counter.setAttributeNode(att);

		el = document.createElement('h1');
		
		this.counterElement = document.createElement('span');
		att = document.createAttribute('id');
		att.value = this.name + '_clickCounter'
		this.counterElement.setAttributeNode(att);
		this.counterElement.appendChild(document.createTextNode(this.counterValue));


		el.appendChild(this.counterElement);
		el.appendChild(document.createTextNode(' Clicks'));

		counter.appendChild(el);

		// add element listener
		var that = this;
		this.element.addEventListener('click', function(e) {
			that.counterValue ++;
			that.counterElement.innerText = that.counterValue;
		}, false);

		this.element.appendChild(counter);	

		return {
			add: function() {
				document.body.appendChild(that.element);
			}
		};
	}

	cats.forEach(function (cat) {
		new Cat(cat).add();
	});
})();