import { useState } from "react";
import { FaRedo, FaRegPaperPlane } from "react-icons/fa";
import { useSelector } from "react-redux";
import config from "../../../config/apiConfig";
import PageTitle from "../../Common/PageTitle";
import "./userProfile.css";
function UniveAI() {
  const { user } = useSelector((state) => state.auth);
  const [message, setMessage] = useState(""),
    [lastResponseChoices, setLastResponseChoices] = useState([]),
    [lastResponseChoiceIndex, setLastResponseChoiceIndex] = useState(0),
    [chats, setChats] = useState([]),
    [isTyping, setIsTyping] = useState(false),
    [model, setModel] = useState(""),
    chat = async (e) => {
      e.preventDefault();
      if (!message) return;
      setIsTyping(true);
      scrollTo(0, 1e10);
      let msgs = chats;
      msgs.push({ role: "user", content: message });
      setChats([...msgs]);
      setMessage("");
      fetch(`${config.apiUrl}/chatgpt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chats,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          msgs.push(data.output.choices[0].message);
          setLastResponseChoices(data.output.choices.map((x) => x.message));
          setLastResponseChoiceIndex(0);
          setChats([...msgs]);
          setIsTyping(false);
          scrollTo(0, 1e10);
          if (!model) {
            setModel(data.output.model);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getNextChoiceForLastMessage = (e) => {
      e.preventDefault();
      if (lastResponseChoices.length > 0) {
        let msgs = chats;
        if (lastResponseChoiceIndex === lastResponseChoices.length - 1) {
          alert("No more responses from model");
        } else {
          msgs.push({ role: "user", content: message });
          msgs.push(lastResponseChoices[lastResponseChoiceIndex + 1]);
        }
        setChats([...msgs]);
      }
    };

  return (
    <div className="user-discussion">
      <PageTitle title="Unive-AI" />
      <h2 className="text-center mb-5">Unive - AI Assistant</h2>
      <div className="user-chat">
        {chats && chats.length
          ? chats.map((chat, index) => (
              <p
                key={index}
                className={chat.role === "assistant" ? "assistant_msg" : ""}
              >
                <span>
                  <b>
                    {chat.role === "user" && <b>{user.lastName}</b>}
                    {chat.role === "assistant" && <b>univeAI</b>}
                  </b>
                </span>
                <span>:</span>
                <span>{chat.content}</span>
              </p>
            ))
          : ""}
      </div>
      <div className={isTyping ? "" : "hide"}>
        <p className="assistant_msg ">
          <i>{isTyping ? "Typing..." : ""}</i>
        </p>
      </div>
      <form action="" className="chatform" onSubmit={(e) => chat(e)}>
        <input
          type="text"
          className="chatinput"
          name="message"
          value={message}
          placeholder="Send a message."
          onChange={(e) => setMessage(e.target.value)}
          autoFocus
        />
        <FaRedo
          className="resend-icon searchbar-icon"
          onClick={(e) => getNextChoiceForLastMessage(e)}
        />
        <FaRegPaperPlane
          className="send-icon searchbar-icon"
          onClick={(e) => chat(e)}
        />
      </form>
    </div>
  );
}

export default UniveAI;
