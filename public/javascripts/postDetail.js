const url = location.href;
const id = url.substring(url.lastIndexOf("/") + 1);

console.log("postdetails.js call");

//get posts and return geo location
let geoloc = (async () => {
    const posts = await fetch("/api/posts/" + id);
    const datas = await posts.json();
    console.log("datas : " + datas);
    console.log("Got Post By ID: ", datas);
    if (posts.ok) {
        const title = document.querySelector("h1");
        const description = document.querySelector("#description");
        const createdAt = document.querySelector("#createdAt");
        const deleteButton = document.getElementById("deleteButton");
        const siteTitle = document.querySelector("title");
        const data = datas[0];

        title.innerHTML = data.title;
        siteTitle.innerHTML = "Trashare: " + data.title;
        description.innerHTML = data.description;
        createdAt.innerHTML = "Published: " + timediff(data.createdAt);

        //allow user to delete post
        const user = JSON.parse(sessionStorage.getItem("user"));

        if (user && user.email == data.userEmail) {
            deleteButton.style.visibility = "visible";
        }

        //Load photo to carousel
        const postImages = document.querySelector(".carousel-inner");
        postImages.innerHTML = "";
        let images = data.images;

        for (let img of images) {
            const divI = document.createElement("div");
            if (images.indexOf(img) == 0) {
                divI.className = "carousel-item active";
            } else {
                divI.className = "carousel-item";
            }
            const imgEle = document.createElement("img");
            imgEle.className = "d-block w-100";
            imgEle.src = img;
            divI.appendChild(imgEle);
            postImages.appendChild(divI);
        }

        let rloc = {
            //this will be the location from database
            lat: parseFloat(data.latitude),
            lng: parseFloat(data.longitude),
        };

        return rloc;
    }
})();

/* eslint-disable no-unused-vars*/
//load google map lcation
function initGoogle() {
    const google = window.google;
    (async () => {
        let options = {
            center: await geoloc,
            zoom: 10,
        };
        let map = new google.maps.Map(document.getElementById("map"), options);

        new google.maps.Circle({
            center: await geoloc,
            radius: 5000,
            strokeWeight: 0,
            fillColor: "#FFB6C1",
            fillOpacity: 0.35,
            map: map,
        });
    })();
}

/*
This function calculate time difference
input: millisecond  
return: a string indicate how long ago the post is created 
*/
function timediff(createdTime) {
    let diff = new Date().getTime() - new Date(parseInt(createdTime));
    let seconds = Math.floor(diff / 1000),
        minutes = Math.floor(seconds / 60),
        hours = Math.floor(minutes / 60),
        days = Math.floor(hours / 24),
        years = Math.floor(days / 365);

    switch (true) {
        case days >= 365:
            if (years == 1) {
                return years + " year ago";
            } else {
                return years + " years ago";
            }
        case hours >= 24 && days < 365:
            if (days == 1) {
                return days + " day ago";
            } else {
                return days + " days ago";
            }
        case minutes >= 60 && hours < 24:
            if (hours == 1) {
                return hours + " hour ago";
            } else {
                return hours + " hours ago";
            }
        case seconds > 60 && minutes < 60:
            if (minutes == 1) {
                return minutes + " minute ago";
            } else {
                return minutes + " minutes ago";
            }

        default:
            if (seconds == 1) {
                return seconds + " second ago";
            } else {
                return seconds + " seconds ago";
            }
    }
}

//Delete post function
async function deletePost() {
    await fetch("/api/posts/" + id, {
        method: "delete",
    });

    window.location.replace("/posts");
}
