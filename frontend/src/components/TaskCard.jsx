import { Link } from 'react-router-dom';

const priorityStyles = {
  Low: 'bg-emerald-100 text-emerald-700',
  Medium: 'bg-amber-100 text-amber-700',
  High: 'bg-rose-100 text-rose-700',
};

const statusStyles = {
  Pending: 'bg-slate-100 text-slate-700',
  'In Progress': 'bg-sky-100 text-sky-700',
  Completed: 'bg-lime-100 text-lime-700',
};

const TaskCard = ({ task, onDelete }) => (
  <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h3 className="text-xl font-semibold text-slate-900">{task.title}</h3>
        <p className="mt-2 text-sm text-slate-500">{task.description || 'No description provided.'}</p>
      </div>
      <div className="space-y-2 text-right">
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[task.status]}`}>
          {task.status}
        </span>
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${priorityStyles[task.priority]}`}>
          {task.priority}
        </span>
      </div>
    </div>

    <div className="mt-4 grid gap-3 sm:grid-cols-2">
      <div className="text-sm text-slate-500">
        <p>Due date</p>
        <p className="mt-1 text-base text-slate-900">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Not set'}</p>
      </div>
      <div className="flex flex-wrap gap-3 text-sm">
        <Link
          to={`/edit/${task._id}`}
          className="rounded-2xl bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-700"
        >
          Edit
        </Link>
        <button
          type="button"
          onClick={() => onDelete(task)}
          className="rounded-2xl bg-rose-100 px-4 py-2 text-rose-700 transition hover:bg-rose-200"
        >
          Delete
        </button>
      </div>
    </div>
  </article>
);

export default TaskCard;
