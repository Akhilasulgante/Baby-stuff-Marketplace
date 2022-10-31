// Dynamic rendering of navbar
(() => {
  let navbar = document.getElementById("header");

  let user = JSON.parse(sessionStorage.getItem("user"));
  let loginSection = user
    ? `<div id="greet">Hi, ${user.firstName} ${user.lastName}</div>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="/" id="signOutLink"><i class="fas fa-sign-out-alt"></i> Sign out</a>
          </li>
        </ul>`
    : `<ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="/login"><i class="fas fa-sign-in-alt"></i> Sign in</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/signup"><i class="fas fa-user-plus"></i> Sign up</a>
        </li>
      </ul>`;

  let createPostLink = user
    ? `<li class="nav-item">
        <a class="nav-link" aria-current="page" href="/posts/createpost">
          <i class="far fa-plus-square"></i> Create post
        </a>
      </li>`
    : "";

  navbar.innerHTML = `
  <nav id="navbar" class="navbar navbar-expand-lg navbar-light mynavbar-bg">
    <div class="container">
        <div class="leftContainer">
            <a class="navbar-brand" href="/"
                ><img src="/images/logo.png" alt="Serendipity Logo"
            /></a>
        </div>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="/posts"><i class="far fa-newspaper"></i> Posts</a>
            </li>
            ${createPostLink}
          </ul>
          <div class="d-flex">
            ${loginSection}
          </div>
        </div>
      </div>
    </nav>`;
})();

(() => {
  let signOut = document.getElementById("signOutLink");
  if (signOut) {
    signOut.addEventListener("click", () => {
      sessionStorage.setItem("user", null);
    });
  }
})();
