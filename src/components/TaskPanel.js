import React from 'react';
import '../App.css'
export default function TaskPanel({tasks,isModalOpen,toggleModal}) {
  return (
    <button className="addBtn" onClick={toggleModal}> + </button>
  )
}