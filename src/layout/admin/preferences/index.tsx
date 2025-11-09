"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import Input from "@/components/input/input";
import Button from "@/components/button";
import Checkbox from "@/components/input/checkbox";

// ------------------------------------------------
// Types
// ------------------------------------------------
interface SystemPreferencesForm {
  language: string;
  region: string;
  timezone: string;
  dateFormat: string;
  // Notification settings
  campaignEmail: boolean;
  campaignInApp: boolean;
  paymentEmail: boolean;
  paymentInApp: boolean;
  driverEmail: boolean;
  driverInApp: boolean;
  magazineEmail: boolean;
  magazineInApp: boolean;
  systemEmail: boolean;
  systemInApp: boolean;
}

// ------------------------------------------------
// Validation Schema
// ------------------------------------------------
const schema = yup.object().shape({
  language: yup.string().optional(),
  region: yup.string().optional(),
  timezone: yup.string().optional(),
  dateFormat: yup.string().optional(),
});

// ------------------------------------------------
// Component
// ------------------------------------------------
const SystemPreferencesTab = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SystemPreferencesForm>({
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues: {
      language: "",
      region: "",
      timezone: "",
      dateFormat: "",
      campaignEmail: true,
      campaignInApp: false,
      paymentEmail: true,
      paymentInApp: false,
      driverEmail: true,
      driverInApp: false,
      magazineEmail: true,
      magazineInApp: false,
      systemEmail: true,
      systemInApp: false,
    },
  });

  const onSubmit = (data: SystemPreferencesForm) => {
    console.log("System preferences:", data);
    toast.success("System preferences saved successfully!");
  };

  const handleCancel = () => {
    reset();
    toast.info("Changes cancelled");
  };

  const notificationItems = [
    { 
      key: "campaign", 
      label: "Campaign Notifications",
      emailName: "campaignEmail" as const,
      inAppName: "campaignInApp" as const
    },
    { 
      key: "payment", 
      label: "Payment & Invoice Notifications",
      emailName: "paymentEmail" as const,
      inAppName: "paymentInApp" as const
    },
    { 
      key: "driver", 
      label: "Driver Notifications",
      emailName: "driverEmail" as const,
      inAppName: "driverInApp" as const
    },
    { 
      key: "magazine", 
      label: "Magazine Notifications",
      emailName: "magazineEmail" as const,
      inAppName: "magazineInApp" as const
    },
    { 
      key: "system", 
      label: "System & Admin Notifications",
      emailName: "systemEmail" as const,
      inAppName: "systemInApp" as const
    },
  ];

  return (
    <div className="w-full ">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* System Preferences Section */}
        <div className="bg-white p-8 rounded-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            System Preferences
          </h2>
          <div className="space-y-4">
            <Input
              label="Language"
              placeholder=""
              register={register("language")}
              error={errors.language}
            />

            <Input
              label="Region"
              placeholder=""
              register={register("region")}
              error={errors.region}
            />

            <Input
              label="Time zone"
              placeholder=""
              register={register("timezone")}
              error={errors.timezone}
            />

            <Input
              label="Date Format"
              placeholder=""
              register={register("dateFormat")}
              error={errors.dateFormat}
            />
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white p-8 rounded-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Notifications
          </h2>
          <div className="space-y-4">
            {notificationItems.map((item) => (
              <div
                key={item.key}
                className="flex flex-wrap gap-2 items-center justify-between py-3 border-b border-gray-100 last:border-0"
              >
                <span className=" text-gray-900 font-medium">{item.label}</span>
                <div className="flex items-center gap-6">
                  <Checkbox
                    name={item.emailName}
                    label="Email"
                    control={control}
                  />
                  <Checkbox
                    name={item.inAppName}
                    label="In-App"
                    control={control}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-end">
          <Button
            type="submit"
            size="md"
            className="w-auto! px-12 whitespace-nowrap text-sm sm:text-base bg-[#336AEA] text-white rounded-lg font-medium hover:bg-[#2952b8] transition-colors"
          >
            Save Changes
          </Button>
          <Button
            type="button"
            variant="border"
            size="md"
            borderColor="#336AEA"
            borderWidth="1"
            className="w-auto! text-sm sm:text-base px-12 bg-white text-[#336AEA] rounded-lg font-medium hover:bg-gray-50 transition-colors"
            handleClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SystemPreferencesTab;