async function maakPost(entry) {
    let post = document.createElement("div");
    post.classList.add("post");

    let figure = document.createElement("figure");
    figure.classList.add("figure");
    let randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
    figure.style.backgroundColor = randomColor;

    let img = document.createElement("img");
    img.classList.add("img");
    img.setAttribute("src", entry.post);

    let content = document.createElement("div");
    content.classList.add("inhoud");

    let pfp = document.createElement("img");
    pfp.classList.add("pfp");
    pfp.setAttribute("src", entry.pfp);

    let text = document.createElement("div");
    text.classList.add("text");

    let username = document.createElement("h2");
    username.classList.add("username");
    username.innerText = entry.username;

    let context = document.createElement("p");
    context.classList.add("context");
    context.innerText = entry.category;

    post.append(figure)
    figure.append(img);
    post.append(content);
    content.append(pfp);
    content.append(text);
    text.append(username);
    text.append(context);

    return post;
}

async function maakPosts() {
    const response = await fetch("assets/json/MOCK_DATA.json");
    const data = await response.json();
    let posts = document.getElementById("posts");

    let random = [];
    for (let i = 0; i < 32; i++) {
        random.push(Math.floor(Math.random() * data.length));
    }

    for (const index of random) {
        let post = await maakPost(data[index]);
        posts.append(post);
    }

    let laatste = document.createElement("div");
    laatste.id = "laatste";
    posts.append(laatste);

    let observer = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting) {
            laatste.remove();

            await new Promise((resolve) => setTimeout(resolve, 300));
            await maakPosts();
        }
    });

    observer.observe(laatste);
}

maakPosts();
