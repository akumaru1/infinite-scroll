const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

//unsplash API
const count = 10;
const apiKey = 'KoM7j-T1yYzDAlsM045jLRsisAP8TGbFKuB-XXKhyKI';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//helper funtion to set attributes on dom element
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

//create elements for link and photos, add to dom
function displayPhotos() {
    //run funtion for each object in photosArray
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);         DRY
        // item.setAttribute('target', '_blank');               DRY
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        //create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);         DRY
        // img.setAttribute('alt', photo.alt_description);      DRY
        // img.setAttribute('title', photo.alt_description);    DRY
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        
        //put <img> inside <a> the put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//get photos from api
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }catch (error){

    }
}

//on load
getPhotos();