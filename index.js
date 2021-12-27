function log(a) {
    console.log(a);
}
let pageCount = 1
let searchQuery = ''
const search = document.getElementById('search')
const images = document.getElementById('images')
const description = document.getElementById('description')
const load = document.getElementById('load-more')



search.addEventListener('keyup', (e) => {
    if(!search.value) return;
    pageCount = 1
    searchQuery = search.value
    searchValue = search.value.toUpperCase()
    if (e.code === "Enter") { 
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            
            if (this.readyState == 4 && this.status == 200) {
                while(images.firstChild) {
                    images.removeChild(images.firstChild)
                }
                pageCount = 1;
                let content = JSON.parse(xhttp.responseText);
                let imageArray = content.photos
                description.innerHTML = `DISPLAYING IMAGES FOR ${searchValue}`
                
                for(let i = 0; i < imageArray.length; i++) {
                    let newImage = document.createElement('img')
                    newImage.src = imageArray[i].src.medium
                    newImage.classList.add('photo')
                    newImage.id = i
                    images.appendChild(newImage) 
                }
            }
            search.value = ''
            load.classList.remove('hidden');   
        };
        xhttp.open("GET", `https://api.pexels.com/v1/search/?page=${pageCount}&per_page=15&query=${search.value}`, true);
        xhttp.setRequestHeader('Authorization', '563492ad6f91700001000001cdefa1219ee747f4959f7436bb7fb6a2')
        xhttp.send();
    }
})
load.addEventListener('click', (e) => {
    
    pageCount += 1;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {  
        
        if (this.readyState == 4 && this.status == 200) {

            let content = JSON.parse(xhttp.responseText);
            let imageArray = content.photos
            
            for(let i = 0; i < imageArray.length; i++) {
                let newImage = document.createElement('img')
                newImage.src = imageArray[i].src.medium
                newImage.classList.add('photo')
                newImage.id = i
                images.appendChild(newImage) 
            }
        }
           
    };
    xhttp.open("GET", `https://api.pexels.com/v1/search/?page=${pageCount}&per_page=15&query=${searchQuery}`, true);
    xhttp.setRequestHeader('Authorization', '563492ad6f91700001000001cdefa1219ee747f4959f7436bb7fb6a2')
    xhttp.send();                  
})

