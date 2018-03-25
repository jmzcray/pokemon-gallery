# Pokemon Gallery

This project is to display Pokemon from number 1 to 151 on a responsive webpage.
- Each Pokemon should show an image, number and name. 
- Pokemon should be sorted by number.
- A maximum of 20 Pokemon should be shown at once.
- Pokemon list are retrieved from: http://pokeapi.co/api/v2/pokemon?limit=151
- Search box filter


#### Dev note:
- Considered a few more modern JS framework such as Angular and React, however, due to the time constraint decision was made to use good ol' JQuery
- Considered using a library for pagination, however the use case here is quite simple and the instruction has not specified the allowance of usage of a non-standard library
- Plan to revamp this mini project with modern JS framework for educational purposes
- Considered using lazyload of retrieving Pokemon list for pagination via: https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20 - however there is a restriction on 300 requests per IP, therefore the whole list was retrieved instead

#### To run:
Simply open up the _pokemon.html_ file or go here: http://jimz.id.au/pokemon-gallery/pokemon.html