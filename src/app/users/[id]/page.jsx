"use client";
import { instance } from "@/api";
import { Mail, Rss } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function UserPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isAlbumLoading, setIsAlbumLoading] = useState(true);
  const [user, setUser] = useState({});
  const [albums, setAlbums] = useState([]);

  const getUser = async () => {
    const response = await instance.get(`/users/${id}`);
    setUser(response.data);
    setIsLoading(false);
  };
  const getAlbums = async () => {
    const response = await instance.get(`/users/${id}/albums`);
    setAlbums(response.data);
    setIsAlbumLoading(false);
  };
  useEffect(() => {
    getUser();
    getAlbums();
  }, []);

  return (
    <div className="flex flex-col pt-20 p-6">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col items-center justify-center font-poppins">
          <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4">
            <div className="flex flex-col items-start justify-center bg-primary/5 p-6 rounded-3xl w-full">
              <h1 className="text-2xl font-bold text-primary font-monserrat">
                {user.name}
              </h1>
              <p className="text-gray-500 italic">{user.username}</p>
              <div className="flex flex-row justify-between align-middle w-full">
                <div className="flex flex-row items-center justify-start gap-1 text-gray-500">
                  <Mail className="h-4 w-4 inline mr-1" />
                  <p className="">{user.email}</p>
                </div>
                <div className="flex flex-row items-center justify-start gap-1 text-gray-500">
                  <Rss className="h-4 w-4 inline mr-1" />
                  <Link
                    href={"https://" + user.website}
                    className="hover:underline hover:text-primary"
                  >
                    {user.website}
                  </Link>
                </div>
              </div>
              <p className="text-gray-500">{user.address.street}</p>
            </div>

            <div className="bg-primary/5 p-6 rounded-3xl w-full flex flex-col items-start justify-center">
              <h2 className="text-primary">Company Info</h2>
              <h2 className="text-gray-500 text-xl font-monserrat">
                {user.company.name}
              </h2>
              <p className="text-gray-500 italic">{user.company.catchPhrase}</p>
              <p className="text-gray-500 mt-5">
                Core Business: {user.company.bs}
              </p>
            </div>
          </div>
          <div className="bg-primary/5 p-6 rounded-3xl w-full mt-4">
            <h2>
              <Link
                href={`/albums/${id}`}
                className="text-xl text-primary hover:underline"
              >
                {user.name}'s Albums'
              </Link>
              <div>
                <ol className="list-decimal list-inside mt-2 space-y-2">
                  {isAlbumLoading ? (
                    <p>Loading...</p>
                  ) : (
                    albums.map((album) => (
                      <li className="text-gray-500" key={album.id}>
                        <Link
                          href={`/albums/${album.id}`}
                          className="text-gray-500 hover:underline"
                        >
                          {album.title}
                        </Link>
                      </li>
                    ))
                  )}
                </ol>
              </div>
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}
