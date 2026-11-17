const EmptyState = ({ message }) => (
  <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
    <p className="text-lg font-semibold text-slate-900">{message}</p>
    <p className="mt-2 text-sm text-slate-500">Try adding a new task or adjusting the filters.</p>
  </div>
);

export default EmptyState;
