document.addEventListener("DOMContentLoaded", () => {
  const githubForm = document.getElementById("github-form");
  githubForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const searchFormInput = document.querySelector("input#search").value;
    getUsers(searchFormInput);
  });

  const getUsers = (userName) => {
    fetch(`https://api.github.com/search/users?q=${userName}`)
      .then((resp) => resp.json())
      .then((data) => {
        const userNameElement = document.getElementById("user-list");
        const dataList = data.items;
        dataList.forEach((user) => {
          const li = document.createElement("li");
          li.innerText = `id: ${user.id}, username: ${user.login}`;
          userNameElement.appendChild(li);
          const img = document.createElement("img");
          img.setAttribute("src", user.avatar_url);
          const br = document.createElement("br");
          li.setAttribute("id", `${user.login}`);
          li.appendChild(br);
          li.appendChild(img);
          li.addEventListener("click", function () {
            fetch(`https://api.github.com/users/${user.login}/repos`)
              .then((resp) => resp.json())
              .then((data) => {
                const userReposElement = document.getElementById("repos-list");
                const h2 = document.createElement("h2");
                h2.innerText = `${user.login}'s repos:`;
                userReposElement.appendChild(h2);
                data.forEach((repo) => {
                  const li = document.createElement("li");
                  li.innerText = `id: ${repo.id}, name: ${repo.name}`;
                  userReposElement.appendChild(li);
                });
              });
          });
        });
      });
  };
});
