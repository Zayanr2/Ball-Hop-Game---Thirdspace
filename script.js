const startScreen = document.getElementById("startScreen");
const instructionScreen =document.querySelector(".instructionScreen");
const instructionButton = document.querySelector(".instructionButton");
const backButtonInstructionScreen = document.querySelector(".BackButtonInstructionScreen");
instructionButton.addEventListener("click", function() {
    startScreen.style.display = "none";
    instructionScreen.style.display="block";});    

backButtonInstructionScreen.addEventListener("click", function() {
    instructionScreen.style.display="none"; 
    startScreen.style.display = "block"});