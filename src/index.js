import $ from 'jquery'
import page from 'page'
import { getShows, searchShows } from 'C:/Users/Chelomario/Desktop/tvify/src/tvmaze-api-client'
import renderShows from 'C:/Users/Chelomario/Desktop/tvify/src/render'
import $tvShowsContainer from 'C:/Users/Chelomario/Desktop/tvify/src/tv-shows-container'
import 'C:/Users/Chelomario/Desktop/tvify/src/search-form'
import qs from 'qs'

page('/', function(ctx, next){
	$tvShowsContainer.find('.tv-show').remove();
	if(!localStorage.shows){
		getShows(function(shows){
			$tvShowsContainer.find('.loader').remove();
			localStorage.shows = JSON.stringify(shows);
			renderShows(shows);
		})
	}else{
		renderShows(JSON.parse(localStorage.shows));
	}
})

page('/search', function (ctx, next){
	$tvShowsContainer.find('.tv-show').remove();
	var $loader = $('<div class="loader"></div>');
	$loader.appendTo($tvShowsContainer);
	const busqueda = qs.parse(ctx.querystring);
	searchShows(busqueda, function (res){
		$loader.remove();
		var shows = res.map(function (el){
			return el.show;
		})
		renderShows(shows);
	})
})

page()