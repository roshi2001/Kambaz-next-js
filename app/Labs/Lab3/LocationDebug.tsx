"use client";
import { usePathname, useSearchParams } from "next/navigation";

export default function LocationDebug() {
  const pathname = usePathname();
  const search = useSearchParams();
  const query = search.toString();

  return (
    <div id="wd-location-debug">
      <h4>Location</h4>
      path: {pathname} <br />
      query: {query || "(none)"}
    </div>
  );
}
