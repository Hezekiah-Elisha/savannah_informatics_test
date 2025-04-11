"use client";
import { instance } from "@/api";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Library } from "lucide-react";
import MyLoader from "@/components/MyLoader";
import Link from "next/link";

export default function AlbumPage() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [users, setUsers] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPhotosLoading, setIsPhotosLoading] = useState(false);

  const getAlbums = async () => {
    try {
      const response = await instance.get("/albums");
      setAlbums(response.data);
    } catch (error) {
      setError(error);
    }
  };
  const getPhotoAlbum = (id) => {
    const album = albums.find((album) => album.id === id);
    // console.log(album);
    return album ? album.title : "Unknown Album";
  };
  const getUser = (id) => {
    const user = users.find((user) => user.id === id);
    return user ? user.name : "Unknown User";
  };
  const getUsers = async () => {
    try {
      const response = await instance.get("/users");
      setUsers(response.data);
    } catch (error) {
      setError(error);
    }
  };

  const getAlbum = async () => {
    try {
      setLoading(true);
      const response = await instance.get(`/albums/${id}`);
      setAlbum(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getPhotos = async () => {
    try {
      setIsPhotosLoading(true);
      const response = await instance.get(`/albums/${id}/photos`);
      setPhotos(response.data);
      setIsPhotosLoading(false);
    } catch (error) {
      setError(error);
      setIsPhotosLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setIsPhotosLoading(true);
    getAlbum();
    getPhotos();
    getUsers();
    getAlbums();
    // setLoading(false);
    // setIsPhotosLoading(false);
  }, []);

  return (
    <div className="pt-16 p-10 font-poppins">
      <div>
        {loading ? (
          <div className="w-full flex flex-row justify-center align-middle">
            <MyLoader />
          </div>
        ) : error ? (
          <p>{error.message}</p>
        ) : album ? (
          <div className="space-y-2">
            <h1 className="text-primary capitalize font-monserrat">
              {album.title}
            </h1>
            <p className="">Owner: {getUser(album.userId)}</p>
            {isPhotosLoading ? (
              <div className="w-full flex flex-row justify-center align-middle">
                <MyLoader />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {photos.map((photo) => (
                  <Card
                    key={photo.id}
                    className="p-4 hover:shadow-2xl transition-shadow"
                  >
                    <Link href={`/photos/${photo.id}`}>
                      <Image
                        src={photo.thumbnailUrl}
                        alt={photo.title}
                        height={1000}
                        width={1000}
                        unoptimized
                        className=""
                      />
                      <p className="text-primary capitalize font-semibold font-monserrat">
                        {photo.title}
                      </p>
                      <div className="text-primary flex flex-row items-center justify-start gap-1">
                        <Library className="h-10 w-10 inline mr-1" />
                        <p className="text-gray-500 text-xs">
                          Album: {getPhotoAlbum(photo.albumId)}
                        </p>
                      </div>
                    </Link>
                  </Card>
                ))}
              </div>
            )}
          </div>
        ) : (
          <p>No album found.</p>
        )}
      </div>
    </div>
  );
}
