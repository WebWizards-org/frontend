import React, { useEffect } from "react";
import axios from "axios";

function UserList({ type = "instructor" }) {
  const [users, setUsers] = React.useState([]);

  useEffect(() => {
    const endpoint =
      type === "student"
        ? "http://localhost:3001/api/protected/students"
        : "http://localhost:3001/api/protected/instructors";
    axios
      .get(endpoint)
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, [type]);

  return (
    <div className="bg-white shadow-lg rounded-xl p-8 w-full mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <span className="inline-block w-2 h-6 bg-blue-500 rounded mr-2"></span>
        {type === "student" ? "Students" : "Instructors"}
        <span className="text-blue-500 ml-2">({users.length})</span>
      </h2>
      {users.length === 0 ? (
        <div className="text-gray-500 text-center py-8">
          No {type === "student" ? "students" : "instructors"} found.
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {users.map((user) => (
            <li
              key={user._id}
              className="py-4 flex items-center justify-between"
            >
              <div>
                <span className="font-semibold text-gray-700">{user.name}</span>
                <span className="block text-sm text-gray-500">
                  {user.email}
                </span>
              </div>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserList;
