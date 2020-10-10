//var btn = document.getElementById("btn");
//var dis = document.getElementById("info");
var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'http://awpstuff/profileData.json');
ourRequest.onload = function (){
    var ourData = JSON.parse(ourRequest.responseText);
    $(function(){
        $('#info').html(`${ourData[0].name}`);
    });
};
ourRequest.send();
