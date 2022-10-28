// By Zhiyi Jin
console.log("call postList.js");

(async () => {
    let posts = await fetch("/api/posts", {
        method: "get",
    });

    let datas = await posts.json();
    if (datas.length > 0) {
        const postList = document.querySelector(".post-list");
        postList.innerHTML = "";
        datas.forEach((data) => {
            const cardBox = document.createElement("div");
            cardBox.className = "card-box col";
            const mycard = document.createElement("div");
            mycard.className = "card text-center";
            const cardBody = document.createElement("div");
            cardBody.className = "card-body";
            const title = document.createElement("h5");
            title.className = "card-title";
            title.innerHTML = data.title;
            const description = document.createElement("p");
            description.className = "card-text";
            description.innerHTML = data.description;
            const anch = document.createElement("a");
            anch.className = "btn btn-primary";
            anch.href = "/posts/" + data._id;
            anch.innerHTML = "See Details";

            let date = new Date(parseInt(data.createdAt));
            let month = date.toLocaleString("en-us", { month: "short" });
            let day = date.getDate();
            const time = document.createElement("div");
            time.className = "card-footer text-muted";
            time.innerHTML = month + " " + day + " ";

            cardBody.appendChild(title);
            cardBody.appendChild(description);
            cardBody.appendChild(anch);
            mycard.appendChild(cardBody);
            mycard.appendChild(time);
            cardBox.appendChild(mycard);
            postList.appendChild(cardBox);
        });
    }
})();
