function fetchData() {
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open("post", "http://localhost:4000/graphql", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onload = function () {
    console.log('data returned:', xhr.response);
  }
  xhr.send(JSON.stringify({query: "{ hello }"}));
}

var fetchBtn = document.getElementById('fetch-btn');
fetchBtn.onclick = fetchData;
