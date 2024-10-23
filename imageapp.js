let accessKey = "xOo92dQQoAbYP-q4u_8R_EiOdf0lpc74yLcAPeHnDvk";

let formEl = document.querySelector("form");

let searchInputEl = document.getElementById("search-input");

let searchResultsEl = document.querySelector(".search-results");

let showMoreButtonEl = document.getElementById("show-more-button");

let inputData = "";

let page = 1;


 async function searchImage(){
  inputData = searchInputEl.value;
  
  let url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  console.log(url);

  let response = await fetch(url);

  let  data = await response.json();

  if(page === 1){
    searchResultsEl.innerHTML = "";
  }

  let results = data.results;

  results.map((result) =>{
    let imagewrapper = document.createElement("div");
    imagewrapper.classList.add("search-result");
    let image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    let imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;
   
    imagewrapper.appendChild(image);
    imagewrapper.appendChild(imageLink);

    searchResultsEl.appendChild(imagewrapper);
  })

  page++;

  

  if (page > 1){
    showMoreButtonEl.style.display = "block";

  }

 

}

formEl.addEventListener("submit", (event)=>{
  event.preventDefault();
  page = 1;
  searchImage();

});

showMoreButtonEl.addEventListener("click", ()=>{
  searchImage()
})