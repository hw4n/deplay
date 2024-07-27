function Chat({ data }: { data: any }) {
    return (
        <div className="bg-gray-600 w-screen h-screen overflow-auto">
            <div className="chat-messages">
                {data.map((message: any) => (
                    <ChatMessage message={message} key={message.cid} />
                ))}
            </div>
        </div>
    );
};

function ChatMessage({ message }: { message: any }) {
    return (
        <div className={`chat-message ${message.deleted ? "deleted" : (message.edited ? "edited" : "")}`}>
            <div className="chat-message-header">
                <img src="https://via.placeholder.com/150" alt="User" />
                <div className="chat-message-header-name">{message.author}</div>
                <div className="chat-message-header-time">{message.timestamp}</div>
                <div>{message.deleted ? "" : ''}</div>
            </div>
            <div className="chat-message-content">
                <p>{message.message}</p>
            </div>
            <div className="chat-message-content-history">
                {message.history.map((entry: string, index: number) => {
                    return (
                        <div className="chat-message-content-history-wrap" key={message.cid + "h" + index}>
                            <p className="history-index">({index})</p>
                            <p className="history-content">{entry}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Chat;