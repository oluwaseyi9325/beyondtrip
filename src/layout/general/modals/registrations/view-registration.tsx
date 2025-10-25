import Modal from "@/components/modal";
import { useVerifyPayment } from "@/services/student.service";
import { useState } from "react";
// Import your payment verification service here
// import { useVerifyPayment } from "@/services/payment.service";
import toast from "react-hot-toast";

interface TModal {
  open: boolean;
  handleClose: () => void;
  refetch?: () => void;
  data: any; // TApplications type
}

const ViewRegistration = ({ open, handleClose, data, refetch }: TModal) => {
  const [isVerifying, setIsVerifying] = useState(false);
  console.log(data?.id,"application Id HERE")
  // Replace this with your actual payment verification service
  const verifyPayment = useVerifyPayment(data?.id);

  function handleVerifyPayment() {
    if (!data?.id) return;

    setIsVerifying(true);
    verifyPayment.mutate(
      { applicationId: data.id },
      {
        onSuccess: () => {
          toast.success("Payment verified successfully!");
          refetch?.();
          handleClose();
        },
        onError: (err: any) => {
          console.log(err, "error in verifying payment");
          toast.error(
            err?.response?.data?.error?.description ?? "Failed to verify payment"
          );
        },
        onSettled: () => {
          setIsVerifying(false);
        }
      }
    );

   
  }

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "-";
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(dateStr));
  };

  return (
    <Modal open={open} handleClose={handleClose} className="w-[550px] p-8">
      <div className="w-full flex flex-col gap-8">
        <div>
          <h2 className="text-[28px] font-[700] leading-[32px] text-[#171313] mb-2">
            Student Registration Details
          </h2>
          <p className="text-gray-600 text-sm">
            Review student information and verify payment status
          </p>
        </div>

        <section className="w-full flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-800 text-sm mb-1">Name</h3>
              <p className="text-gray-600">
                {data?.firstName} {data?.middleName ? `${data.middleName} ` : ''}{data?.lastName}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 text-sm mb-1">Email</h3>
              <p className="text-gray-600">{data?.emailAddress}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 text-sm mb-1">Phone</h3>
              <p className="text-gray-600">{data?.phoneNumber}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 text-sm mb-1">Country</h3>
              <p className="text-gray-600">{data?.country}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 text-sm mb-1">State/City</h3>
              <p className="text-gray-600">{data?.state}, {data?.city}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 text-sm mb-1">Gender</h3>
              <p className="text-gray-600">{data?.gender}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 text-sm mb-1">Course</h3>
              <p className="text-gray-600">{data?.course?.courseName}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 text-sm mb-1">Registration Date</h3>
              <p className="text-gray-600">{formatDate(data?.addedDate)}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 text-sm mb-1">Employment Status</h3>
              <p className="text-gray-600">{data?.employementStatus}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 text-sm mb-1">Payment Status</h3>
              <div className="flex">
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    data?.paymentStatus === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {data?.paymentStatus}
                </span>
              </div>
            </div>
          </div>

          {data?.goalOfJoining && (
            <div>
              <h3 className="font-semibold text-gray-800 text-sm mb-1">Goal of Joining</h3>
              <p className="text-gray-600 text-sm">{data.goalOfJoining}</p>
            </div>
          )}

          {data?.howDidYouHearAboutUs && (
            <div>
              <h3 className="font-semibold text-gray-800 text-sm mb-1">How did you hear about us?</h3>
              <p className="text-gray-600 text-sm">{data.howDidYouHearAboutUs}</p>
            </div>
          )}

          {data?.ambassador && (
            <div>
              <h3 className="font-semibold text-gray-800 text-sm mb-1">Ambassador</h3>
              <p className="text-gray-600">{data.ambassador}</p>
            </div>
          )}
        </section>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end border-t pt-6">
          <button
            type="button"
            onClick={handleClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          
          {data?.paymentStatus === "Not Paid" && (
            <button
              type="button"
              onClick={handleVerifyPayment}
              disabled={isVerifying}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {isVerifying ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Verifying...
                </>
              ) : (
                "Verify Payment"
              )}
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ViewRegistration;