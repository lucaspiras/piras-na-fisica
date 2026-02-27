const base = window.location.hostname.includes("github.io")
  ? "/piras-na-fisica/"
  : "/";

fetch(base + "header/header.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("header").innerHTML = data;
  });