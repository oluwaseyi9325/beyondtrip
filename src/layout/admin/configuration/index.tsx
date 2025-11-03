"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import Input from "@/components/input/input";
import Select from "@/components/input/select";
import Button from "@/components/button";
import Checkbox from "@/components/input/checkbox";

// ------------------------------------------------
// Types
// ------------------------------------------------
interface SystemConfigForm {
  approvalMode: string;
  pauseCampaign: string;
  invoiceDeadline: string;
  editionTitle: string;
  copiesCount: string;
  // Notifications
  emailNotifications: boolean;
  inAppNotifications: boolean;
  escalationUnpaid: string;
  escalationWebhook: string;
  otherRequests: string;
  // API
  publicKey: string;
  secretKey: string;
  webhookUrl: string;
}

// ------------------------------------------------
// Validation Schema
// ------------------------------------------------
const schema = yup.object().shape({
  approvalMode: yup.string().required("Approval mode is required"),
  pauseCampaign: yup.string().required("Pause campaign is required"),
  invoiceDeadline: yup.string().required("Invoice deadline is required"),
  editionTitle: yup.string().required("Edition title is required"),
  copiesCount: yup.string().required("Number of copies is required"),
  escalationUnpaid: yup.string().required("Escalation is required"),
  escalationWebhook: yup.string().required("Escalation is required"),
  otherRequests: yup.string().required("Other requests is required"),
  publicKey: yup.string().optional(),
  secretKey: yup.string().optional(),
  webhookUrl: yup.string().url("Invalid URL").optional(),
});

// ------------------------------------------------
// Component
// ------------------------------------------------
const SystemConfigurationTab = () => {
  const [isTestingHealth, setIsTestingHealth] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SystemConfigForm>({
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues: {
      approvalMode: "",
      pauseCampaign: "Campaigns above 1 month",
      invoiceDeadline: "",
      editionTitle: "",
      copiesCount: "",
      emailNotifications: true,
      inAppNotifications: true,
      escalationUnpaid: "",
      escalationWebhook: "",
      otherRequests: "",
      publicKey: "",
      secretKey: "",
      webhookUrl: "",
    },
  });

  const onSubmit = (data: SystemConfigForm) => {
    console.log("System configuration:", data);
    toast.success("System configuration saved successfully!");
  };

  const handleCancel = () => {
    reset();
    toast.info("Changes cancelled");
  };

  const handleHealthCheck = async () => {
    setIsTestingHealth(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Health check passed!");
    } catch (err) {
      toast.error("Health check failed!");
    } finally {
      setIsTestingHealth(false);
    }
  };

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
    <div className="w-full ">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        {/* Campaigns and Magazines Management */}
        <section className="bg-white p-10 rounded-lg">
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Printed Copies per Edition
              </label>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Edition Title"
                  register={register("editionTitle")}
                  error={errors.editionTitle}
                />
                <Input
                  placeholder="No. of Copies"
                  register={register("copiesCount")}
                  error={errors.copiesCount}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Notifications & Alerts */}
        <section className="bg-white p-10 rounded-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Notifications & Alerts
          </h2>

          {/* Channels */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Channels
            </label>
            <div className="flex gap-6">
              <Checkbox
                name="emailNotifications"
                label="Email"
                control={control}
              />
              <Checkbox
                name="inAppNotifications"
                label="In-App"
                control={control}
              />
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
        <section className="bg-white p-10 rounded-lg">
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
        <div className="flex  justify-end gap-4">
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

export default SystemConfigurationTab;