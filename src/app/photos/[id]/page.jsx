"use client";
import { instance } from "@/api";
import MyLoader from "@/components/MyLoader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { use, useEffect, useState } from "react";

export default function PhotoPage() {
  const { id } = useParams();
  const [photo, setPhoto] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [album, setAlbum] = useState(null);
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await instance.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getPhoto = async () => {
    setLoading(true);
    try {
      const response = await instance.get(`/photos/${id}`);
      setPhoto(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const getAlbum = async () => {
    try {
      const response = await instance.get(`/albums/${photo.albumId}`);
      setAlbum(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getUser = (id) => {
    const user = users.find((user) => user.id === id);
    // console.log(user);
    return user ? user.name : "Unknown User";
  };

  useEffect(() => {
    getPhoto();
    getUsers();
  }, []);
  useEffect(() => {
    if (photo.albumId) {
      getAlbum();
    }
  }, [photo]);

  return (
    <div className="pt-16 p-10 font-poppins">
      <div>
        {loading ? (
          <div className="w-full flex flex-row justify-center align-middle">
            <MyLoader />
          </div>
        ) : error ? (
          <p>{error.message}</p>
        ) : (
          <div className="space-y-2">
            <h1 className="text-primary capitalize font-monserrat">
              {photo.title}
            </h1>
            <div className="flex flex-col md:flex-row justify-between gap-2">
              <div className="flex flex-col w-full">
                <Image
                  src={photo.url}
                  alt={photo.title}
                  width={1000}
                  height={1000}
                  className="rounded-lg"
                />
                <div className="bg-primary/5 p-4 rounded-lg w-full mt-2">
                  <Image
                    src={photo.thumbnailUrl}
                    alt={photo.title}
                    width={10}
                    height={10}
                    className="rounded-lg"
                  />
                </div>
              </div>
              <div className="flex flex-col bg-primary/5 p-4 rounded-lg w-full">
                <p className="text-primary capitalize font-monserrat">
                  Album: {album?.title}
                </p>
                {/* <p className="">Owner: {getUser(album?.userId).name}</p> */}
                <p className="">Album ID: {photo.albumId}</p>
                <Dialog>
                  <DialogTrigger className="text-primary capitalize font-monserrat">
                    <Button variant="outline" className="hover:bg-primary">
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="">
                    <DialogHeader>
                      <DialogTitle>Edit Photo Details</DialogTitle>
                      <DialogDescription>
                        Make changes to your photo title here. Click save when
                        you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-4">
                      <form className="flex flex-col gap-2">
                        <label htmlFor="title" className="text-primary">
                          Title
                        </label>
                        <Input
                          type="text"
                          id="title"
                          name="title"
                          defaultValue={photo.title}
                          className=""
                        />
                      </form>
                      <div className="flex flex-row justify-end gap-2">
                        <Button className="hover:bg-primary">Save</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
