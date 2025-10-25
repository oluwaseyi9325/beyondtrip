// export const transformCourses = (fees: any) =>
//   Object.entries(fees)
//     .filter(([key]) => key !== "courseName")
//     .map(([key, value]) => {
//       const currency = key.slice(0, 3).toUpperCase();
//       const typeKey = key.slice(3).toLowerCase();
//       const paymentType =
//         typeKey === "appfee" ? "ApplicationFee" : "TuitionFee";

//       return {
//         paymentType,
//         currency,
//         amount: Number(value),
//       };
//     });

export const transformCourses = (fees: any) => {
  const transformedFees: any[] = [];
  
  // Get all currencies
  const currencies = ['NGN', 'UGX', 'KES', 'USD', 'GBP'];
  const feeTypes = ['AppFee', 'TuitionFee'];
  
  currencies.forEach(currency => {
    feeTypes.forEach(feeType => {
      const lowerCurrency = currency.toLowerCase();
      const feeKey = `${lowerCurrency}${feeType}`;
      const feeIdKey = `${lowerCurrency}${feeType}Id`;
      
      if (fees[feeKey] !== undefined) {
        const paymentType = feeType === 'AppFee' ? 'ApplicationFee' : 'TuitionFee';
        
        transformedFees.push({
          paymentType,
          currency: currency.toUpperCase(),
          amount: Number(fees[feeKey]),
          feeId: fees[feeIdKey] || null, // Include the fee ID
        });
      }
    });
  });
  
  return transformedFees;
};

export const transformDate = (dateStr: Date) => {
  const date = new Date(dateStr).toISOString();
  return date;
};

export const transformDateString = (dateStr: string | null) => {
  if (!dateStr) return "-";

  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
};
