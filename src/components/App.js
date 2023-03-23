import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortAscending, setSortAscending] = useState(true);

  const fetchHandler = async () => {
    setIsLoading(true);
    const data = await fetch(
      "https://content.newtonschool.co/v1/pr/main/users"
    );
    data.json().then((dt) => setUsers([...dt]));
    setIsLoading(false);
  };

  const sortHanlder = () => {
    if (sortAscending) {
      setUsers((prevUsers) =>
        prevUsers.sort((a, b) => a.name.length - b.name.length)
      );
      setSortAscending(false);
      // users.sort((a, b) => a.name.length - b.name.length);
    } else {
      setUsers((prevUsers) =>
        prevUsers.sort((a, b) => b.name.length - a.name.length)
      );
      setSortAscending(true);
      // users.sort((a, b) => b.name.length - a.name.length);
    }
    // console.log(users);
  };

  return (
    <div id="main">
      <h2>User List</h2>
      <button className="fetch-data-btn" onClick={fetchHandler}>
        Fetch User Data
      </button>
      <button className="sort-btn" onClick={sortHanlder}>
        {sortAscending
          ? "Sort by name length (ascending)"
          : "Sort by name length (descending)"}
      </button>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <div className="users-section">
          {users.map((user) => (
            <li>
              <section className="id-section">{user.id}</section>
              <section className="name-email-section">
                <p className="name">Name: {user.name}</p>
                <p className="email">Email: {user.email}</p>
              </section>
            </li>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
