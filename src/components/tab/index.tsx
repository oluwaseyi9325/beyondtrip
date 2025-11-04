// // Tabs.tsx
// import { useState } from "react";
// import clsx from "clsx";

// export interface TabItem {
//   title: string;
//   content: React.ReactNode;
// }

// interface TabsProps {
//   tabs: TabItem[];
//   defaultTab?: number;
//   variant?: "default" | "pills" | "underline";
//   className?: string;
// }

// const Tabs = ({ 
//   tabs, 
//   defaultTab = 0, 
//   variant = "default",
//   className 
// }: TabsProps) => {
//   const [activeTab, setActiveTab] = useState(defaultTab);

//   const baseTabStyle = "px-6 py-3 font-medium transition-all duration-300 cursor-pointer";
  
//   const variantStyles = {
//     default: {
//       active: "bg-[#336AEA] text-white rounded-lg",
//       inactive: "bg-transparent text-gray-600 hover:bg-gray-100 rounded-lg"
//     },
//     pills: {
//       active: "bg-[#336AEA] text-white rounded-full",
//       inactive: "bg-transparent text-gray-600 hover:bg-gray-100 rounded-full"
//     },
//     underline: {
//       active: "text-[#336AEA] border-b-2 border-[#336AEA]",
//       inactive: "text-gray-600 border-b-2 border-transparent hover:text-gray-800"
//     }
//   };

//   return (
//     <div className={clsx("w-full", className)}>
//       {/* Tab Headers */}
//       <div className={clsx(
//         "flex items-center gap-2 bg-gray-50 p-2 rounded-lg mb-6",
//         variant === "underline" && "bg-transparent border-b border-gray-200 p-0 rounded-none"
//       )}>
//         {tabs.map((tab, index) => (
//           <button
//             key={index}
//             onClick={() => setActiveTab(index)}
//             className={clsx(
//               baseTabStyle,
//               activeTab === index 
//                 ? variantStyles[variant].active 
//                 : variantStyles[variant].inactive
//             )}
//           >
//             {tab.title}
//           </button>
//         ))}
//       </div>

//       {/* Tab Content */}
//       <div className="w-full">
//         {tabs[activeTab].content}
//       </div>
//     </div>
//   );
// };

// export default Tabs;


// Tabs.tsx
import { useState } from "react";
import clsx from "clsx";

export interface TabItem {
  title: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  defaultTab?: number;
  className?: string;
  activeTab?: number; // optional controlled active tab
  onTabChange?: (index: number) => void; // callback when tab changes
}

const Tabs = ({ 
  tabs, 
  defaultTab = 0,
  className,
  activeTab: controlledActiveTab,
  onTabChange,
}: TabsProps) => {
  const [uncontrolledActiveTab, setUncontrolledActiveTab] = useState(defaultTab);
  const activeTab = controlledActiveTab ?? uncontrolledActiveTab;
  const setActive = (index: number) => {
    if (onTabChange) onTabChange(index);
    if (controlledActiveTab === undefined) setUncontrolledActiveTab(index);
  };

  return (
    <div className={clsx("w-full", className)}>
      {/* Tab Headers */}
      <div className="flex items-center gap-0 border-b  border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActive(index)}
            className={clsx(
              "px-8 py-3 font-medium text-sm transition-all duration-300 cursor-pointer rounded-t-lg",
              "border-b-2",
              activeTab === index 
                ? "bg-[#2C4C9C] text-white border-[#2C4C9C]" 
                : "bg-transparent text-gray-700 border-transparent hover:bg-gray-50"
            )}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="w-full mt-6">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;
