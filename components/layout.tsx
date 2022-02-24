import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  linkText: string;
  linkHref: string;
}

const Layout = ({ children, title, linkText, linkHref }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen max-w-screen-md mx-auto px-4 py-16 antialiased">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-slate-900">{title}</h1>

        <Link href={linkHref}>
          <a className="py-2 px-4 bg-indigo-600 text-white rounded-lg text-xs md:text-sm font-medium transition-transform duration-300 ease-in-out hover:scale-105">
            {linkText}
          </a>
        </Link>
      </div>

      <div className="flex-grow relative mt-12 md:mt-16 space-y-8 md:space-y-12">
        {children}
      </div>
    </div>
  );
};

export default Layout;
