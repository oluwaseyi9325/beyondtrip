"use client";

import { useState } from "react";
import Button from "@/components/button";
import Input from "@/components/input/input";
import Select from "@/components/input/select";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// ------------------------------------------------
// Types
// ------------------------------------------------
interface SettingsFormData {
  approvalMode: string;
  pauseCampaign: string;
  invoiceDeadline: string;
  editionTitle: string;
  copiesCount: string;
  emailNotifications: boolean;
  inAppNotifications: boolean;
  escalationUnpaid: string;
  escalationWebhook: string;
  otherRequests: string;
  publicKey: string;
  secretKey: string;
  webhookUrl: string;
}

// ------------------------------------------------
// Validation Schema
// ------------------------------------------------
const schema = yup.object().shape({
  approvalMode: yup.string().required("Approval mode is required"),
  pauseCampaign: yup.string().required("Pause campaign duration is required"),
  invoiceDeadline: yup.string().required("Invoice deadline is required"),
  editionTitle: yup.string().required("Edition title is required"),
  copiesCount: yup.string().required("Number of copies is required"),
  escalationUnpaid: yup.string().required("Escalation setting is required"),
  escalationWebhook: yup.string().required("Escalation setting is required"),
  otherRequests: yup.string().required("Other requests setting is required"),
  publicKey: yup.string().optional(),
  secretKey: yup.string().optional(),
  webhookUrl: yup.string().url("Invalid URL").optional(),
});

// ------------------------------------------------
// Component
// ------------------------------------------------
const SettingsComponent = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SettingsFormData>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [inAppNotifications, setInAppNotifications] = useState(false);
  const [isTestingHealth, setIsTestingHealth] = useState(false);

  const onSubmit = async (data: SettingsFormData) => {
    try {
      const settingsData = {
        ...data,
        emailNotifications,
        inAppNotifications,
      };

      console.log("Settings data:", settingsData);

      // Replace with your actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Settings saved successfully!");
    } catch (err: any) {
      toast.error("Failed to save settings");
    }
  };

  const handleHealthCheck = async () => {
    setIsTestingHealth(true);
    try {
      // Replace with your actual health check API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Health check passed!");
    } catch (err) {
      toast.error("Health check failed!");
    } finally {
      setIsTestingHealth(false);
    }
  };

  const handleCancel = () => {
    toast.info("Changes cancelled");
  };

  // Options
  const approvalModeOptions = [
    { label: "Manual", value: "manual" },
    { label: "Automatic", value: "automatic" },
  ];

  const invoiceDeadlineOptions = [
    { label: "14", value: "14" },
    { label: "7", value: "7" },
    { label: "21", value: "21" },
    { label: "30", value: "30" },
  ];

  const escalationOptions = [
    { label: "Super Admin", value: "super_admin" },
    { label: "Admin", value: "admin" },
    { label: "Manager", value: "manager" },
  ];

  return (
    <div className="w-full bg-white p-8 rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        {/* Campaigns and Magazines Management */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Campaigns and Magazines Management
          </h2>
          <div className="space-y-4">
            <Select
              label="Approval Mode"
              name="approvalMode"
              options={approvalModeOptions}
              control={control}
              error={errors?.approvalMode?.message}
              placeholder="Manual"
            />

            <Input
              label="Pause Campaign"
              placeholder="Campaigns above 1 month"
              register={register("pauseCampaign")}
              error={errors.pauseCampaign}
            />

            <Select
              label="Invoice Payment Deadline Period (days)"
              name="invoiceDeadline"
              options={invoiceDeadlineOptions}
              control={control}
              error={errors?.invoiceDeadline?.message}
              placeholder="14"
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Total Printed Copies per Edition"
                placeholder="Edition Title"
                register={register("editionTitle")}
                error={errors.editionTitle}
              />
              <Input
                label=" "
                placeholder="No. of Copies"
                register={register("copiesCount")}
                error={errors.copiesCount}
              />
            </div>
          </div>
        </section>

        {/* Notifications & Alerts */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Notifications & Alerts
          </h2>
          
          {/* Channels */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Channels
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-gray-900">Email</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inAppNotifications}
                  onChange={(e) => setInAppNotifications(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-gray-900">In-App</span>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <Select
              label="Escalation (Unpaid Invoice)"
              name="escalationUnpaid"
              options={escalationOptions}
              control={control}
              error={errors?.escalationUnpaid?.message}
              placeholder="Super Admin"
            />

            <Select
              label="Escalation: Webhook failure"
              name="escalationWebhook"
              options={escalationOptions}
              control={control}
              error={errors?.escalationWebhook?.message}
              placeholder="Super Admin"
            />

            <Select
              label="Other Requests"
              name="otherRequests"
              options={escalationOptions}
              control={control}
              error={errors?.otherRequests?.message}
              placeholder="Super Admin"
            />
          </div>
        </section>

        {/* API & Integrations */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            API & Integrations
          </h2>
          <div className="space-y-4">
            <Input
              label="Public Key"
              placeholder=""
              register={register("publicKey")}
              error={errors.publicKey}
            />

            <Input
              label="Secret Key"
              type="password"
              placeholder=""
              register={register("secretKey")}
              error={errors.secretKey}
            />

            <Input
              label="Webhook URL"
              placeholder=""
              register={register("webhookUrl")}
              error={errors.webhookUrl}
            />

            {/* Health Check */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Health Check
              </label>
              <button
                type="button"
                onClick={handleHealthCheck}
                disabled={isTestingHealth}
                className="w-full bg-blue-50 text-blue-600 py-3 rounded-lg font-medium hover:bg-blue-100 transition-colors disabled:opacity-50"
              >
                {isTestingHealth ? "Testing..." : "Run Test"}
              </button>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6">
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
            className="!w-auto px-12 bg-white text-[#336AEA] rounded-lg font-medium hover:bg-gray-50 transition-colors"
            handleClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SettingsComponent;