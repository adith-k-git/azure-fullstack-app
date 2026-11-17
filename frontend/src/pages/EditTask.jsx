import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import TaskForm from '../components/TaskForm';
import { getTask, updateTask } from '../api/taskApi';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await getTask(id);
        setTask(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to load task');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (taskData) => {
    try {
      setSaving(true);
      await updateTask(id, taskData);
      toast.success('Task updated successfully');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Unable to update task');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Edit Task</h1>
        <p className="mt-2 text-sm text-slate-500">Update the task details and keep your progress on track.</p>
      </div>
      <TaskForm initialTask={task} onSubmit={handleSubmit} loading={saving} />
    </section>
  );
};

export default EditTask;
