function log(a) {
    console.log(a);
}

const search = document.getElementById('search')
const images = document.getElementById('images')
const description = document.getElementById('description')

search.addEventListener('keyup', (e) => {
    if(!search.value) return;
    let searchValue = search.value.toUpperCase()
    log(searchValue)
    if (e.code === "Enter") { 
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                while(images.firstChild) {
                    images.removeChild(images.firstChild)
                }
                let content = JSON.parse(xhttp.responseText);
                let imageArray = content.photos
                description.innerHTML = `DISPLAYING IMAGES FOR ${searchValue}`
                log(content)
                for(let i = 0; i < imageArray.length; i++) {
                    let newImage = document.createElement('img')
                    newImage.src = imageArray[i].src.medium
                    newImage.classList.add('photo')
                    newImage.id = i
                    images.appendChild(newImage) 
                }
            }
            search.value = ''
        };
        xhttp.open("GET", `https://api.pexels.com/v1/search?query=${search.value}`, true);
        xhttp.setRequestHeader('Authorization', '563492ad6f91700001000001cdefa1219ee747f4959f7436bb7fb6a2')
        xhttp.send();
    }
})