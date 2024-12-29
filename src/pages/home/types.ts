export type Inputs = {
  mortgageAmount: string;
  mortgageTerm: string;
  interestRate: string;
  mortgageType: "repayment" | "interest-only";
};

export type Results = {
  mortgageType: "repayment" | "interest-only" | null;
  monthlyPayment: Number | null;
  totalPayments: Number | null;
  interestPaid: Number | null;
};
