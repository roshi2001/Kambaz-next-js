"use client";
import { usePathname } from "next/navigation";
import { FaAlignJustify } from "react-icons/fa6";

export default function Breadcrumb({
  course,
  navOpen,
  onToggle,
}: {
  course?: { name?: string };
  navOpen: boolean;
  onToggle: () => void;
}) {
  const pathname = usePathname();
  const section = pathname?.split("/").filter(Boolean).pop() || "Home";

  return (
    <div className="d-flex align-items-center mb-2 text-danger">
      <button
        type="button"
        className="btn btn-link p-0 me-3 text-danger"
        aria-label="Toggle course navigation"
        aria-expanded={navOpen}
        aria-controls="wd-courses-nav"
        onClick={onToggle}
        title={navOpen ? "Hide navigation" : "Show navigation"}
      >
        <FaAlignJustify className="fs-4 mb-1 text-danger" />
      </button>
      <h4 className="m-0 text-danger">
        {course?.name ?? "Course"} &gt; {section}
      </h4>
    </div>
  );
}
