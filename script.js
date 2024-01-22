const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");

let userText = null;
const API_KEY = "";

const createElement =(html, className) => {
  const chatDiv = document.createElement("div");
  chatDiv.classList.add("chat", className);
  chatDiv.innerHTML= html;
  return chatDiv;
}

const getChatResponse = (incomingChatDiv) => {
  const API_URL ="https://api.openai.com/v1/completions";
const pElement = document.createElement("p");
  const requestOptions = {
    method: "POST",
    headers : {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${API_KEY}`
  },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: userText,
        max_tokens: 2048,
        temperature: 0.2,
        n: 1,
        stop: "null"
      })
}

  try{
    const response = await (await fetch(API_URL, requestOptions)).json();
  } catch(error) {
    pElement.textContent = response.choices[0].text.trim();
  }

  incomingChatDiv.querySelector(".typing-animation").remove();
incomingChatDiv.querySelector(".chat-details").appendChild(pElement);
}


const showTypingAnimation = () => {
 const html = `<div class="chat-content">
  <div class="chat-details">
  <img src="Images/icon.png" width="50px" alt="icon-img">
  <div class="typing-animation">
<div class="typing-dot" style="--delay: 0.2s"></div>
<div class="typing-dot" style="--delay: 0.3s"></div>
<div class="typing-dot" style="--delay: 0.4s"></div>
</div>
</div>
<i class="fa fa-clone" aria-hidden="true"></i>
</div>`;
}
const handleOutgoingChat= () => {
  userText = chatInput.value.trim();
  const html = `<div class="chat-content">
  <div class="chat-details">
  <img src="Images/man.jpg" width="50px" alt="man-img">
    <p>${userText}</p>
     </div>
     </div>`;


const incomingChatDiv = createElement(html, "incoming");
chatContainer.appendChild(outgoingChatDiv);
getChatResponse();
setTimeout(showTypingAnimation, 500);
}

sendButton.addEventListener("click", handleOutgoingChat);