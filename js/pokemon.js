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
        // default to rednering 20 pokemons in the list
        paginateList(0, itemsPerPage);
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
            // remove class 'filter' if the search does not match pokemon
            thisPoke.removeClass("active filter");
        }
    }
    // paginate the result to show maximum of 20 in the list
    if ($("#pokeUl").children('.filter').length > 0) {
        list = $("#pokeUl").children('.filter');
        offset = $(list)[0];
        index = $(list).index(offset);
        paginateList(index, index+itemsPerPage, list);
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
// start: the index of the first item to be shown
// end: the index of the last item to be shown
// list: Pptional. if passed, it will paginate passed-in list, otherwise defaults to the whole list
//
function paginateList(start, end, list) {
    if (!list) {
        list = $("#pokeUl").find("li");
    }
    $(list).removeClass("active");
    if (end > list.length-1) {
        end = list.length;
        start = (end-itemsPerPage > 0) ? end-itemsPerPage : 0;
    }
    if (start < 0) {
        start = 0;
        end = (start+itemsPerPage > list.length) ? list.length : start+itemsPerPage;
    }
    for (var i = start; i < end; i++) {
        $(list[i]).addClass("active");
    }
}

// next page function for pagination, currently sets at 20 items per page
function nextPage() {
    var list, offset, index;
    if ($("#pokeUl").children('.filter').length > 0) {
        list = $("#pokeUl").children('.filter');
        offset = $(list)[0];
        index = $(list).index(offset);
        paginateList(index+itemsPerPage, index+itemsPerPage*2, list);
    } else {
        offset = $("#pokeUl").find('.active')[0];
        index = $("#pokeUl").children().index(offset);
        paginateList(index+itemsPerPage, index+itemsPerPage*2);
    }
}

// previous page function for pagination, currently sets at 20 items per page
function prevPage() {
    var list, offset, index;
    if ($("#pokeUl").children('.filter').length > 0) {
        list = $("#pokeUl").children('.filter');
        offset = $(list)[0];
        index = $(list).index(offset);
        paginateList(index-itemsPerPage, index, list);
    } else {
        offset = $("#pokeUl").find('.active')[0];
        index = $("#pokeUl").children().index(offset);
        paginateList(index-itemsPerPage, index);
    }
}

$(document).ready(function() {
    var pokeListApi = "https://pokeapi.co/api/v2/pokemon/?limit=151";

    // Retrieving the pokemon list
    $.ajax({
        url: pokeListApi, 
        success: function(data){
            var pokesJson = data.results;
            $("#pokeUl").html(renderPokemonList(pokesJson));
            paginateList(0, itemsPerPage);
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