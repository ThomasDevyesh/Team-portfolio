window.addEventListener('load', function(){
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'http://awpstuff/profileData.json');
    ourRequest.onload = function (){
    var ourData = JSON.parse(ourRequest.responseText);
    var NamesInJson = [];
    var AgeInJson = [];
    var ImageInJson = [];
    
    for(let i = 0; i<ourData.length;i++){
        NamesInJson[i] = ourData[i].name;
        AgeInJson[i] = ourData[i].age;
        ImageInJson[i] = ourData[i].image;
    }

    $('#search').keyup(function(){
        $('#result').html('');
        var searchField = $('#search').val();
        var regx = new RegExp(searchField, "i");
        for(i = 0; i<ourData.length;i++){
            //console.log(ourData[i].name);
            //if(ourData[i].name.search(regx) != 1){
                //$('#result').append(`<li class="list-group-item" >${ourData[i].name}</li>`);
            //}
        }
    });

    $('#btn-search').click(function(){
        var searchedName = document.getElementById('search').value;
        var passNameIfThere = NamesInJson.indexOf(searchedName);
        if (passNameIfThere != -1){
            console.log(passNameIfThere);
        }
        else{
            alert("Invalid Profile");
        }
    });

}
ourRequest.send();

function appendProfile(profileData){
    $('#append-profile').append(`
    <div>
    <img src = "${profileData[0].image}" >
    <h2>${profileData[0].name}</h2>
    </div>
    `);
}

});
 /*// this code is for search bar
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
    });*/


/*
$.getJSON('profileData.json', function(data){
    // just a simple title
    document.getElementById("p-title").innerHTML = `
    <h1> There are ${data.length} Profiles Available</h1>
    `;
    // afte search button is clicked
    $('#sub-search').click(function(){
        var enteredSearchVal = document.getElementById("search").value;
        var checkName = data.map(function(profileName){
            return profileName.name;
        }).join(',');
        checkName = checkName.split(",");
        console.log(typeof(checkName), checkName[1]);
    });
});
*/

