import { useNavigate } from "react-router-dom";
import DashboardIcon from "./DashboardIcon";
import Styles from "../Styles/MessageList.module.css";
import { formatMessageDate } from "../utils/formatMessageDate";

const MessageList = ({ messages }) => {
  const navigate = useNavigate();

  return (
    <section className={Styles.panel}>
      <div className={Styles.header}>
        <div>
          <p className={Styles.eyebrow}>Inbox</p>
          <h2>Messages</h2>
          <p className={Styles.description}>
            Messages from your portfolio visitors
          </p>
        </div>
        <span className={Styles.count}>{messages.length} total</span>
      </div>
      <div className={Styles.list}>
        {messages.map((message) => (
          <button
            type="button"
            className={`${Styles.message} ${message.isRead ? Styles.read : ""}`}
            key={message.id}
            onClick={() => navigate(`/meggage/${message.id}`)}
          >
            <div className={Styles.icon}>
              <DashboardIcon name="mail" />
            </div>
            <div className={Styles.copy}>
              <div className={Styles.meta}>
                <strong>{message.name}</strong>
                <span>{message.email}</span>
              </div>
              <h3>{message.subject}</h3>
              <p>{message.message}</p>
            </div>
            <time dateTime={message.createdAt} className={Styles.date}>
              {formatMessageDate(message.createdAt)}
            </time>
            <span className={Styles.chevron}>›</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default MessageList;
