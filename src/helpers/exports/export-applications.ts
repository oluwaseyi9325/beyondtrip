// utils/exportToCSV.ts
import { unparse } from "papaparse";
// import { TApplications } from "@/layout/admin/tables/applications";

export const exportApplications = (
  data: any,
  filename = "registrations.csv"
) => {
  if (!data || data.length === 0) return;

  const flattened = data.map((app:any) => ({
    FirstName: app?.firstName,
    MiddleName: app?.middleName,
    LastName: app?.lastName,
    PhoneNumber: app?.phoneNumber,
    Email: app?.emailAddress,
    Country: app?.country,
    State: app?.state,
    City: app?.city,
    Gender: app?.gender,
    Course: app?.course?.courseName ?? "",
    IsSAP: app?.isSAP ? "Yes" : "No",
    SAPProgram: app?.sapProgram ?? "",
    SAPOption: app?.sapOption ?? "",
    EmploymentStatus: app?.employementStatus,
    PaymentStatus: app?.paymentStatus,
    HasExperience: app?.hasExperience ? "Yes" : "No",
    WillPayAppFee: app?.isWillingToPayApplicationFee ? "Yes" : "No",
    WillPayTuition: app?.isWillingToPayTuitionFee ? "Yes" : "No",
    Ambassador: app?.ambassador ?? "",
    GoalOfJoining: app?.goalOfJoining,
    HeardFrom: app?.howDidYouHearAboutUs,
    AddedDate: new Date(app?.addedDate).toLocaleString(),
    // CohortID: app?.cohortId,
    // PaymentURL: app?.paymentUrl ?? "",
    // ApplicationFeePayment: app?.applicationFeePayment ?? "",
    // PromoData: app?.promoData ?? "",
  }));

  const csv = unparse(flattened);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
