import { useState } from 'react';
import { toast } from 'react-toastify';
import useFetchTasks from '../hooks/useFetchTasks';
import { deleteTask } from '../api/taskApi';
import TaskCard from '../components/TaskCard';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import ErrorMessage from '../components/ErrorMessage';
import Modal from '../components/Modal';

const statusOptions = ['Pending', 'In Progress', 'Completed'];
const sortOptions = [
  { value: 'createdAt_desc', label: 'Newest' },
  { value: 'priority_asc', label: 'Priority Low to High' },
  { value: 'priority_desc', label: 'Priority High to Low' },
];

const Home = () => {
  const [filters, setFilters] = useState({ search: '', status: '', sort: 'createdAt_desc', page: 1, limit: 8 });
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { tasks, pagination, loading, error, refresh } = useFetchTasks(filters);

  const handleDelete = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteTask(selectedTask._id);
      toast.success('Task deleted successfully');
      setIsModalOpen(false);
      setSelectedTask(null);
      refresh();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Unable to delete task');
    }
  };

  const handleSearch = (event) => {
    setFilters((prev) => ({ ...prev, search: event.target.value, page: 1 }));
  };

  const handleStatusChange = (event) => {
    setFilters((prev) => ({ ...prev, status: event.target.value, page: 1 }));
  };

  const handleSortChange = (event) => {
    setFilters((prev) => ({ ...prev, sort: event.target.value, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const noTasks = !loading && !error && tasks.length === 0;

  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Task List</h1>
            <p className="mt-2 text-sm text-slate-500">Track tasks, filter by status, sort by priority, and manage progress.</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <input
            type="text"
            value={filters.search}
            onChange={handleSearch}
            placeholder="Search by title"
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white"
          />
          <select
            value={filters.status}
            onChange={handleStatusChange}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white"
          >
            <option value="">All statuses</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <select
            value={filters.sort}
            onChange={handleSortChange}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {noTasks && <EmptyState message="No tasks match your filters." />}

      <div className="grid gap-6 lg:grid-cols-2">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} onDelete={handleDelete} />
        ))}
      </div>

      {pagination.totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <button
            type="button"
            onClick={() => handlePageChange(Math.max(pagination.page - 1, 1))}
            disabled={pagination.page === 1}
            className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-sm text-slate-600">
            Page {pagination.page} of {pagination.totalPages}
          </span>

          <button
            type="button"
            onClick={() => handlePageChange(Math.min(pagination.page + 1, pagination.totalPages))}
            disabled={pagination.page === pagination.totalPages}
            className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        title="Delete Task"
        description="This action cannot be undone. Are you sure you want to delete this task?"
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </section>
  );
};

export default Home;
