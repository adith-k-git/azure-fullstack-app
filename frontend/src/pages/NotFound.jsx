import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
    <h1 className="text-4xl font-semibold text-slate-900">Page not found</h1>
    <p className="mt-4 text-slate-500">We couldn’t find the page you were looking for.</p>
    <Link
      to="/"
      className="mt-8 inline-flex rounded-3xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
    >
      Back to Home
    </Link>
  </div>
);

export default NotFound;
