// ================================================
// REUSABLE SWITCH COMPONENT
// ================================================
"use client";

import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface SwitchProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  disabled?: boolean;
}

export const Switch = <T extends FieldValues>({
  name,
  control,
  disabled = false,
}: SwitchProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={field.value}
            onChange={field.onChange}
            disabled={disabled}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      )}
    />
  );
};

// ================================================
// ROLES & PERMISSIONS TAB COMPONENT
// ================================================

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Input from "@/components/input/input";
import Select from "@/components/input/select";
import Button from "@/components/button";
import { FaUser } from "react-icons/fa";
import { MdClose } from "react-icons/md";

// ------------------------------------------------
// Types
// ------------------------------------------------
interface AdminMember {
  id: string;
  name: string;
  email: string;
  role: string;
  subRoles?: string[];
}

interface PermissionsForm {
  email: string;
  role: string;
  // Transaction Permissions
  campaignManagement: boolean;
  invoicePayments: boolean;
  driverPayouts: boolean;
  magazineManagement: boolean;
  // User Permissions
  adminUsers: boolean;
  drivers: boolean;
  advertisers: boolean;
}

// ------------------------------------------------
// Component
// ------------------------------------------------
const RolesPermissionsTab = () => {
  const [adminMembers, setAdminMembers] = useState<AdminMember[]>([
    {
      id: "1",
      name: "John Doe Parkins",
      email: "johndoeparkins@gmail.com",
      role: "Admin",
    },
    {
      id: "2",
      name: "John Doe Parkins",
      email: "johndoeparkins@gmail.com",
      role: "Admin",
      subRoles: ["Admin 1", "Admin 2", "Admin 3"],
    },
    {
      id: "3",
      name: "John Doe Parkins",
      email: "johndoeparkins@gmail.com",
      role: "Admin",
    },
  ]);

  const [activeTab, setActiveTab] = useState<"super" | "other">("super");

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PermissionsForm>({
    defaultValues: {
      email: "",
      role: "",
      campaignManagement: true,
      invoicePayments: false,
      driverPayouts: true,
      magazineManagement: true,
      adminUsers: true,
      drivers: false,
      advertisers: true,
    },
  });

  const handleRemoveMember = (id: string) => {
    setAdminMembers((prev) => prev.filter((member) => member.id !== id));
    toast.success("Admin removed successfully");
  };

  const onSubmit = (data: PermissionsForm) => {
    console.log("Permissions data:", data);
    toast.success("Changes saved successfully!");
  };

  const handleCancel = () => {
    reset();
    toast.info("Changes cancelled");
  };

  const roleOptions = [
    { label: "Super Admin", value: "super_admin" },
    { label: "Admin 1", value: "admin_1" },
    { label: "Admin 2", value: "admin_2" },
  ];

  const transactionPermissions = [
    { name: "campaignManagement" as const, label: "Campaign Management" },
    { name: "invoicePayments" as const, label: "Invoice & Payments" },
    { name: "driverPayouts" as const, label: "Driver Payouts" },
    { name: "magazineManagement" as const, label: "Magazine Management" },
  ];

  const userPermissions = [
    { name: "adminUsers" as const, label: "Admin Users" },
    { name: "drivers" as const, label: "Drivers" },
    { name: "advertisers" as const, label: "Advertisers" },
  ];

  return (
    <div className="w-full  space-y-10">
      {/* Admin Members Section */}
      <section className="bg-white p-10 rounded-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Admin Members</h2>
        <div className="space-y-4">
          {adminMembers.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between gap-4 pb-4 border-b border-gray-200 last:border-0"
            >
              {/* Left: Avatar and Info */}
              <div className="flex items-center gap-3 flex-1">
                <div className="h-12 w-12 rounded-full bg-[#2C4C9C] flex items-center justify-center text-white font-semibold flex-shrink-0">
                  <FaUser size={20} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.email}</p>
                </div>
              </div>

              {/* Middle: Role Dropdown */}
              <div className="relative">
                <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer appearance-none pr-10 bg-white">
                  <option>{member.role}</option>
                  {member.subRoles?.map((subRole, index) => (
                    <option key={index}>{subRole}</option>
                  ))}
                </select>
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {/* Right: Remove Button */}
              <button
                onClick={() => handleRemoveMember(member.id)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                Remove
                <MdClose size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Add New Admin Section */}
      <section className="bg-white p-10 rounded-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Add New Admin</h2>
        <form className="space-y-4">
          <Input
            label="Email Address"
            placeholder="admin@mail.com"
            register={register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            error={errors.email}
          />

          <Select
            label="Assign Role"
            name="role"
            options={roleOptions}
            control={control}
            placeholder="Super Admin, Admin 1, Admin 2"
          />
        </form>
      </section>

      {/* Permissions Section */}
      <section className="bg-white p-10 rounded-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Permissions</h2>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("super")}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "super"
                ? "bg-[#2C4C9C] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Super Admin
          </button>
          <button
            onClick={() => setActiveTab("other")}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "other"
                ? "bg-[#2C4C9C] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Other Admins
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Transaction Permissions */}
          <div className="mb-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">
              Transaction Permissions
            </h3>
            <div className="space-y-3">
              {transactionPermissions.map((permission) => (
                <div
                  key={permission.name}
                  className="flex items-center justify-between py-2"
                >
                  <span className="text-gray-900">{permission.label}</span>
                  <Switch name={permission.name} control={control} />
                </div>
              ))}
            </div>
          </div>

          {/* User Permissions */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-4">
              User Permissions
            </h3>
            <div className="space-y-3">
              {userPermissions.map((permission) => (
                <div
                  key={permission.name}
                  className="flex items-center justify-between py-2"
                >
                  <span className="text-gray-900">{permission.label}</span>
                  <Switch name={permission.name} control={control} />
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
         
        </form>
      </section>

       <div className="flex justify-end gap-4">
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
    </div>
  );
};

export default RolesPermissionsTab;