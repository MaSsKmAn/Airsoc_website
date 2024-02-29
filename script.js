const sentenceElement = document.getElementById('sentence');
const text = sentenceElement.innerText;
const caretElement = sentenceElement.querySelector('.caret');

// Split the text into an array of characters
const characters = text.split('');

// Create a function to type each character
function typeCharacter(index) {
    if (index < characters.length) {
        sentenceElement.innerText = text.substring(0, index) + characters[index];
        caretElement.style.left = `${(index / characters.length) * 100}%`;
        setTimeout(() => typeCharacter(index + 1), 100);
    } else {
        // Reset the animation when the text is complete
        caretElement.style.animation = 'blink 1s step-end infinite';

        // Wait for a short delay before starting the next iteration
        setTimeout(() => {
            // Reset the text and caret position
            sentenceElement.innerText = text;
            caretElement.style.left = '0%';

            // Start typing the characters again
            typeCharacter(0);
        }, 1000);
    }
}

// Start typing the characters
typeCharacter(0);