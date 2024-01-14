var sourceText = document.getElementById("source-text");
var resultText = document.getElementById("result-text");
var convertButton = document.getElementById("go");

convertButton.addEventListener("click", function() {
    var text = sourceText.value.trim();

    resultText.innerHTML = "";

    for (var i = 0; i < text.length; i++) {
        var letter = text[i].toLowerCase();

        // Створити новий елемент зображення
        var img = document.createElement("img");
        img.src = "./images/" + letter + ".png";
        img.alt = letter;
        img.classList.add("letter-image");

        resultText.appendChild(img);
    }
});