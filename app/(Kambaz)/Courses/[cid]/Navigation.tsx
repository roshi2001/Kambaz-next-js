"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function CourseNavigation() {
  const { cid } = useParams() as { cid: string };
  const pathname = usePathname();

  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];

  return (
    <nav id="wd-courses-navigation" className="list-group fs-5 rounded-0">
      {links.map((label) => {
        const href = `/Courses/${cid}/${label}`;
        const isActive = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={label}
            href={href}
            id={`wd-course-${label.toLowerCase()}-link`}
            aria-current={isActive ? "page" : undefined}
            className={`list-group-item list-group-item-action border-0 ${
              isActive ? "active" : "text-danger"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

