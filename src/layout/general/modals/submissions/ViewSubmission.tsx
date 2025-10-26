import Modal from "@/components/modal";
import { TSubmissions } from "@/layout/driver/tables/submission";


interface TModal {
  open: boolean;
  handleClose: () => void;
  refetch?: () => void;
  data: TSubmissions | null;
}

const ViewSubmission = ({ open, handleClose, data }: TModal) => {
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "-";
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateStr));
  };

  return (
    <Modal open={open} handleClose={handleClose} className="w-[550px] p-8">
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-[24px] font-bold text-[#171313] mb-2">
            View Assignment Submission
          </h2>
          <p className="text-gray-600 text-sm">Review advertiser submission details</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Name</h3>
            <p>{data?.firstName} {data?.lastName}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
            <p>{data?.emailAddress}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Phone</h3>
            <p>{data?.phoneNumber}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Submitted Date</h3>
            <p>{formatDate(data?.submittedDate || null)}</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 mb-1">Comment</h3>
          <p className="text-gray-600">{data?.submissionComment || "-"}</p>
        </div>

        {data?.answer && (
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Answer</h3>
            <a
              href={data.answer}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline break-all"
            >
              {data.answer}
            </a>
          </div>
        )}

        {/* {data?.attachmentLinks?.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Attachments</h3>
            <ul className="list-disc pl-5 text-blue-600">
              {data.attachmentLinks.map((file, idx) => (
                <li key={idx}>
                  <a href={file} target="_blank" rel="noopener noreferrer">
                    File {idx + 1}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )} */}
      </div>
    </Modal>
  );
};

export default ViewSubmission;
