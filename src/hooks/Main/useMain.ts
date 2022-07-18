import { useCallback, useEffect, useState } from 'react';
import api from '../../services/api';

interface Repository {
  name: string;
}

const useMain = () => {
  const [newRepo, setNewRepo] = useState("");
  const [repository, setRepository] = useState<Repository[]>([]);
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Search in localStorage
  useEffect(() => {
    const repoStorage = localStorage.getItem('repos');
    if (repoStorage) {
      setRepository(JSON.parse(repoStorage));
    }
  }, []);


  // Save in localStorage
  useEffect(() => {
    localStorage.setItem('repos', JSON.stringify(repository));
  }, [repository])

  const handleSubmit = useCallback((e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true)

    async function submit() {
      if (newRepo === '') {
        setError('Você precisa inserir um repositório')
        setLoading(false)
        return error
      }
      await api.get(`repos/${newRepo}`).then((res) => {

        const hasRepo = repository.find(repo => repo.name === newRepo)
        if (hasRepo) {
          setError('Esse repositório já existe na sua lista')
          return error
        }

        const data: any = {
          name: res?.data.full_name,
        }

        setRepository([...repository, data])
        setNewRepo('')
      }).catch((error) => {
        setNewRepo('')
        setError('Adicione um repositório válido e tente novamente!')
      }).finally(() => {
        setLoading(false)
      })
    }
    submit();
  }, [error, newRepo, repository]);

  function handleInputChange(e: any) {
    setError('')
    setNewRepo(e.target.value)
  }

  const handleDelete = useCallback((repo: string) => {
    const find = repository.filter(r => r.name !== repo)
    setRepository(find)

  }, [repository])

  return {
    handleInputChange,
    handleSubmit,
    setRepository,
    setLoading,
    handleDelete,
    loading,
    repository,
    newRepo,
    error
  };
};

export default useMain;
