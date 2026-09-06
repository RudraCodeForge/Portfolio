import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import DashboardIcon from "./DashboardIcon";
import Styles from "../Styles/MessageList.module.css";
import { formatMessageDate } from "../utils/formatMessageDate";
import {
  deleteAllMessages,
  markAllMessagesAsRead,
  setMessages,
} from "../Store/messageSlice";
import { useEffect } from "react";
import {
  DeleteAllMessages,
  GetAdminMessages,
  MarkAllMessagesAsRead,
} from "../Services/message.service";
const MessageList = ({ messages }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMarkAllAsRead = async () => {
    try {
      await MarkAllMessagesAsRead();
      dispatch(markAllMessagesAsRead());
    } catch (error) {
      console.error("Mark all messages as read failed:", error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      await DeleteAllMessages();
      dispatch(deleteAllMessages());
    } catch (error) {
      console.error("Delete all messages failed:", error);
    }
  };
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await GetAdminMessages();
        dispatch(setMessages(data.messages || []));
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [dispatch]);

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
        <div className={Styles.actions}>
          <span className={Styles.count}>{messages.length} total</span>
          {messages.length > 0 && (
            <>
              <button
                type="button"
                className={Styles.actionButton}
                onClick={handleMarkAllAsRead}
              >
                Mark all as read
              </button>
              <button
                type="button"
                className={`${Styles.actionButton} ${Styles.deleteButton}`}
                onClick={handleDeleteAll}
              >
                Delete all
              </button>
            </>
          )}
        </div>
      </div>
      <div className={Styles.list}>
        {messages.length === 0 ? (
          <div className={Styles.emptyState}>
            <div className={Styles.emptyIcon}>
              <DashboardIcon name="mail" />
            </div>
            <h3>Your inbox is clear</h3>
            <p>New messages from portfolio visitors will appear here.</p>
          </div>
        ) : (
          messages.map((message) => (
            <button
              type="button"
              className={`${Styles.message} ${message.isRead ? Styles.read : ""}`}
              key={message.id}
              onClick={() => navigate(`/message/${message.id}`)}
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
          ))
        )}
      </div>
    </section>
  );
};

export default MessageList;
