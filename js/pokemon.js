// Requirement of 20 pokemons per page for pagination
var itemsPerPage = 20;

// This function is to do a text filter on the Pokemon list
function filterPoke() {
    var filter = $("#filterPoke");
    var pokeList = $("#pokeUl").find("li");

    // if the filter is cleared, the default behaviour of pagination commence
    if (!filter.val()) {
        // removing all the filters in the list
        $(pokeList).removeClass("filter");
        // default to rendering pagination of pokemons in the list
        paginateList();
        return;
    }

    // traverse pokemon list to filter name and index
    for (var i = 0; i < pokeList.length; i++) {
        var thisPoke = $(pokeList[i]);
        var poke = thisPoke.find("a");
        if (poke.text().toUpperCase().indexOf(filter.val().toUpperCase()) > -1) {
            // if the filter matches the pokemon, add class 'filter' to item
            thisPoke.addClass("filter");
        } else {
            // remove class 'filter' and hide pokemon if the search does not match pokemon
            thisPoke.removeClass("active filter");
        }
    }
    // paginate the search filter result
    if ($("#pokeUl").children('.filter').length > 0) {
        list = $("#pokeUl").children('.filter');
        paginateList(list);
    }
}

// Initial function of rendering pokemons in a list
function renderPokemonList(pokesJson) {
    var pokeLi = "";
    if (pokesJson && pokesJson.length > 0) {
        for (var i in pokesJson) {
            var pokeNum = parseInt(i) + 1;
            pokeLi = pokeLi + "<li><a href='#" + pokesJson[i].url + "'><img src='images/" + pokeNum + ".png'>" + 
                "<span>" + formatPokeIndex(pokeNum) + "<br>" + pokesJson[i].name + "</span></a></li>"
        }
    }
    return pokeLi
}

// Formats the pokemon index to be in 3-digit length with 0-paddings
function formatPokeIndex(num) {
    return "#" + ("000" + num).slice(-3);
}

// Function that paginates a list
// 
// Parameters
// list: Optional. if passed, it will paginate passed-in list, otherwise defaults to the whole list
// direction: Optional. the direction of either 'next' or 'prev' for pagination
//
// If no parameters are passed, the default behaviour is to paginate the whole pokemon list from the first pokemon
//
function paginateList(list, direction) {
    var first, start, end;
    if (!list) {
        list = $("#pokeUl").find("li");
    } 
    first = getFirstVisibleItem(list);
    if (direction){
        switch(direction) {
            case "next":
                // determine the next set of pokemon to be display in pagination
                start = first + itemsPerPage;
                end = first + itemsPerPage * 2;
                if (end > list.length-1) {
                    end = list.length;
                    start = (end-itemsPerPage > 0) ? end-itemsPerPage : 0;
                }
                break;
            case "prev":
                // determine the previous set of pokemon to be display in pagination
                start = first - itemsPerPage;
                end = first;
                if (start < 0) {
                    start = 0;
                    end = (start+itemsPerPage > list.length) ? list.length : start+itemsPerPage;
                }
                break;
            default:  
        }
    } else {
        // default behaviour of paginating the pokemon list from the first pokemon
        start = 0;
        end = itemsPerPage;
    }

    $(list).removeClass("active");
    for (var i = start; i < end; i++) {
        $(list[i]).addClass("active");
    }
}

// return the first visible pokemon in pagination
function getFirstVisibleItem(list){
    var offset = $(list).filter('.active')[0];
    return index = $(list).index(offset);
}

// next page function for pagination
function nextPage() {
    var list;
    // if pokemon are filtered by search
    if ($("#pokeUl").children('.filter').length > 0) {
        list = $("#pokeUl").children('.filter');
    }
    paginateList(list, "next");
}

// previous page function for pagination
function prevPage() {
    var list;
    // if pokemon are filtered by search
    if ($("#pokeUl").children('.filter').length > 0) {
        list = $("#pokeUl").children('.filter');
    }
    paginateList(list, "prev");
}

$(document).ready(function() {
    var pokeListApi = "https://pokeapi.co/api/v2/pokemon/?limit=151";

    // Retrieving the pokemon list
    $.ajax({
        url: pokeListApi, 
        success: function(data){
            var pokesJson = data.results;
            $("#pokeUl").html(renderPokemonList(pokesJson));
            paginateList();
        }
    });

    $("#prev").click(function(e) {
        e.preventDefault();
        prevPage();
    })

    $("#next").click(function(e) {
        e.preventDefault();
        nextPage();
    })
})