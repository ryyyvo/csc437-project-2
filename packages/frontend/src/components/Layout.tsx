import { Link } from "react-router";
import ThemeToggle from './ThemeToggle';
import "../index.css";

type LayoutProps = {
  children: React.ReactNode;
  currentUser?: string;
};

export default function Layout({ children, currentUser }: LayoutProps) {
  return (
    <>
      <header>
        <nav>
          <Link to="/"><h1>CSC437 Project</h1></Link>
          <ul>
            <li><Link to="/review">Create Review</Link></li>
            <li>
              <Link 
                style={{ color: "var(--color-secondary-text)" }} 
                to={currentUser ? "/user" : "/login"}
              >
                {currentUser || "Login"}
              </Link>
            </li>
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
}