"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { db, storage } from "@/firebase";
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import toast from "react-hot-toast";

export function DeleteModal() {
  const { user } = useUser();

  const [isDeleteModalOpen, setIsDeleteModalOpen, fileId, setFileId] =
    useAppStore((state) => [
      state.isDeleteModalOpen,
      state.setIsDeleteModalOpen,
      state.fileId,
      state.setFileId,
    ]);

  async function deleteFile() {
    if (!user || !fileId) {
      toast.error("User or file ID not found.");
      return;
    }

    const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);

    try {
      // Step 1: Delete file from Firebase Storage
      await deleteObject(fileRef);

      // Step 2: Delete file reference from Firestore
      await deleteDoc(doc(db, "users", user.id, "files", fileId));

      toast.success("File deleted successfully!");
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error("Failed to delete the file. Please try again.");
    } finally {
      setIsDeleteModalOpen(false);
    }
  }

  return (
    <Dialog
      open={isDeleteModalOpen}
      onOpenChange={(isOpen) => {
        setIsDeleteModalOpen(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            file!
          </DialogDescription>
        </DialogHeader>

        <div className="flex space-x-2 py-3">
          <Button
            size="sm"
            className="px-3 flex-1"
            variant={"ghost"}
            onClick={() => setIsDeleteModalOpen(false)}
          >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>

          <Button
            type="submit"
            size="sm"
            variant={"destructive"}
            className="px-3 flex-1"
            onClick={deleteFile}
          >
            <span className="sr-only">Delete</span>
            <span>Delete</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
