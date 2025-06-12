import { Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import ThemeToggle from './ThemeToggle';
import "../index.css";

type LayoutProps = {
  children: React.ReactNode;
  currentUser?: string;
};

export default function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    navigate('/');
  };

  return (
    <>
      <header>
        <nav>
          <Link to="/"><h1>CSC437 Project</h1></Link>
          <ul>
            <li><Link to="/review">Create Review</Link></li>
            <li>
              {user ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
                  <Link 
                    style={{ color: "var(--color-secondary-text)" }} 
                    to={`/user/${user.username}`}
                  >
                    {user.username}
                  </Link>
                  <a 
                    href="#"
                    onClick={handleLogout}
                    style={{ color: "var(--color-secondary-text)" }}
                  >
                    Logout
                  </a>
                </div>
              ) : (
                <Link 
                  style={{ color: "var(--color-secondary-text)" }} 
                  to="/login"
                >
                  Login
                </Link>
              )}
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