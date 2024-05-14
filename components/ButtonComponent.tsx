"use client";
import React, { useState } from "react";
import { Loader2, TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
interface LoadingButtonProps {
  loading: boolean;
  disabled: boolean;
}
export const LoadingEditSubmitButton = ({
  loading,
  disabled,
}: LoadingButtonProps) => {
  return (
    <Button type="submit" disabled={disabled}>
      {loading ? (
        <Loader2 className="size-4 animate-spin text-white" />
      ) : (
        "수정"
      )}
    </Button>
  );
};
type onClickProps = {
  onDelete: () => void;
  title: string;
  description: string;
  deleteLoading: boolean;
};
export const DeleteButton = ({
  onDelete,
  title,
  description,
  deleteLoading,
}: onClickProps) => {
  const [deleteAlert, setDeleteAlert] = useState(false);
  return (
    <div>
      <Button
        type="button"
        onClick={() => setDeleteAlert(true)}
        variant="outline"
        size={"icon"}
      >
        <TrashIcon className="size-4 text-destructive" />
      </Button>
      <div>
        <AlertDialog open={deleteAlert}>
          <AlertDialogContent className=" rounded-md w-[80vw] ">
            <AlertDialogHeader>
              <AlertDialogTitle>{title}</AlertDialogTitle>
              <AlertDialogDescription>{description}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <div className="flex flex-row items-center justify-end gap-3">
                <div>
                  <Button
                    variant={"outline"}
                    onClick={() => setDeleteAlert(false)}
                  >
                    취소
                  </Button>
                </div>
                <div>
                  <Button
                    disabled={deleteLoading}
                    className="px-12"
                    variant="destructive"
                    onClick={() => onDelete()}
                  >
                    {deleteLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "삭제"
                    )}
                  </Button>
                </div>
              </div>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export const AlertButton = ({
  onDelete,
  buttonTitle,
  title,
  description,
  deleteLoading,
}: {
  onDelete: () => void;
  title: string;
  description: string;
  deleteLoading: boolean;
  buttonTitle: string;
}) => {
  const [deleteAlert, setDeleteAlert] = useState(false);
  return (
    <div>
      <Button
        type="button"
        onClick={() => setDeleteAlert(true)}
        variant="destructive"
        size={"sm"}
      >
        {buttonTitle}
      </Button>
      <div className="">
        <AlertDialog open={deleteAlert}>
          <AlertDialogContent className=" rounded-md">
            <AlertDialogHeader>
              <AlertDialogTitle>{title}</AlertDialogTitle>
              <AlertDialogDescription>{description}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <div className="flex flex-row items-center justify-end gap-3">
                <div>
                  <Button
                    variant={"outline"}
                    onClick={() => setDeleteAlert(false)}
                  >
                    취소
                  </Button>
                </div>
                <div>
                  <Button
                    disabled={deleteLoading}
                    className="px-12"
                    variant="destructive"
                    onClick={() => onDelete()}
                  >
                    {deleteLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      buttonTitle
                    )}
                  </Button>
                </div>
              </div>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
export const ConfirmButton = ({
  onDelete,
  buttonTitle,
  title,
  description,
  deleteLoading,
}: {
  onDelete: () => void;
  title: string;
  description: string;
  deleteLoading: boolean;
  buttonTitle: string;
}) => {
  const [deleteAlert, setDeleteAlert] = useState(false);
  return (
    <div>
      <Button
        type="button"
        onClick={() => setDeleteAlert(true)}
        variant="default"
        size={"sm"}
      >
        {buttonTitle}
      </Button>
      <div className="">
        <AlertDialog open={deleteAlert}>
          <AlertDialogContent className=" rounded-md">
            <AlertDialogHeader>
              <AlertDialogTitle>{title}</AlertDialogTitle>
              <AlertDialogDescription>{description}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <div className="flex flex-row items-center justify-end gap-3">
                <div>
                  <Button
                    variant={"outline"}
                    onClick={() => setDeleteAlert(false)}
                  >
                    취소
                  </Button>
                </div>
                <div>
                  <Button
                    disabled={deleteLoading}
                    className="px-12"
                    variant="destructive"
                    onClick={() => onDelete()}
                  >
                    {deleteLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      buttonTitle
                    )}
                  </Button>
                </div>
              </div>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
