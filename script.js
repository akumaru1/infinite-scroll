const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//unsplash API
const count = 30;
const apiKey = 'KoM7j-T1yYzDAlsM045jLRsisAP8TGbFKuB-XXKhyKI';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//check if all image were loaded
function imageLoad(){
    imagesLoaded++;
    console.log(imagesLoaded);
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        console.log('ready =', ready);
    }
}

//helper funtion to set attributes on dom element
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

//create elements for link and photos, add to dom
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);

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

        //event listener, check when each is finished loading 
        img.addEventListener('load', imageLoad);
        
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

//check to see if scrolling near bottom page load more photos
window.addEventListener('scroll', () =>{
    //console.log('scrolled');
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){  
        ready = false;
        //window.scrollY :  distance from top of page user has scrolled
        //window.innerHeight : total height of browser window
        //document.body.offsetHeight : height of everything in the body incuding what is not whitin view
        //1000px less : need to subtract from offsetHeight to trigger event before bottom is reacheble

        // console.log('window.innerHeight', window.innerHeight);
        // console.log('window.scrollY', window.scrollY);
        // console.log('window.innerHeight + window.scrollY', window.innerHeight + window.scrollY);
        // console.log('document.body.offsetHeight - 1000', document.body.offsetHeight - 1000);

        getPhotos();
        console.log('load more');
    }
});

//on load
getPhotos();