import * as CryptoJS from 'crypto-js';

function messageSwitch(message: string) {
    // find out what type of message it is

    let imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
    let videoExtensions = ['.mp4', '.mov', '.avi'];
    let urlFound = message.match(/(https?:\/\/[^\s]+)/g);

    if (!urlFound) {
        return ["text", message];
    }

    let url = urlFound[0];

    if (url.includes('tenor.com'))
        return ["tenor", url];

    if (url.includes('youtube.com'))
        return ["youtube", url.split('v=')[1]];

    if (url.includes('youtu.be'))
        return ["youtube", url.split('.be/')[1]];

    if (imageExtensions.some((ext) => url.includes(ext)))
        return ["image", url];

    if (videoExtensions.some((ext) => url.includes(ext)))
        return ["video", url];
    
    return ["url", url];
}

function processEncryptedMessage(message: string, key: string = "") {
    if (message.startsWith('U2FsdGVkX1') && !key) {
        return "(encrypted)";
    }
    try {
        let decryptedMessage = CryptoJS.AES.decrypt(message, key).toString(CryptoJS.enc.Utf8);

        if (decryptedMessage.startsWith('U2FsdGVkX1')) {
            decryptedMessage = CryptoJS.AES.decrypt(decryptedMessage, key).toString(CryptoJS.enc.Utf8);
        }

        return decryptedMessage;
    } catch (e) {
        return "(decryption error)";
    }
}

function processMessage(message: string, key: string = "") {
    let plainMessage = processEncryptedMessage(message, key);
    let [type, content] = [...messageSwitch(plainMessage)];
    return { type, content };
}

function Chat({ data, decryptionKey }: { data: any, decryptionKey: string }) {
    return (
        <div className="bg-gray-600 w-screen h-screen overflow-auto">
            <div className="chat-messages">
                {data.map((message: any) => (
                    <ChatMessage message={message} key={message.cid} decryptionKey={decryptionKey} />
                ))}
            </div>
        </div>
    );
};

function ChatElementSwitch({ type, content } : { type: string, content: string }) {
    switch (type) {
        case "youtube":
            return <iframe width="560" height="315" src={`https://www.youtube.com/embed/${content}`} title="YouTube video player"></iframe>
        case "image":
            return <img className="max-w-screen-sm max-h-96" src={content} alt="Attachment" />;
        case "video":
            return <video className="max-w-screen-sm max-h-96" controls src={content} />;
        case "file":
            return <a href={content} target="_blank" rel="noreferrer">{content}</a>;
        default:
            return <p>{content}</p>;
    }
}

function ChatMessage({ message, decryptionKey }: { message: any, decryptionKey: string }) {
    let { type, content } = processMessage(message.message, decryptionKey + message.author);

    return (
        <div className={`chat-message ${message.deleted ? "deleted" : (message.edited ? "edited" : "")}`}>
            <div className="chat-message-header">
                <img src="https://via.placeholder.com/150" alt="User" />
                <div className="chat-message-header-name">{message.author}</div>
                <div className="chat-message-header-time">{message.timestamp}</div>
                <div>{message.deleted ? "" : ''}</div>
            </div>
            <div className="chat-message-content">
                <ChatElementSwitch type={type} content={content} />
            </div>
            <div className="chat-message-content-history">
                {message.history.map((entry: string, index: number) => {
                    let { type, content } = processMessage(entry, decryptionKey + message.author);
                    return (
                        <div className="chat-message-content-history-wrap" key={message.cid + "h" + index}>
                            <p className="history-index">({index})</p>
                            <p className="history-content">
                                <ChatElementSwitch type={type} content={content} />
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Chat;