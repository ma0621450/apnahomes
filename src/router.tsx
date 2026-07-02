import { createContext, useContext, useState, useEffect, ReactNode, MouseEvent } from 'react';

interface RouterContextType {
  path: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextType>({ path: '/', navigate: () => {} });

export function Router({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = (to: string) => {
    window.history.pushState(null, '', to);
    setPath(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext);
}

export function useNavigate() {
  const { navigate } = useContext(RouterContext);
  return navigate;
}

export function useLocation() {
  const { path } = useContext(RouterContext);
  return { pathname: path };
}

interface LinkProps {
  to: string;
  children: ReactNode;
  className?: string;
  'aria-label'?: string;
  onClick?: () => void;
}

export function Link({ to, children, className = '', 'aria-label': ariaLabel, onClick }: LinkProps) {
  const { navigate } = useContext(RouterContext);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick?.();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className} aria-label={ariaLabel}>
      {children}
    </a>
  );
}

interface RouteProps {
  path: string;
  element: ReactNode;
}

interface RoutesProps {
  children: ReactNode;
}

export function Routes({ children }: RoutesProps) {
  const { path } = useContext(RouterContext);
  const childArray = Array.isArray(children) ? children : [children];
  
  // Find matching route (exact first, then wildcard)
  let matched: ReactNode = null;
  let wildcard: ReactNode = null;

  for (const child of childArray) {
    if (!child || typeof child !== 'object' || !('props' in child)) continue;
    const props = (child as { props: RouteProps }).props;
    if (props.path === '*') {
      wildcard = props.element;
      continue;
    }
    // Match: exact or prefix with trailing slash
    if (path === props.path || path.startsWith(props.path + '/')) {
      if (!matched || props.path.length > (matched as string).length) {
        matched = props.element;
      }
    }
  }

  return <>{matched ?? wildcard}</>;
}

export function Route(_props: RouteProps) {
  return null; // Routes handles rendering
}
