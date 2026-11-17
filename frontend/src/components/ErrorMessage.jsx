const ErrorMessage = ({ message }) => (
  <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-center text-red-700 shadow-sm">
    <p className="font-medium">Something went wrong</p>
    <p className="mt-2 text-sm">{message}</p>
  </div>
);

export default ErrorMessage;
