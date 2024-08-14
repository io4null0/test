document.addEventListener("DOMContentLoaded", () => {
    const chatBox = document.getElementById("chat-box");
    const chatInput = document.getElementById("chat-input");

    const chatbot = {
        currentScenario: "greeting",
        scenarios: {
            "greeting": {
                message: "こんにちは！今日はどんなことをお手伝いできますか？",
                options: {
                    "1": "現在の天気を教えてください。",
                    "2": "おすすめのレストランを教えてください。",
                    "3": "終了する"
                },
                next: {
                    "1": "weather",
                    "2": "restaurant",
                    "3": "end"
                }
            },
            "weather": {
                message: "現在の天気は晴れです。他にご質問はありますか？",
                options: {
                    "1": "はい、他の質問があります。",
                    "2": "いいえ、これで終了します。"
                },
                next: {
                    "1": "greeting",
                    "2": "end"
                }
            },
            "restaurant": {
                message: "近くのおすすめレストランは「寿司太郎」です。他にご質問はありますか？",
                options: {
                    "1": "はい、他の質問があります。",
                    "2": "いいえ、これで終了します。"
                },
                next: {
                    "1": "greeting",
                    "2": "end"
                }
            },
            "end": {
                message: "ご利用ありがとうございました。またお会いしましょう！",
                options: {}
            }
        },
        getResponse(input) {
            const scenario = this.scenarios[this.currentScenario];
            let response = { message: scenario.message };

            if (scenario.options) {
                response.options = scenario.options;
                if (input in scenario.next) {
                    this.currentScenario = scenario.next[input];
                } else {
                    response.message += "\n無効な選択肢です。もう一度お試しください。";
                }
            }
            return response;
        }
    };

    document.getElementById("send-button").addEventListener("click", () => {
        const userInput = chatInput.value;
        chatInput.value = "";
        appendMessage("あなた", userInput);
        const botResponse = chatbot.getResponse(userInput);
        appendMessage("試験品", botResponse.message);

        if (botResponse.options) {
            for (const [key, value] of Object.entries(botResponse.options)) {
                appendMessage("試験品", `${key}: ${value}`);
            }
        }
        chatBox.scrollTop = chatBox.scrollHeight;
    });

    function appendMessage(sender, message) {
        const messageDiv = document.createElement("div");
        messageDiv.className = "message";
        messageDiv.innerText = `${sender}: ${message}`;
        chatBox.appendChild(messageDiv);
    }
});
