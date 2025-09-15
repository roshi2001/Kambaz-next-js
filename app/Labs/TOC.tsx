import Link from "next/link";

export default function TOC() {
  return (
    <nav aria-label="Labs navigation">
      <ul>
        <li>
          <Link href="/Labs" id="wd-labs-home-link">Labs</Link>
        </li>
        <li>
          <Link href="/Labs/Lab1" id="wd-lab1-link">Lab 1</Link>
        </li>
        <li>
          <Link href="/Labs/Lab2" id="wd-lab2-link">Lab 2</Link>
        </li>
        <li>
          <Link href="/Labs/Lab3" id="wd-lab3-link">Lab 3</Link>
        </li>
        <li>
          <Link href="/Account/Signin" id="wd-kambaz-link">Kambaz</Link>
        </li>
        <li>
          <a
            href="https://github.com/roshi2001/Kambaz-next-js"
            id="wd-github-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </li>
      </ul>
    </nav>
  );
}



