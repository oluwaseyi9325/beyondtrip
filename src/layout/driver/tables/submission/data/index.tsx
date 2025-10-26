"use client";


import { TSubmissions } from "..";

function formatDate(dateStr: string | null) {
  if (!dateStr) return "-";
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr));
}

export const useSubmissionColumns = ({
  handleClickView,
}: {
  handleClickView: (submission: TSubmissions) => void;
}) => {
  return [
    {
      name: "advertiser Name",
      selector: (row: TSubmissions) => `${row.firstName} ${row.lastName}`,
    },
    {
      name: "Email",
      width: "20%",
      selector: (row: TSubmissions) => row.emailAddress,
    },
    {
      name: "Submitted Date",
      width: "25%",
      selector: (row: TSubmissions) => formatDate(row.submittedDate),
    },
    {
      name: "Comment",
      width: "25%",
      cell: (row: TSubmissions) => (
        <span className="line-clamp-2 text-gray-600 text-sm">{row.submissionComment}</span>
      ),
    },
    // {
    //   name: "Answer",
    //   cell: (row: TSubmissions) =>
    //     row.answer ? (
    //       <a
    //         href={row.answer}
    //         target="_blank"
    //         rel="noopener noreferrer"
    //         className="text-blue-600 underline"
    //       >
    //         View Answer
    //       </a>
    //     ) : (
    //       "-"
    //     ),
    // },
    {
      name: "",
      width: "10%",
      cell: (row: TSubmissions) => (
        <button
          onClick={() => handleClickView(row)}
          className="bg-[#171313] text-white px-3 py-1 rounded-md hover:bg-[#2c2c2c]"
        >
          View
        </button>
      ),
    },
  ];
};
