function filterPoke() {
    var filter = $("#filterPoke");
    var pokeList = $("#pokeUl").find("li");

    if (!filter.val()) {
        paginateList(0, 20);
        return;
    }

    for (var i = 0; i < pokeList.length; i++) {
        var thisPoke = $(pokeList[i]);
        var poke = thisPoke.find("a");
        if (poke.text().toUpperCase().indexOf(filter.val().toUpperCase()) > -1) {
            thisPoke.addClass("active");
        } else {
            thisPoke.removeClass("active");;
        }
    }
}

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

function formatPokeIndex(num) {
    return "#" + ("000" + num).slice(-3);
}

function paginateList(start, end) {
    var list = $("#pokeUl").find("li");
    $(list).removeClass("active");
    if (start < 0) {
        start = 0;
        end = 20;
    }
    if (end > list.length-1) {
        end = list.length;
        start = end - 20;
    }
    for (var i = start; i < end; i++) {
        $(list[i]).addClass("active");
    }
}

function nextPage() {
    var offset = $("#pokeUl").find('.active')[0];
    var index = $("#pokeUl").children().index(offset);

    paginateList(index+20, index+40);
}

function prevPage() {
    var offset = $("#pokeUl").find('.active')[0];
    var index = $("#pokeUl").children().index(offset);

    paginateList(index-20, index);
}

$(document).ready(function() {
    var pokeListApi = "https://pokeapi.co/api/v2/pokemon/?limit=151";

    $.ajax({
        url: pokeListApi, 
        success: function(data){
            var pokesJson = data.results;
            $("#pokeUl").html(renderPokemonList(pokesJson));
            paginateList(0, 20);
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