
function createHeader() {
return `
<header>
<canvas id="header-canvas"></canvas>
<div class="container nav">

<a class="brand notranslate" href="index.html">
<span translate="no">Kajal Baghestani</span>
</a>

<nav>
<a href="index.html">Home</a>
<a href="publications.html">Publications</a>
<a href="collaborate.html">Collaborate</a>
</nav>

<div class="right-controls">

<div class="language-menu">
<button class="language-button" onclick="toggleLanguageMenu()">
🌐
</button>

<div id="language-dropdown" class="language-dropdown">

    <a onclick="changeLanguage('en')">🇬🇧 English</a>
    <a onclick="changeLanguage('fr')">🇫🇷 Français</a>
    <a onclick="changeLanguage('de')">🇩🇪 Deutsch</a>
    <a onclick="changeLanguage('es')">🇪🇸 Español</a>

</div>
</div>

<div class="theme-buttons">

<button onclick="setTheme('light')" title="Light mode">
☀️
</button>

<button onclick="setTheme('dark')" title="Dark mode">
🪐
</button>

<button onclick="setTheme('blue')" title="Unicorn mode">
🦩
</button>

</div>

</div>

</div>
</header>`;
}



function createFooter() {
return `
<footer class="container">
<p>© 2026 <span translate="no">Kajal Baghestani</span></p>
</footer>`;
}


document.addEventListener("DOMContentLoaded", function(){

let header=document.getElementById("site-header");
let footer=document.getElementById("site-footer");

if(header) header.innerHTML=createHeader();
if(footer) footer.innerHTML=createFooter();

});
