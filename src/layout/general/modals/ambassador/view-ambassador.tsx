import Modal from "@/components/modal";


interface TModal {
  open: boolean;
  handleClose: () => void;
  refetch?: () => void;
  data: any;
}

export interface TAddClass {
  course: string;
  cohort: string;
}

const ViewAmbassador = ({ open, handleClose, data }: TModal) => {
  return (
    <Modal open={open} handleClose={handleClose} className="w-[490px] p-14">
      <form
        className="w-full flex flex-col gap-10"

      >
        <p className="text-[32px] font-[700] leading-[36px] text-[#171313]">
          View Ambassador
        </p>

        <section className="w-full flex flex-col gap-4">
          <div className="flex justify-between">
            <h3 className="font-semibold text-gray-800 mb-2">Name:</h3>
            <p className="text-gray-600">{data?.firstName} {data?.lastName}</p>
          </div>

          <div className="flex justify-between">
            <h3 className="font-semibold text-gray-800 mb-2">Email:</h3>
            <p className="text-gray-600">{data?.email}</p>
          </div>

          <div className="flex justify-between">
            <h3 className="font-semibold text-gray-800 mb-2">Phone Number:</h3>
            <p className="text-gray-600">{data?.phoneNumber}</p>
          </div>

          <div className="flex justify-between">
            <h3 className="font-semibold text-gray-800 mb-2">Promocode:</h3>
            <p className="text-gray-600 text-sm">{data?.promoCode}</p>
          </div>

          <div className="">
            <h3 className="font-semibold text-gray-800 mb-2">Referral Link:</h3>
            <a href={data?.referralLink} target="_blank" className="text-blue-800 text-sm">{data?.referralLink}</a>
          </div>
        </section>


      </form>
    </Modal>
  );
};

export default ViewAmbassador;
