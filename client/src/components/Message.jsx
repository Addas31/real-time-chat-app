export default function Message({ msg, self }) {
  return (
    <div className={self ? "msg self" : "msg"}>
      <strong>{msg.username}</strong>
      <p>{msg.message}</p>
      <span>{msg.time}</span>
    </div>
  );
}
