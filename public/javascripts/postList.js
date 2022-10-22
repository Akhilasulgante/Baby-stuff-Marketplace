console.log("postlist.js");

(async () => {
    let posts = await fetch("/api/posts", {
        method: "get",
    });

    let datas = await posts.json();
    if (datas.length === 0) {
        let res = await fetch("/api/posts/createDefaultPosts");
        window.location.replace("/posts");
    } else {
        const postList = document.querySelector(".post-list");
        postList.innerHTML = "";
        datas.forEach((data) => {
            const list = document.createElement("li");
            const containerDiv = document.createElement("div");
            const time = document.createElement("time");
            const title = document.createElement("h2");
            const anch = document.createElement("a");

            let date = new Date(parseInt(data.createdAt));
            let month = date.toLocaleString("en-us", { month: "short" });
            let day = date.getDate();

            list.className = "row";
            time.innerHTML = month + " " + day + " ";
            containerDiv.className = "titleContainer";
            containerDiv.appendChild(time);
            anch.className = "result-title";
            anch.href = "/posts/" + data._id;
            anch.innerHTML = data.title;
            title.appendChild(anch);

            containerDiv.appendChild(title);
            list.appendChild(containerDiv);
            postList.appendChild(list);
        });
    }
})();
