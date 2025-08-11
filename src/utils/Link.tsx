import React from 'react';

interface LinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

// Since we're not using a router library yet, this component simulates links
// by changing the window location or scrolling to sections
export const Link: React.FC<LinkProps> = ({ to, children, className, onClick }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // If this is a section link (starts with #), scroll to it
    if (to.startsWith('#')) {
      const element = document.querySelector(to);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (to === '/') {
      // If it's the home link, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Update URL without full page reload
      window.history.pushState({}, '', to);
    } else {
      // Otherwise, update the URL
      window.history.pushState({}, '', to);
      // For a real app, you would use routing instead of this
      // This is a simplified approach for demo purposes
      
      // Scroll to top when changing pages
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Call the onClick handler if provided
    if (onClick) {
      onClick();
    }
  };
  
  return (
    <a 
      href={to} 
      className={className} 
      onClick={handleClick}
    >
      {children}
    </a>
  );
};