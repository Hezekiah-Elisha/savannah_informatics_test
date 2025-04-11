"use client";
import { useEffect, useState } from "react";
import { instance } from "@/api";
import { Card } from "@/components/ui/card";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getUsers = async () => {
    const response = await instance.get("/users");
    setUsers(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {users.map((user) => (
            <Card className="p-4" key={user.id}>
              {user.username}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
