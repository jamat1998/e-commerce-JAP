const nav = document.getElementById('ULnavProfile');
const storageEmail = localStorage.getItem('emailValue')
nav.innerHTML += `
<li class="nav-item">
<a class="nav-link active" href="my-profile.html">${storageEmail}</a>
</li>`