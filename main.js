      var modal = document.getElementById("myModal");

      var btn = document.getElementById("myBtn");

      var span = document.getElementsByClassName("close")[0];

      btn.onclick = function() {
        modal.style.display = "block";
      }

      span.onclick = function() {
        modal.style.display = "none";
      }

      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }

//------------------------------------------------------------------------------------
      window.addEventListener('load', function(){
        var ourRequest = new XMLHttpRequest();
        ourRequest.open('GET', 'http://localhost/Team-portfolio/profileData.json');
        ourRequest.onload = function (){
        var ourData = JSON.parse(ourRequest.responseText);
        window.NamesInJson = [];
        window.RollnoInJson = [];
        window.ImageInJson = [];
        window.LinkedInJson = [];
        window.DescInJson = [];
        window.StoreSearchedNames = [];
     
        // fetching data from JSON and storing it into list to make it easy
        for(let i = 0; i<ourData.length;i++){
            NamesInJson[i] = ourData[i].name;
            RollnoInJson[i] = ourData[i].rollno;
            ImageInJson[i] = ourData[i].image;
            LinkedInJson[i] = ourData[i].linkedin;
            DescInJson[i] = ourData[i].description;
        }
 //----------------------------------------------------------------------------------   
      /*Jquery for search bar*/
      $(document).ready(function(){
      $('#search').keyup(function(){
          var searchbar = document.getElementById("search").value;
          var nodisplay = document.getElementById("result");
          nodisplay.style.display = "block";
          
          if (searchbar != ""){
              $('#result').html('');
              var searchField = $('#search').val();
              var regx = new RegExp(searchField, "i");
              //UpdateVariables(getLocalData());
              $.each(NamesInJson, function(key, value){
                  if (value.search(regx) != -1){
                      $('#result').append(`<a href="#${value}" class="text-decoration-none"><li class="list-group-item" >${value}</li></a>`);
                  }
                        /*$('#result').append(`<li class="list-group-item" >No Such Group Member :(</li>`);*/
                  });
                  
              
          } else {
              nodisplay.style.display = "none";
          }

              
      });
      
  });
  //-----------------------------------------------------------------------------------
  
  // after search is clicked
  $('#btn-search').click(function(){
    var searchedName = document.getElementById('search').value.toLowerCase();
    //Fetching from LocalStorage
    UserLocalDAta = getLocalData();
    UpdateVariables(UserLocalDAta);
    var IndexOfSearchedName = NamesInJson.indexOf(searchedName);

    // if searched name is not available in 'NamesInJson' then .indexof returns -1
    if (IndexOfSearchedName != -1){
        if (StoreSearchedNames.indexOf(searchedName) == -1){
            StoreSearchedNames.push(searchedName);
            if(IndexOfSearchedName>4){
              prependNewUserCard(IndexOfSearchedName-5);
            }
            else{
              prependProfile(IndexOfSearchedName);
            }
            var close = document.getElementsByClassName("close")[0];
            //var closeusr = document.getElementsByClassName("closeusr")[0];
            close.onclick = function(){
              document.getElementById(searchedName).style.display = "none";
              StoreSearchedNames.pop(searchedName);
            };
            
            
        }
        else{
          //console.log(searchedName)
            alert("Profile Already Listed, or there was some error. Refresh and Retry");
        }
    }
    else{
        alert("Invalid Search, Try Again");
    }
});

}
ourRequest.send();

getLocalData = () =>{
  let d = JSON.parse(localStorage.getItem('MyUserData'));
  return d;
}

function UpdateVariables(data){
  for(let i = 0; i<data.length; i++){
    let check = NamesInJson.indexOf(data[i].FULLNAME.toLowerCase());
    if (check == -1){
      NamesInJson.push(data[i].FULLNAME.toLowerCase());
    }
    else{
      continue;
    }
  }
}
function prependNewUserCard(profileIndex){
  td = getLocalData();
$('#prepend-profile').prepend(`


  <div class="added-profile">

    <div class="card mb-3" style="width: 90%;border-radius: 8px;margin-left: 5%;" id="${td[profileIndex].FULLNAME}">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img src="DefaultUser.png" class="card-img" alt="${td[profileIndex].FULLNAME}" style="display: block;height: 15rem;object-fit: contain;border: 2px solid #000;margin: 10px;">
      </div>
      <div class="col-md-8">

      <span class="close closeusr" style="margin-right: 2%">&times;</span>

        <div class="card-body">
        <h5 class="card-title">${td[profileIndex].FULLNAME}, ${td[profileIndex].ROLLNO}</h5>
          <p class="card-text">${td[profileIndex].DESCRIPTION}</p>
          
        </div>
        <div class="align-bottom" style="padding-left: 90%;">
          <a href="${td[profileIndex].LINKEDIN}"><i class="fab fa-linkedin fa-3x" style="color:rgb(0, 0, 0)"></i></a>
        </div>
      </div>
      
    </div>
    
  </div>

    </div>
`);
}
function prependProfile(profileIndex){
    $('#prepend-profile').prepend(`
    <div class="added-profile">

    <div class="card mb-3" style="width: 90%;border-radius: 8px;margin-left: 5%;" id="${NamesInJson[profileIndex]}">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img src="${ImageInJson[profileIndex]}" class="card-img" alt="${NamesInJson[profileIndex]}" style="display: block;height: 15rem;object-fit: contain;border: 2px solid #000;margin: 10px;">
      </div>
      <div class="col-md-8">

      <span class="close" style="margin-right: 2%">&times;</span>

        <div class="card-body">
        <h5 class="card-title">${NamesInJson[profileIndex].charAt(0).toUpperCase()+NamesInJson[profileIndex].slice(1)}, ${RollnoInJson[profileIndex]}</h5>
          <p class="card-text">${DescInJson[profileIndex]}</p>
          
        </div>
        <div class="align-bottom" style="padding-left: 90%;">
          <a href="${LinkedInJson[profileIndex]}"><i class="fab fa-linkedin fa-3x" style="color:rgb(0, 0, 0)"></i></a>
        </div>
      </div>
      
    </div>
    
  </div>

    </div>
    `);
    }

});