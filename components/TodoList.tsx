  "use client";
  import React, { useMemo, useState } from "react";
  import { ITask } from "@/types/task";
  import Modal_EditTask  from "./Modal_EditTask";
  import Modal_DeleteTask from "./Modal_DeleteTask";

  import { Button, Pagination, useDisclosure } from "@heroui/react";
  import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue,
    Tooltip,
  } from "@heroui/react";

  export const EditIcon = (props: any) => (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" width="1em" {...props}>
      <path
        d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M2.5 18.3333H17.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );

  export const DeleteIcon = (props: any) => (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" width="1em" {...props}>
      <path
        d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M8.60834 13.75H11.3833"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M7.91669 10.4167H12.0834"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );



  interface TodoListProps {
    tasks: ITask[];
  }
  export default function TodoList({ tasks }: TodoListProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const {
      isOpen: isOpenDelete,
      onOpen: onOpenDelete,
      onOpenChange: onOpenChangeDelete,
    } = useDisclosure();

    const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
    const [selectedDeleteTask, setSelectedDeleteTask] = useState<ITask | null>(null);

    const handleEdit = (task: ITask) => {
        setSelectedTask(task);
        onOpen();
    };
    const handleDelete = (task: ITask) => {
        setSelectedDeleteTask(task);
        onOpenDelete();
    }
    const columns = [
      { key: "text", label: "TASK" },
      { key: "status", label: "STATUS" },
      { key: "actions", label: "ACTIONS"}
    ];

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

    const [page, setPage]   = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const pages = Math.ceil(tasks.length / pageSize);

    const items = useMemo(() => {
      const start = (page - 1) * pageSize;
      const end = start + pageSize;

      return tasks.slice(start, end);
    }, [page, tasks])

    
    const rows = items.map((task) => ({
      key: task.id,
      text: task.text,
      status: task.status,
    }));

    return (
      <div className="mt-5">
        <Table aria-label="Todo list table"
        bottomContent={
          <div>
            <Pagination
              className="flex justify-center"
              isCompact
              showControls
              page={page}
              total={pages}
              color="secondary"
              onChange={(page) => setPage(page)}
            />
          </div>
        }>
          <TableHeader  columns={columns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>

          <TableBody items={rows}>
            {(item) => (
              <TableRow key={item.key}>
                {(columnKey) => (
                  <TableCell>
                    {columnKey === "actions" ? (
                      <div className="w-fit flex items-center gap-3">
                        <Tooltip content= "Edit task">
                          <span onClick={() => handleEdit(tasks.find((t) => t.id === item.key)!)} 
                          className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <EditIcon />
                          </span>
                        </Tooltip>
                        <Tooltip color = "danger" content= "Delete task">
                          <span onClick={() => handleDelete(tasks.find((t) => t.id === item.key)!)}
                            className="text-lg text-danger cursor-pointer active:opacity-50">
                            <DeleteIcon />
                          </span>
                        </Tooltip>
                      </div>
                    ) : columnKey === "status" ? (
                      <span className= {` px-3 py-1 rounded-2xl text-sm  text-black ${getStatusColor(item.status)}`}>
                          {item.status}
                      </span>
                    ) : (
                      getKeyValue(item, columnKey)
                    )}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
        {
          selectedTask && (
            <Modal_EditTask 
              isOpen = {isOpen}
              onOpenChange = {() => {
                onOpenChange();
                if(!isOpen) setSelectedTask(null);
              }}
              task = {selectedTask}
              />
          )}

          {selectedDeleteTask && (
            <Modal_DeleteTask
              isOpen={isOpenDelete}
              onOpenChange={() => {
                onOpenChangeDelete();
                if (!isOpenDelete) setSelectedDeleteTask(null);
              }}
              task={selectedDeleteTask}
            />
          )}
      </div>
    );
  }
