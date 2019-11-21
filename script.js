$('.sidenav').sidenav();

let input;
let coords;

$('button').on('click', () => {
	//format input for api request
	input = $('input').val().replace(/ /, '+').replace(/,/, '%2c');
	//geocoder api to get coordinates for city input
	fetch(`https://api.opencagedata.com/geocode/v1/json?q=${input}&key=88306764a2b649a58e3b46f97c30034d`)
		.then((result) => {
			return result.json();
		})
		.then((data) => {
			console.log(data);
			//set coordinates to a variable
			coords = data.results[0].geometry.lat + ',' + data.results[0].geometry.lng;
			$('h1').html($('input').val());
			//reset input back to blank
			$('input').val('');
			//run coordinates in the dark sky weather api
			fetch(
					`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/0fbbe3730c899841e175b5c0bfdaa1ba/${coords}`
				)
				.then((result) => {
					return result.json();
				})
				.then((data) => {
					console.log(data);
					$('#temp').html(`Current temp: ${data.currently.temperature} °F`);
					$('#realfeel').html(`Real Feel: ${data.currently.apparentTemperature} °F`);
					$('#hourlySummary').html(`Summary: ${data.hourly.summary}`);
				})
				.catch((error) => {
					console.log(error);
				});
		})
		.catch((error) => {
			console.log(error);
		});
});