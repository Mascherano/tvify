import $ from 'jquery';
$(function(){
	// var header = document.getElementById('app-header');
	// var seleccion = $([document, header]);

	// $('#app-header').find('h1'); //encontrar un elemento h1 dentro del elemento padre con el id app-header.
	// $('#app-header').has('h1'); //encuentra el elemento con id app-header que contenga un elemento h1.
	// $('#app-header').has('.title'); //encuentra el elemento con id app-header que tenga una clase title.
	// $('#app-header').not('.title'); //encuentra el elemento con id app-header que no tenga una clase title.
	// $('p').filter('.title'); // filtra los elementos <p> que tengan la clase title.
	// $('p') //podemos concatenar distintas funciones para personalizar nuestra seleccion.
	// 	.filter('.text') //filtra por la condicion dentro de los parentesis.
	// 	.has('a') // busca el elemento p que contenga un elemento <a></a>
	// 	.first(); // y que sea el primero que encuentre.

	// $('p') //podemos concatenar distintas funciones para personalizar nuestra seleccion.
	// 	.filter('.text') //filtra por la condicion dentro de los parentesis.
	// 	.has('a') // busca el elemento p que contenga un elemento <a></a>
	// 	.eq(1); // podemos elegir entre los distintos elementos que encuentre el segunto o tercero, etc, pasando como parametro en los parentesis el indice a buscar.

	// // podemos crear elementos en el DOM y pasarles sus atributos directamente
	// var a = $('<a>', { //creamos el elemento
	// 	href: 'http://platzi.com',
	// 	target: '_blank',
	// 	html: 'ir a platzi'
	// })

	// $('#app-body').append(a); // lo agregamos al elemento con el id app-body.
	// console.log(a.attr('href')); // podemos imprimir el valor del atributo deseado.
	// a.attr('href', 'http://google.com'); //podemos cambiar el valor del atributo deseado.

	// //agregamos elementos al DOM de distintas maneras.
	// $('header#app-header')
	// 	.append($('<p>', {html: 'me acaban de crear' } ))

	// $('<p>', {html: 'me acaban de crear' })
	// .appendTo($('header#app-header'))
	// //agregamos elementos al DOM

	// $('h1').addClass('danger'); // agregamos una clase a un elemento del DOM

	// setTimeout(function(){
	// 	$('h1').removeClass('danger'); //quitamos la clase danger del elemento h1 en 1.5 segundos con la funcion setTimeout.
	// }, 1500)

	// $('h1').css({ // agregamos propiedades CSS a un elemento del DOM elegido.
	// 	'font-size' : '70px' // agrandamos el tamaño de letra
	// })
	//comentarios de clases -> ejemplos

	//Codigo del proyecto
	//funcion para recorrer los shows
	var $tvShowsContainer = $('#app-body').find('.tv-shows');

	$tvShowsContainer.on('click', 'button.like', function(ev){
		var $this = $(this);
		$this.closest('.tv-show').toggleClass('liked');
	})

	function renderShows(shows){
		$tvShowsContainer.find('.loader').remove();
		shows.forEach(function (show){
			var article = template
				.replace(':name:', show.name)
				.replace(':img:', show.image ? show.image.medium : '')
				.replace(':summary:', show.summary)
				.replace(':img alt:', show.name + ' Logo')

			var $article = $(article)
			$article.hide();
			$tvShowsContainer.append($article.fadeIn(2000));
		})
	}

	//Submit del form
	
	$('#app-body')
		.find('form')
		.submit(function onsubmit (ev) {
			ev.preventDefault();
			var busqueda = $(this)
				.find('input[type="text"]')
				.val();

			$tvShowsContainer.find('.tv-show').remove();
			var $loader = $('<div class="loader"></div>');
			$loader.appendTo($tvShowsContainer);
			$.ajax({
				url: 'http://api.tvmaze.com/search/shows',
				data: { q: busqueda},
				success: function (res, textStatus, xhr){
					$loader.remove();
					var shows = res.map(function (el){
						return el.show;
					})
					renderShows(shows);
				}
			})
		})

	var template = '<article class="tv-show">' +
					'<div class="left img-container">' +
						'<img src=":img:" alt=":img alt:">' +
					'</div>' +
					'<div class="right info">' +
						'<h2>:name:</h2>' +
						'<p>:summary:</p>' +
						'<button class="like">like</button>'
					'</div>' +
				'</article>';	

	if(!localStorage.shows){
		$.ajax('http://api.tvmaze.com/shows')
		.then(function (shows){
			$tvShowsContainer.find('.loader').remove();
			localStorage.shows = JSON.stringify(shows);
			renderShows(shows);
		})
	}else{
		renderShows(JSON.parse(localStorage.shows));
	}
})

