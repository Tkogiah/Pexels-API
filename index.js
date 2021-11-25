function log(a) {
    console.log(a);
}

const search = document.getElementById('search')


search.addEventListener('keyup', (e) => {
    if(!search.value) return;
    if (e.code === "Enter") { 
        runSearch(search.value)
    }
})

function runSearch(param) {

}

function buildDisplay() {
    
    let newImageDiv = document.createElement('div')
}


var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       document.getElementById("demo").innerHTML = xhttp.responseText;
    }
};
xhttp.open("GET", 'https://api.pexels.com/v1/', true);
xhttp.send();