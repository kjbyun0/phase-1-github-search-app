document.addEventListener('DOMContentLoaded', () => {
    const frmSearch = document.getElementById('github-form');
    frmSearch.addEventListener('submit', (e) => {
        e.preventDefault();
        
        fetch(`https://api.github.com/search/users?q=${e.target.children[0].value}`)
        .then(resp => resp.json())
        .then(users => {
            const ulUsers = document.getElementById('user-list');
            ulUsers.innerHTML = '';
            const ulRepos = document.getElementById('repos-list');
            ulRepos.innerHTML = '';
            users.items.forEach(item => {
                const liUser = document.createElement('li');
                liUser.textContent = item.login;
                liUser.style.cursor = 'pointer';
                const imgAvatar = document.createElement('img');
                imgAvatar.src = item.avatar_url;
                // imgAvatar.style.cursor = 'pointer';
                const br = document.createElement('br');
                const p = document.createElement('p');
                liUser.append(br, imgAvatar, p);
                ulUsers.appendChild(liUser);

                // Adding click event handler to each user id li
                liUser.addEventListener('click', (e) => {
                    if (e.target.tagName === 'LI') {
                        fetchRepos(e.target.textContent);  
                    } else {
                        fetchRepos(e.target.parentNode.textContent);
                    }
                });
            });
        })
        .catch(error => console.log(error));

        e.target.reset();
    });
});

function fetchRepos(userId) {
    fetch(`https://api.github.com/users/${userId}/repos`)
    .then(resp => resp.json())
    .then(repos => {
        //console.log(repos);
        const ulRepos = document.getElementById('repos-list');
        ulRepos.innerHTML = '';
        repos.forEach(repo => {
            const liRepo = document.createElement('li');
            liRepo.textContent = repo.full_name;
            ulRepos.appendChild(liRepo);
        });
    })
    .catch(error => console.log(error));
}
