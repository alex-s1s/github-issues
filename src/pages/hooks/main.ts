import { useState } from 'react';

const useMain = () => {
  const [newRepo, setNewRepo] = useState("");

  function handleInputChange(e: any) {
    console.log(newRepo)
    setNewRepo(e.target.value)

  }

  return {
    handleInputChange,
    newRepo
  };
};

export default useMain;
