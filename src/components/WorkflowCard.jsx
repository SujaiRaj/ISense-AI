import React from 'react';
import { Link } from 'react-router-dom';

export default function WorkflowCard({
  to,
  onClick,
  icon = 'manage_search',
  title,
  description,
  actionText = 'Open',
  iconBg = 'bg-orange-100 text-primary border-orange-200',
  className = ''
}) {
  const content = (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 border ${iconBg}`}>
          <span className="material-symbols-outlined text-[20px]">
            {icon}
          </span>
        </div>
        <h3 className="font-headline-sm font-bold text-slate-900 group-hover:text-primary transition-colors mt-3 text-sm">
          {title}
        </h3>
        <p className="font-body-sm text-slate-600 mt-1.5 leading-relaxed text-xs">
          {description}
        </p>
      </div>

      <div className="mt-4 pt-2.5 flex items-center justify-between text-xs font-bold text-primary transition-colors border-t border-slate-100/80">
        <span>{actionText}</span>
        <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
          chevron_right
        </span>
      </div>
    </div>
  );

  const baseClasses = `p-4 rounded-xl bg-white hover:bg-orange-50/20 transition-all border border-slate-200/80 hover:border-primary/40 group shadow-2xs ${className}`;

  if (to) {
    return (
      <Link to={to} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <div onClick={onClick} className={`${baseClasses} cursor-pointer`}>
      {content}
    </div>
  );
}
