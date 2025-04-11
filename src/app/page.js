"use client";
import { instance } from "@/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Library, Mail, Rss } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    const [usersResponse, albumsResponse] = await Promise.all([
      instance.get("/users"),
      instance.get("/albums"),
    ]);
    setUsers(usersResponse.data);
    setAlbums(albumsResponse.data);
    setIsLoading(false);
  };

  const getNumberOfAlbums = (userId) => {
    return albums.filter((album) => album.userId === userId).length;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="pt-24 p-6">
      <h1 className="font-monserrat uppercase text-primary">Available Users</h1>
      <hr className="my-4" />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {users.map((user) => (
            <Card
              className="p-4 hover:shadow-2xl transition-shadow"
              key={user.id}
            >
              <Link href={"/users/" + user.id} className="">
                <CardHeader>
                  <CardTitle className="text-lg font-monserrat text-primary">
                    {user.name}
                  </CardTitle>
                  <CardDescription>{user.username}</CardDescription>
                </CardHeader>
                <CardContent className="">
                  <div className="flex flex-row justify-between">
                    <p className="text-sm text-gray-500 flex flex-row items-center">
                      <Mail className="h-4 w-4 inline mr-1" />
                      {user.email}
                    </p>
                    <Link
                      href={"https://" + user.website}
                      target="_blank"
                      className="text-sm text-gray-500 hover:underline hover:text-primary"
                    >
                      <Rss className="h-4 w-4 inline mr-1 text-primary" />
                      {user.website}
                    </Link>
                  </div>
                  <div className="flex flex-row justify-between mt-4">
                    <div className="flex flex-row items-center">
                      <Library className="size-6 inline mr-1 text-primary" />
                      <p className="text-sm text-gray-500">
                        {getNumberOfAlbums(user.id)} Albums
                      </p>
                    </div>
                    <Link
                      href={`/albums/${user.id}`}
                      className="text-sm text-gray-500 hover:underline hover:text-primary"
                    >
                      View Albums
                    </Link>
                  </div>
                  <div className="flex flex-col mt-4 bg-primary/10 p-2 rounded-md">
                    <h3 className="font-monserrat text-primary">
                      Company Info
                    </h3>
                    <p className="text-sm text-gray-500">
                      {user.company.name} :{" "}
                      <span className="italic">
                        {" "}
                        {user.company.catchPhrase}{" "}
                      </span>
                    </p>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
