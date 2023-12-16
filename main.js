//age span
const span = document.getElementById("ageSpan");
const currentYear = new Date().getFullYear();
const birthYear = 2000;
const age = currentYear - birthYear;
span.textContent = age;
