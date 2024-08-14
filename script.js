document.addEventListener("DOMContentLoaded", () => {
    const chatBox = document.getElementById("chat-box");
    const chatInput = document.getElementById("chat-input");

    document.getElementById("send-button").addEventListener("click", () => {
        const userInput = chatInput.value;
        chatInput.value = "";
        appendMessage("あなた", userInput, "user");

        fetchAIResponse(userInput).then(botResponse => {
            appendMessage("Bot", botResponse, "bot");
            chatBox.scrollTop = chatBox.scrollHeight;
        });
    });

    function appendMessage(sender, message, className) {
        const messageDiv = document.createElement("div");
        messageDiv.className = `message ${className}`;
        messageDiv.innerText = `${sender}: ${message}`;
        chatBox.appendChild(messageDiv);
    }

    async function fetchAIResponse(userInput) {
        const apiKey = "AIzaSyD0apvz-8_ZuGYGrIIDwHrauXQAKjpkC6k"; // ここにOpenAIのAPIキーを入力します
        const apiUrl = "https://api.openai.com/v1/completions";

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: userInput,
                max_tokens: 150
            })
        });

        const data = await response.json();
        return data.choices[0].text.trim();
    }
});
