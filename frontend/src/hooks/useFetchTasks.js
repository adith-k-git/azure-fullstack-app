import { useEffect, useState, useCallback } from 'react';
import { getTasks } from '../api/taskApi';

const useFetchTasks = (filters) => {
  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, totalTasks: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await getTasks(filters);
      setTasks(response.data.tasks || []);
      setPagination({
        page: response.data.page || 1,
        totalPages: response.data.totalPages || 1,
        totalTasks: response.data.totalTasks || 0,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load tasks');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { tasks, pagination, loading, error, refresh: fetchTasks };
};

export default useFetchTasks;
