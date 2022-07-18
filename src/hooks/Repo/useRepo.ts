import { useEffect, useState } from 'react';
import api from '../../services/api';
import { useParams } from "react-router-dom";

interface Api {
    data: []
}

const useRepo = () => {
    const [repository, setRepository] = useState({});
    const [issues, setIssues] = useState<Api[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [type, setType] = useState('');

    const { repositorio } = useParams();

    useEffect(() => {
        async function load() {
            const [repositoryData, issuesData] = await Promise.all([
                api.get(`/repos/${repositorio}`),
                api.get(`/repos/${repositorio}/issues`, {
                    params: {
                        state: type || 'open',
                        per_page: 5,
                    },
                }),
            ]);
            setRepository(repositoryData.data);
            setIssues(issuesData?.data);
            setLoading(false)
        }

        load();
    }, [repositorio, type]);

    useEffect(() => {
        async function loadIssue() {
            const reponse = await api.get(`/repos/${repositorio}/issues`, {
                params: {
                    state: 'open',
                    page: page,
                    per_page: 5,
                }
            })

            setIssues(reponse?.data)
        }

        loadIssue()
    }, [page, repositorio])

    function handlePage(action: string) {
        setPage(action === 'back' ? page - 1 : page + 1)
    }

    return {
        handlePage,
        setType,
        repository,
        loading,
        issues,
        page,
    };
};

export default useRepo;
