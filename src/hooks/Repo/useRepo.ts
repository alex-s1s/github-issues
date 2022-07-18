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

    const { repositorio } = useParams();

    useEffect(() => {
        async function load() {
            const [repositoryData, issuesData] = await Promise.all([
                api.get(`/repos/${repositorio}`),
                api.get(`/repos/${repositorio}/issues`, {
                    params: {
                        state: "open",
                        per_page: 5,
                    },
                }),
            ]);
            setRepository(repositoryData.data);
            setIssues(issuesData?.data);
            setLoading(false)
        }

        load();
    }, [repositorio]);

    return {
        repository,
        loading,
        issues
    };
};

export default useRepo;
