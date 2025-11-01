"use client";
import React, { FormEventHandler, useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";

import {Input} from "@heroui/react";

import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@heroui/react";
import { ITask } from "@/types/task";
import { addToDo } from "@/api";
import { useRouter } from "next/navigation";
import { showToast } from "@/components/Toast";
interface Modal_AddTaskProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

const Modal_AddTask: React.FC<Modal_AddTaskProps> = ({ isOpen, onOpenChange }) => {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Choose Status"]));
  const [newTaskValue, setNewTaskValue] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    if(!isOpen) {
      setErrorMessage("");
    }
  },[isOpen])

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replace(/_/g, ""),
    [selectedKeys],
  );

  const handleSubmitNewTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    // Kiểm tra điều kiện hợp lệ 
    if(newTaskValue.trim() === "") {
      setErrorMessage("Vui lòng nhập công việc");
      return;
    }
    if(selectedValue === "Choose Status") {
      setErrorMessage("Vui lòng chọn trạng thái cho công việc");
      return;
    }

    setErrorMessage("");
    const newTask: ITask = {
      id: Date.now().toString(),
      text: newTaskValue,
      status: selectedValue
    };
    try {
      await addToDo(newTask);
      showToast.success("Thêm task thành công!", "Công việc đã được thêm vào.");
      setNewTaskValue("");
      setSelectedKeys(new Set(["Choose Status"]));
      router.refresh();
      onOpenChange();
    } catch (error) {
      showToast.error("Thêm task thất bại!", "Vui lòng thử lại");
      setErrorMessage("Xảy ra lỗi khi tạo công việc");
    }
  }

  const getStatusColor = (status: string) => {
    status = status.toLowerCase();
    switch (status) {
      case "complete": 
        return "bg-green-300";
      case "in-progress":
        return "bg-amber-300";
      case "pending":
        return "bg-red-300";
      default:
        return "bg-gray-300";
    }
  }



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
            <ModalHeader className="flex flex-col gap-1">
              Add New Task
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmitNewTodo}>
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4 opacity-95">
                    <Input value={newTaskValue} 
                           onChange={e => setNewTaskValue(e.target.value)}
                           label="Add Task" 
                           type="Type here" />
                    <Dropdown>
                      <DropdownTrigger>
                        <Button className={`capitalize pt-6.5 pb-6.5 pl-8 pr-8 ${getStatusColor(selectedValue)}`} variant="bordered">
                          {selectedValue}
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        disallowEmptySelection
                        aria-label="Single selection example"
                        selectedKeys={selectedKeys}
                        selectionMode="single"
                        variant="flat"
                        onSelectionChange={(keys: any) => {
                          if (keys instanceof Set) {
                            setSelectedKeys(new Set(Array.from(keys) as string[]));
                          } else if (typeof keys === "string") {
                            setSelectedKeys(new Set([keys]));
                          } else if (Array.isArray(keys)) {
                            setSelectedKeys(new Set(keys as string[]));
                          } else if (keys && typeof keys === "object" && "currentKey" in keys && typeof keys.currentKey === "string") {
                            setSelectedKeys(new Set([keys.currentKey]));
                          } else {
                            setSelectedKeys(new Set());
                          }
                        }}
                      >
                        <DropdownItem className="bg-green-300" key="Complete">Complete</DropdownItem>
                        <DropdownItem className="bg-amber-300 " key="In-Progress">In-Progress</DropdownItem>
                        <DropdownItem className="bg-red-300 "  key="Pending">Pending</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>        
                </div>
                {errorMessage && (
                  <p className="text-red-600 text-center mt-2 font-medium">{errorMessage}</p>
                )}
                <div className="text-center">
                  <Button className="mt-3 " color="secondary" type="submit"> Submit </Button>
                </div>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default Modal_AddTask;


