import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import DashboardIcon from "../Components/DashboardIcon";
import { deleteMessage, markMessageAsRead } from "../Store/messageSlice";
import Styles from "../Styles/MessageDetail.module.css";
import { formatMessageDate } from "../utils/formatMessageDate";

const MessageDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const message = useSelector((state) =>
    state.messages.find((item) => item.id === id),
  );

  useEffect(() => {
    localStorage.setItem("activeDashboardSection", "Messages");
  }, []);

  if (!message) {
    return (
      <main className={Styles.empty}>
        <h1>Message not found</h1>
        <button type="button" onClick={() => navigate("/dashboard")}>
          Back to dashboard
        </button>
      </main>
    );
  }

  const handleMarkRead = () => dispatch(markMessageAsRead(message.id));
  const handleDelete = () => {
    dispatch(deleteMessage(message.id));
    navigate("/dashboard");
  };

  return (
    <main className={Styles.page}>
      <header className={Styles.header}>
        <button
          type="button"
          className={Styles.backButton}
          onClick={() => navigate("/dashboard")}
        >
          <DashboardIcon name="arrow" /> Back to messages
        </button>
        <span className={message.isRead ? Styles.read : Styles.unread}>
          {message.isRead ? "Read" : "Unread"}
        </span>
      </header>
      <article className={Styles.card}>
        <div className={Styles.icon}>
          <DashboardIcon name="mail" />
        </div>
        <p className={Styles.eyebrow}>Message details</p>
        <h1>{message.subject}</h1>
        <div className={Styles.sender}>
          <div className={Styles.avatar}>
            {message.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <strong>{message.name}</strong>
            <span>{message.email}</span>
          </div>
        </div>
        <time dateTime={message.createdAt} className={Styles.date}>
          Received {formatMessageDate(message.createdAt)}
        </time>
        <p className={Styles.body}>{message.message}</p>
        <div className={Styles.actions}>
          <button
            type="button"
            className={Styles.readButton}
            onClick={handleMarkRead}
            disabled={message.isRead}
          >
            <DashboardIcon name="shield" />{" "}
            {message.isRead ? "Already read" : "Mark as read"}
          </button>
          <button
            type="button"
            className={Styles.deleteButton}
            onClick={handleDelete}
          >
            <DashboardIcon name="logout" /> Delete message
          </button>
        </div>
      </article>
    </main>
  );
};

export default MessageDetail;
