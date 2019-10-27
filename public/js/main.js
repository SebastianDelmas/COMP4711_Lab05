// Created September 26, 2019 by Sebastian Delmas

window.onload = () => {
    let itemsArray=[];
    fetch('/getData').then((response) =>{
        if (response.status !== 200) {
            console.log('Status Code: ' + response.status);
            return;
        }
        // Examine the text in the response
        response.json().then(function(data) {
            for (i = 0; i < data.length; i++)
                addOneItem(data[i], i);
        });
    })
};

function addOneItem(artistInfo, index) {
    var btn_delete = document.createElement("input"),
        // text_delete = document.createTextNode("delete"),
        textName = artistInfo.name,
        textAboutArtist = artistInfo.about,
        artistImage = artistInfo.url;
    var li = document.createElement("li");
    var form = document.createElement("form");
    form.method = "POST";
    form.action = "/artist/delete/" + String(index);
    var image = document.createElement("img");
    var artDes = document.createElement("div");
    artDes.classList.add("artistDes");
    var artName = document.createElement("div");
    artName.classList.add("artistName");
    var artOrg = document.createElement("div");
    artName.textContent = textName;
    artOrg.textContent = textAboutArtist;
    artDes.appendChild(artName);
    artDes.appendChild(artOrg);
    image.setAttribute("src", artistImage);
    // var textnode=document.createTextNode(" "+textName + textAboutArtist);
    li.appendChild(form);
    form.appendChild(image);
    form.appendChild(artDes);
    btn_delete.type = 'submit';
    btn_delete.value = 'delete';
    // btn_delete.appendChild(text_delete);
    // btn_delete.onclick = deleteRowFunction;
    form.appendChild(btn_delete);
    
    document.getElementById("listOfArtists").children[0].appendChild(li);
    document.getElementById("listOfArtists").style.display = "block";
}



// // get request
// fetch('/getData').then(d => d.json()).then(data => console.log(data));

// // get request
// fetch('/getArtist')
//     .then(d => d.json())
//     .then(data => {
//         console.log("Benji is barking from getArtist!");
//         console.log(data.name);
//     })
//     .catch((err) => console.log(err));


// Submit form
document.addEventListener('submit', e => {

    // store reference to form to make later code easier to read
    const form = e.target;

    // prevent the default form submit
    e.preventDefault();

    var artistFirstName = getInputValue('artistNameForm');
    var artistAbout = getInputValue('aboutArtistForm');
    var artistImg = getInputValue('imageURLForm');
    let artistArray = [];
    var artist = {
        "name": artistFirstName,
        "about": artistAbout,
        "url": artistImg
    };
    artistArray.push(artist)
    var artistJSON = JSON.stringify(artistArray);
    // Post
    // const form = new FormData(document.getElementById('artistForm'));

    fetch('/addplayer', {
        method: 'POST',
        body: artistJSON,
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    }).then( res => {
        if(res.status==200) {
            // add player to dom
            console.log('all good');
            document.getElementById("FormContainer").style.display="none";
            document.getElementById("artistForm").reset();

        }   
    })

    // let nodeUL = document.createElement("UL");
    // nodeUL.setAttribute("id", ulID);

    // let newNodeUL = document.getElementById("theUL");
    
    // let node = document.createElement("LI");
    // node.setAttribute("id", liID);
    // let span = document.createElement("span");
    // let pName = document.createElement("p");
    // let pAbout = document.createElement("p");
    // let imgURL = document.createElement("img");
    // let deleteBtn = document.createElement("button");
    // var t = document.createTextNode("Delete");
    // deleteBtn.appendChild(t);
    // deleteBtn.style.backgroundColor = "Red";
    // deleteBtn.style.color = "white";

    // deleteBtn.addEventListener("click", function(){
    //     deleteArtist(liID);
    // });

    // imgURL.src = artistImg;

    // pName.innerHTML = artistFirstName;
    // pAbout.innerHTML = artistAbout;
    // //let textnode = document.createTextNode(artistFirstName);


    // span.appendChild(pName);
    // span.appendChild(pAbout);
    // node.appendChild(deleteBtn);
    // node.appendChild(imgURL);
    // node.appendChild(span);
    // newNodeUL.appendChild(node);
    
    // // document.getElementById("listOfArtists").appendChild(nodeUL);

    // addToTextFile(pName,pAbout,imgURL);
    
    // document.getElementById("FormContainer").style.display="none";
    // document.getElementById("artistForm").reset();
    // console.log("Form should be hidden");

    // // Save the list to localStorage
	// localStorage.setItem('artistList', theUL.innerHTML);
});




