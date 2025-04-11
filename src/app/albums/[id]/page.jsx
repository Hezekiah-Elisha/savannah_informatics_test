"use client";
import { instance } from "@/api";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function AlbumPage() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [user, setUser] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPhotosLoading, setIsPhotosLoading] = useState(false);

  const getAlbum = async () => {
    try {
      const response = await instance.get(`/albums/${id}`);
      setAlbum(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const getPhotos = async () => {
    try {
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
  }, []);

  return (
    <div className="pt-16">
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error.message}</p>
        ) : (
          <div>
            <h1>{album.title}</h1>
            <p>{album.id}</p>
            <p>{album.userId}</p>
            {/* {isPhotosLoading ? (
              <p>Loading photos...</p>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {photos.map((photo) => (
                  <div key={photo.id}>
                    <Image
                      src={photo.url}
                      alt={photo.title}
                      height={1000}
                      width={1000}
                    />
                    <p>title: {photo.title}</p>
                  </div>
                ))}
              </div>
            )} */}
          </div>
        )}
      </div>
    </div>
  );
  //   return (
  //     <div>
  //       {loading ? (
  //         <p>Loading...</p>
  //       ) : error ? (
  //         <p>Error: {error.message}</p>
  //       ) : (
  //         <div>
  //           <h1>{album.title}</h1>
  //           <p>{album.id}</p>
  //           <p>{album.userId}</p>
  //           {isPhotosLoading ? (
  //             <p>Loading photos...</p>
  //           ) : (
  //             <div>
  //               {photos.map((photo) => (
  //                 <div key={photo.id}>
  //                   <Image
  //                     src={photo.url}
  //                     alt={photo.title}
  //                     height={1000}
  //                     width={1000}
  //                   />
  //                   <p>{photo.title}</p>
  //                 </div>
  //               ))}
  //             </div>
  //           )}
  //         </div>
  //       )}
  //     </div>
  //   );
}
