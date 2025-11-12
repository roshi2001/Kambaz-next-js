"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import type { RootState } from "@/lib/store";
import CourseNavigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";

export default function CourseLayout({ children }: { children: React.ReactNode }) {
  const { cid } = useParams<{ cid: string }>();
  const router = useRouter();

 
const { currentUser } = useSelector((s: any) => s.accountReducer);
  const enrollments = useSelector((s: RootState) => s.enrollments.enrollments);
  const { courses } = useSelector((s: any) => s.coursesReducer);

  const course = courses.find((c: any) => String(c._id) === String(cid));

  useEffect(() => {
    
    if (!currentUser?._id) {
      router.replace("/Dashboard");
      return;
    }
    
    if (!course) {
      router.replace("/Dashboard");
      return;
    }

    
  }, [cid, currentUser?._id, course, enrollments, router]);

  const [navOpen, setNavOpen] = useState(true);
  useEffect(() => {
    const saved = sessionStorage.getItem("courses-nav-open");
    if (saved !== null) setNavOpen(saved === "true");
  }, []);
  useEffect(() => {
    sessionStorage.setItem("courses-nav-open", String(navOpen));
  }, [navOpen]);

  return (
    <div id="wd-courses" className="container-fluid py-3">
      <Breadcrumb course={course} navOpen={navOpen} onToggle={() => setNavOpen((v) => !v)} />
      <hr />
      <div className="d-flex gap-3">
        <aside
          id="wd-courses-nav"
          className={`border-end pe-2 ${navOpen ? "d-block" : "d-none"}`}
          style={{ width: 170, minWidth: 160 }}
        >
          <CourseNavigation />
        </aside>
        <main className="flex-fill">{children}</main>
      </div>
    </div>
  );
}
