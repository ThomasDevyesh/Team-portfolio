$(document).ready(function(){
    // this code is for search bar
    $('#search').keyup(function(){
        $('#result').html('');
        var searchField = $('#search').val();
        var regx = new RegExp(searchField, "i");
        $.getJSON('profileData.json', function(data){
            $.each(data, function(key, value){
                if (value.name.search(regx) != -1){
                    $('#result').append(`<li class="list-group-item" >${value.name}</li>`);
                }
            });
        });
    });
    // this part of code is to append profile taking name from the search bar
    $.getJSON('profileData.json', function(data){
        // just a simple title
        document.getElementById("p-title").innerHTML = `
        <h1> There are ${data.length} Profiles Available</h1>
        `;
        // afte search button is clicked
        $('#sub-search').click(function(){
            var enteredSearchVal = document.getElementById("search").value;
            var chaeckNme = data.filter(function(profileArray){
                var namesFromDAta = profileArray.image;
                console.log(profileArray.image);
            });
        });
    });   
});
/*
var n = data.map(function(d){
    return d.image
});
console.log(typeof(n));
console.log(n)

$(function(){
    $("thead").append(`<tr>
        <td><img src="${n}" ></td>
    </tr>`);
})*/

















