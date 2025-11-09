
import { useForm } from 'react-hook-form'; // Add this import
import Input from "@/components/input/input";
import Select from "@/components/input/select";
import Button from "@/components/button";
import { FaPlusCircle } from 'react-icons/fa';


function SettingPayment() {

  const { control } = useForm({
    defaultValues: {
      approvalMode: 'manual',
    }
  });

  const withdrawerOptions = [
    { label: "3 Business Days", value: "3 business days" },
    { label: "5 Business Days", value: "5 business days" },
  ];

  const gatewayOptions = [
    { label: "Paystack Titan", value: "Paystack Titan" },
    { label: "Flutter Wave", value: "Flutter Wave" },
  ];





  return (
    <div className=" space-y-15 flex flex-col  ">
      <div className="p-10 rounded-lg  bg-white ">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Payout Settings
        </h2>
        <div className='space-y-8' >
          <Select
            label="Payout Withdrawal Date"
            name="Payout Withdrawal Date"
            options={withdrawerOptions}
            control={control}
            placeholder="3 Business Days"
          />

          <Select
            label="Default Payment Gateway"
            name="Default Payment Gateway"
            options={gatewayOptions}
            control={control}
            placeholder="Paystack Titan"
          />


        </div>


      </div>

      <div className="p-10 rounded-lg  bg-white ">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Payment Gateway Integration
        </h2>
        <div className=' flex gap-2 items-center justify-center text-lg w-full text-white  font-semibold py-[20px] px-4 rounded-[12px] bg-[#336AEA] cursor-pointer  ' >
          <FaPlusCircle />
          <button>  Add New Gateway  </button>
        </div>


      </div>

      <div className="bg-white p-10 rounded-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Update Pricing tiers
        </h2>
        <div className="space-y-4">
          <Input
            label="Essentials Plan"
            placeholder="Amount"
          />

          <Input
            label="Growth Plan"
            placeholder="Amount"
          />

          <Input
            label="Impact Plan"
            placeholder="Amount"
          />

        </div>

        <div className="flex mt-8  justify-end gap-4">
          <Button
            type="submit"
            size="md"
            className="!w-auto px-12 bg-[#336AEA] text-white rounded-lg font-medium hover:bg-[#2952b8] transition-colors"
          >
            Save Changes
          </Button>

          <Button
            type="button"
            variant="border"
            size="md"
            borderColor="#336AEA"
            borderWidth="1"
            className="!w-auto px-12 bg-white text-[#336AEA] rounded-lg font-medium transition-colors"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SettingPayment