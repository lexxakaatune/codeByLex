import { useState } from "react";

export default function RegisterAdmin() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("https://codebylex.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      setMessage(JSON.stringify(data));
    } catch (err) {
      setMessage("Error connecting to server");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", padding: 20 }}>
      <h2>Create Admin Account</h2>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: 12,
            background: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            fontSize: 16,
          }}
        >
          Create Admin
        </button>
      </form>

      <p style={{ marginTop: 20 }}>{message}</p>
    </div>
  );
}