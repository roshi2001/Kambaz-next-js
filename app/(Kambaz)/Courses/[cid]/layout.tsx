import { ReactNode } from "react";
import { courses } from "../../Database";
import CourseNavigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";

export default async function CoursesLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ cid: string }>;
}) {
  const { cid } = await params;

  const course = courses.find((course) => course._id === cid);

  return (
    <div id="wd-courses">
      <Breadcrumb course={course} />
      <hr className="my-2" />

      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
