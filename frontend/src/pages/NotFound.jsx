import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#F8FAFC] px-6 py-12 text-slate-900">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute right-0 top-16 h-80 w-80 rounded-full bg-orange-200/40 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center rounded-3xl border border-slate-200/80 bg-white/85 p-10 text-center shadow-[0_25px_70px_rgba(15,23,42,0.12)] backdrop-blur">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-orange-500">
          404 Error
        </p>
        <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">
          Page not found
        </h1>
        <p className="mt-4 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
          The page you are looking for does not exist or may have been moved.
          Return home to continue shopping.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Go to Home
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;