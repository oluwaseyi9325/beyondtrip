"use client";

import { useState } from "react";
import Modal from "@/components/modal";
import Button from "@/components/button";
import { FaCheck } from "react-icons/fa";

// Plan interface
interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  description?: string;
}

// Upgrade Plan Modal
interface UpgradePlanModalProps {
  open: boolean;
  handleClose: () => void;
  plans: Plan[];
  currentPlanId: string;
  onSelectPlan: (planId: string) => void;
}

const UpgradePlanModal = ({ open, handleClose, plans, currentPlanId, onSelectPlan }: UpgradePlanModalProps) => {
  const [selectedPlan, setSelectedPlan] = useState(currentPlanId);

  const handleContinue = () => {
    onSelectPlan(selectedPlan);
    handleClose();
  };

  return (
    <Modal open={open} handleClose={handleClose} className="w-[600px] p-8">
      <div className="w-full flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Upgrade to a new plan</h2>
        </div>

        {/* Plans List */}
        <div className="space-y-4">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            // const isCurrent = currentPlanId === plan.id;

            return (
              <button
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`w-full text-left rounded-2xl p-6 border-2 transition-all ${
                  isSelected
                    ? "bg-[#2C4C9C] border-[#2C4C9C] text-white"
                    : "bg-white border-gray-300 hover:border-gray-400"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3
                      className={`text-lg font-semibold mb-2 ${
                        isSelected ? "text-white/80" : "text-gray-600"
                      }`}
                    >
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <span
                        className={`text-4xl font-bold ${
                          isSelected ? "text-white" : "text-gray-900"
                        }`}
                      >
                        ₦{plan.price.toLocaleString()}
                      </span>
                      <span
                        className={`text-lg ${
                          isSelected ? "text-white/80" : "text-gray-600"
                        }`}
                      >
                        /{plan.period}
                      </span>
                    </div>
                    {plan.description && (
                      <p
                        className={`text-sm mt-2 ${
                          isSelected ? "text-white/80" : "text-gray-500"
                        }`}
                      >
                        {plan.description}
                      </p>
                    )}
                  </div>

                  {/* Check Badge */}
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      isSelected ? "bg-green-500" : "bg-gray-200"
                    }`}
                  >
                    <FaCheck
                      size={20}
                      className={isSelected ? "text-white" : "text-gray-400"}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Continue Button */}
        <Button
          handleClick={handleContinue}
          className="!w-auto mx-auto px-16 bg-[#336AEA] text-white rounded-lg font-medium hover:bg-[#2952b8] transition-colors"
        >
          Continue to Pay
        </Button>
      </div>
    </Modal>
  );
};

// Main Pricing Component
const Pricing = () => {
  const [showUpgradePlan, setShowUpgradePlan] = useState(false);

  // Sample plans data
  const plans: Plan[] = [
    {
      id: "essentials",
      name: "Essentials Plan",
      price: 4000,
      period: "edition",
    },
    {
      id: "growth",
      name: "Growth Plan",
      price: 3500,
      period: "edition",
      description: "3-months minimum",
    },
    {
      id: "impact",
      name: "Impact Plan",
      price: 5000,
      period: "edition",
    },
  ];

  const [currentPlanId, setCurrentPlanId] = useState("essentials");
  const currentPlan = plans.find((p) => p.id === currentPlanId) || plans[0];

  const handleSelectPlan = (planId: string) => {
    setCurrentPlanId(planId);
    // Add your payment logic here
    console.log("Selected plan:", planId);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Current Plan Display */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Your Current Plan</h2>
          <button
            onClick={() => setShowUpgradePlan(true)}
            className="text-blue-600 hover:underline text-sm font-medium flex items-center gap-1"
          >
            Change plan
            <span className="text-lg">›</span>
          </button>
        </div>

        {/* Current Plan Card */}
        <div className="bg-[#2C4C9C] rounded-2xl p-8 text-white relative max-w-md">
          {/* Green Check Badge */}
          <div className="absolute top-6 right-6">
            <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center">
              <FaCheck size={20} className="text-white" />
            </div>
          </div>

          <h3 className="text-xl font-semibold text-white/80 mb-4">
            {currentPlan.name}
          </h3>
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-bold">₦{currentPlan.price.toLocaleString()}</span>
            <span className="text-xl text-white/80">/{currentPlan.period}</span>
          </div>
          {currentPlan.description && (
            <p className="text-sm text-white/80 mt-4">{currentPlan.description}</p>
          )}
        </div>
      </div>

      {/* Upgrade Plan Modal */}
      <UpgradePlanModal
        open={showUpgradePlan}
        handleClose={() => setShowUpgradePlan(false)}
        plans={plans}
        currentPlanId={currentPlanId}
        onSelectPlan={handleSelectPlan}
      />
    </div>
  );
};

export default Pricing;