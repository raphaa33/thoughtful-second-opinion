import { SVGProps } from "react"

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 4c0 2.5-2 4.5-4.5 4.5S3 6.5 3 4s2-4.5 4.5-4.5S12 1.5 12 4zM12 4c0 2.5 2 4.5 4.5 4.5S21 6.5 21 4s-2-4.5-4.5-4.5S12 1.5 12 4zM12 12c2.5 0 4.5-2 4.5-4.5S14.5 3 12 3 7.5 5 7.5 7.5 9.5 12 12 12zM12 12c2.5 0 4.5 2 4.5 4.5S14.5 21 12 21s-4.5-2-4.5-4.5S9.5 12 12 12zM12 12c0 2.5 2 4.5 4.5 4.5S21 14.5 21 12s-2-4.5-4.5-4.5S12 9.5 12 12zM12 12c0 2.5-2 4.5-4.5 4.5S3 14.5 3 12s2-4.5 4.5-4.5S12 9.5 12 12z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}