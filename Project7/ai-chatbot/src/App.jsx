import { ChatProvider } from "./context/ChatContext";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
import Header from "./components/Header";

function App() {
  return (
    <ChatProvider>
      <div className="h-screen flex flex-col">
        <Header />
        <ChatWindow />
        <ChatInput />
      </div>
    </ChatProvider>
  );
}

export default App;
