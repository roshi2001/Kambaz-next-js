import Link from "next/link";
export default function Page() {
  return (
  <div id="wd-labs" style={{ padding: "1rem 0" }}>
      <header>
        <h1
          id="wd-labs-heading"
          style={{ fontSize: "2.25rem", fontWeight: 800, marginBottom: "0.25rem" }}
        >
          Labs
        </h1>
        <p id="wd-student" style={{ margin: 0, color: "#555" }}>
          Roshitha Tiruveedhula • CS5610.19730.202610
        </p>
      </header>

      <ul style={{ marginTop: "1rem", lineHeight: 1.6 }}>
        <li>
          <Link href="/Labs/Lab1" id="wd-lab1-link" style={{ fontSize: "1.125rem" }}>
            Lab 1: HTML Examples
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab2" id="wd-lab2-link" style={{ fontSize: "1.125rem" }}>
            Lab 2: CSS Basics
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab3" id="wd-lab3-link" style={{ fontSize: "1.125rem" }}>
            Lab 3: JavaScript Fundamentals
          </Link>
        </li>
        <li>
          <Link href="/Account/Signin" id="wd-kambaz-link" style={{ fontSize: "1.125rem" }}>
            Kambaz
          </Link>
        </li>
        <li>
          <Link
            href="https://github.com/roshi2001/Kambaz-next-js"
            id="wd-github-link"
            style={{ fontSize: "1.125rem" }}
            target="_blank"
          >
            GitHub
          </Link>
        </li>
      </ul>
    </div>
  );
}
