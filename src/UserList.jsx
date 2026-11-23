import { useState, useEffect } from "react";
import axios from "axios";

function UserList() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setListOfUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load users: " + err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const filtered = listOfUsers.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Users</h1>

      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search"
      />

      {filtered.length === 0 && <p>No users found.</p>}

      {filtered.map((user) => (
        <div
          key={user.id}
          className="card"
          onClick={() =>
            setSelectedId(selectedId === user.id ? null : user.id)
          }
        >
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <p>{user.company.name}</p>

          {selectedId === user.id && (
            <div className="details">
              <p>
                <strong>Address:</strong> {user.address.street},{" "}
                {user.address.suite}, {user.address.city}
              </p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Website:</strong> {user.website}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default UserList;