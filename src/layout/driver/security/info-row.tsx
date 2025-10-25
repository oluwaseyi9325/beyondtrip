interface InfoRowProps {
    label: string
    value: string
  }
  
  export function InfoRow({ label, value }: InfoRowProps) {
    return (
      <div className="flex justify-between items-center py-2">
        <span className="text-[#5E5E5E] text-sm">{label}</span>
        <span className="text-[#5E5E5E] font-medium">{value}</span>
      </div>
    )
  }
  