// Hides the form. The form should only be shown if the user wants
// to add an artist
document.getElementById("FormContainer").style.display="none";

var theUL = document.querySelector('#theUL');

// Used to give each UL a unique ID. Passed to the remove method to ensure the correct
// artist is removed from the list.
var counterID = 0;

// gets the input value from certian elements
function getInputValue(id) 
{
    return document.getElementById(id).value;
}


// Testing
function benjiBarking(bark)
{
    console.log("Benji is barking! Javascript file is connected! From " + bark);
}

benjiBarking("Main JS file");

// Finished Testing

// Show the form when the button is clicked
document.getElementById("addArtistBtn").addEventListener("click", addArtist);

function addArtist()
{
    benjiBarking("addArtist Function!");
    if(document.getElementById("FormContainer").style.display === "none")
    {
        document.getElementById("FormContainer").style.display="block";
    } else
    {
        document.getElementById("FormContainer").style.display="none";
    }
}


/*
// Submit form
document.addEventListener('submit', e => {

    // store reference to form to make later code easier to read
    const form = e.target;

    // prevent the default form submit
    e.preventDefault();

    var ulID = counterID++;
    var liID = counterID++;

    var artistFirstName = getInputValue('artistNameForm');
    var artistAbout = getInputValue('aboutArtistForm');
    var artistImg = getInputValue('imageURLForm');

    let nodeUL = document.createElement("UL");
    nodeUL.setAttribute("id", ulID);

    let newNodeUL = document.getElementById("theUL");
    
    let node = document.createElement("LI");
    node.setAttribute("id", liID);
    let span = document.createElement("span");
    let pName = document.createElement("p");
    let pAbout = document.createElement("p");
    let imgURL = document.createElement("img");
    let deleteBtn = document.createElement("button");
    var t = document.createTextNode("Delete");
    deleteBtn.appendChild(t);
    deleteBtn.style.backgroundColor = "Red";
    deleteBtn.style.color = "white";

    deleteBtn.addEventListener("click", function(){
        deleteArtist(liID);
    });

    imgURL.src = artistImg;

    pName.innerHTML = artistFirstName;
    pAbout.innerHTML = artistAbout;
    //let textnode = document.createTextNode(artistFirstName);


    span.appendChild(pName);
    span.appendChild(pAbout);
    node.appendChild(deleteBtn);
    node.appendChild(imgURL);
    node.appendChild(span);
    newNodeUL.appendChild(node);
    
    // document.getElementById("listOfArtists").appendChild(nodeUL);

    addToTextFile(pName,pAbout,imgURL);
    
    document.getElementById("FormContainer").style.display="none";
    document.getElementById("artistForm").reset();
    console.log("Form should be hidden");

    // Save the list to localStorage
	localStorage.setItem('artistList', theUL.innerHTML);
});
*/

// check for saved values
var savedArtists = localStorage.getItem('artistList');

// If there is any saved artists, add them to the list
if(savedArtists)
{
    theUL.innerHTML = savedArtists;
}


// Deletes artist from the list.
function deleteArtist(liID)
{
    console.log("Lewis is barking from the delete artist fucntion");
    document.getElementById(liID).remove();
    
}



// Search function
document.getElementById("searchArtistBtn").addEventListener("click", searchArtists);




// Filtering through the List of artists
function searchArtists() {
    
    // Declare variables
    var input, filter, ul, li, a, i, txtName, txtAbout, pName, pAbout;
    input = document.getElementById('searchText');
    filter = input.value.toUpperCase();
    ul = document.getElementById("theUL");
    li = ul.getElementsByTagName('LI');
    benjiBarking("searchArtists Fucntion"); 

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        pName = li[i].getElementsByTagName("p")[0];
        pAbout = li[i].getElementsByTagName("p")[1];
        txtName = pName.textContent;
        txtAbout = pAbout.textContent;

        console.log("Name: " + txtName + " About: " + txtAbout);

        if (txtName.toUpperCase().indexOf(filter) > -1 || txtAbout.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
            console.log("text found!");
        } else {
            li[i].style.display = "none";
            console.log("text not found");
        }
  }
}







