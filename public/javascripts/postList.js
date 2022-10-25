console.log("call postList.js");

(async () => {
    const postList = document.querySelector(".post-list");
    postList.innerHTML = "";
    for (let i = 0; i < 10; i++) {
        const cardBox = document.createElement("div");
        cardBox.className = "card-box col";
        const mycard = document.createElement("div");
        mycard.className = "card text-center";
        const cardBody = document.createElement("div");
        cardBody.className = "card-body";
        const title = document.createElement("h5");
        title.className = "card-title";
        title.innerHTML = "title";
        const description = document.createElement("p");
        description.className = "card-text";
        description.innerHTML = "Descrption";
        const anch = document.createElement("a");
        anch.className = "btn btn-primary";
        anch.href = "#";
        anch.innerHTML = "See Details";
        const time = document.createElement("div");
        time.className = "card-footer text-muted";
        time.innerHTML = "OCT 10th";

        cardBody.appendChild(title);
        cardBody.appendChild(description);
        cardBody.appendChild(anch);
        mycard.appendChild(cardBody);
        mycard.appendChild(time);
        cardBox.appendChild(mycard);
        postList.appendChild(cardBox);
    }
})();
