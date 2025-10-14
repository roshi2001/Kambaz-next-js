"use client";

import { usePathname } from "next/navigation";
import { FaAlignJustify } from "react-icons/fa6";

export default function Breadcrumb({
  course,
}: {
  course: { name: string } | undefined;
}) {
  const pathname = usePathname();
  const section = pathname.split("/").pop();

  return (
    <h2 className="text-danger">
      <FaAlignJustify className="me-2 fs-4 mb-1" />
      {course?.name} &gt; {section}
    </h2>
  );
}
