"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { ITask } from "@/types/task";
import { deleteToDo } from "@/api";

interface Modal_DeleteTaskProps {
  isOpen: boolean;
  onOpenChange: () => void;
  task: ITask;
}

export const UserIcon = ({fill = "currentColor", size, height, width, ...props}: {fill?: string, size?: number, height?: number, width?: number, [key: string]: any}) => {
  return (
    <svg
      data-name="Iconly/Curved/Profile"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      >
        <path
          d="M11.845 21.662C8.153 21.662 5 21.088 5 18.787s3.133-4.425 6.845-4.425c3.692 0 6.845 2.1 6.845 4.4s-3.134 2.9-6.845 2.9z"
          data-name="Stroke 1"
        />
        <path d="M11.837 11.174a4.372 4.372 0 10-.031 0z" data-name="Stroke 3" />
      </g>
    </svg>
  );
};

const Modal_DeleteTask: React.FC<Modal_DeleteTaskProps> = ({
  isOpen,
  onOpenChange,
  task,
}) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteToDo(task.id);
      router.refresh(); 
      onOpenChange(); 
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.3, ease: "easeOut" },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: { duration: 0.2, ease: "easeIn" },
          },
        },
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-red-500">
              Xác nhận xoá công việc
            </ModalHeader>

            <ModalBody>
              <p>
                Bạn có chắc muốn xoá công việc này không?
                <br />
                <strong>{task?.text}</strong>
              </p>
            </ModalBody>

            <ModalFooter>
              <Button color="primary" variant="light" onPress={onClose}>
                Huỷ
              </Button>
              <Button color="danger" startContent={<UserIcon />} variant="bordered" onPress={handleDelete}>
                Delete user
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default Modal_DeleteTask;
