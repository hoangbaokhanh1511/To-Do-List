"use client"
import { Button, useDisclosure } from "@heroui/react";
import Modal_AddTask  from "./Modal_AddTask";
import React from 'react'

const AddTasks = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div> 
        <Button color="secondary" className="w-full rounded font-bold" onPress={onOpen}>ADD NEW TASK
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        </Button>
        <Modal_AddTask isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  )
}

export default AddTasks



