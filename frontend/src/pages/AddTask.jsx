import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TaskForm from '../components/TaskForm';
import { createTask } from '../api/taskApi';

const AddTask = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (taskData) => {
    try {
      setLoading(true);
      await createTask(taskData);
      toast.success('Task created successfully');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Unable to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Add New Task</h1>
        <p className="mt-2 text-sm text-slate-500">Create a new task with priority, due date, and status.</p>
      </div>
      <TaskForm onSubmit={handleSubmit} loading={loading} />
    </section>
  );
};

export default AddTask;
