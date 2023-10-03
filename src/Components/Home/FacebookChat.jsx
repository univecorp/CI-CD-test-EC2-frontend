import { CustomChat, FacebookProvider } from "react-facebook";

function FacebookChat() {
  return (
    <div>
      <FacebookProvider appId="563733835761352" chatSupport>
        <CustomChat pageId="103658422156150" minimized={false} />
      </FacebookProvider>
    </div>
  );
}

export default FacebookChat;
