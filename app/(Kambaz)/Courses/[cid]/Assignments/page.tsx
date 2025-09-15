import Link from "next/link";

type Props = { params: { cid: string } };

export default function Assignments({ params }: Props) {
  const { cid } = params;

  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments" id="wd-search-assignment" />
      <button id="wd-add-assignment-group" type="button">+ Group</button>
      <button id="wd-add-assignment" type="button">+ Assignment</button>

      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button type="button">+</button>
      </h3>

      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link
            href={`/Courses/${cid}/Assignments/123`}
            id="wd-assignment-123-link"
            className="wd-assignment-link"
          >
            A1 - ENV + HTML
          </Link>
          <div className="wd-assignment-meta">
            Multiple Modules | <b>Not available until</b> May 6 at 12:00am |{" "}
            <b>Due</b> May 13 at 11:59pm | 100 pts
          </div>
        </li>

        <li className="wd-assignment-list-item">
          <Link
            href={`/Courses/${cid}/Assignments/124`}
            id="wd-assignment-124-link"
            className="wd-assignment-link"
          >
            A2 - CSS + BOOTSTRAP
          </Link>
          <div className="wd-assignment-meta">
            Multiple Modules | <b>Not available until</b> May 13 at 12:00am |{" "}
            <b>Due</b> May 20 at 11:59pm | 100 pts
          </div>
        </li>

        <li className="wd-assignment-list-item">
          <Link
            href={`/Courses/${cid}/Assignments/125`}
            id="wd-assignment-125-link"
            className="wd-assignment-link"
          >
            A3 - JAVASCRIPT + REACT
          </Link>
          <div className="wd-assignment-meta">
            Multiple Modules | <b>Not available until</b> May 20 at 12:00am |{" "}
            <b>Due</b> May 27 at 11:59pm | 100 pts
          </div>
        </li>
      </ul>
    </div>
  );
}
