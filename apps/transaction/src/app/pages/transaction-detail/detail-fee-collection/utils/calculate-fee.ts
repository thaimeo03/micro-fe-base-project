const VAT = 10;

export function calculateFee(
  mainCardFeeValue: number | null | undefined,
  subCardFeeValue: number | null | undefined,
  addressFeeValue: number | null | undefined,
) {
  if (
    typeof mainCardFeeValue === 'number' &&
    typeof subCardFeeValue === 'number' &&
    typeof addressFeeValue === 'number'
  ) {
    const totalFee = calculateTotalFee(
      mainCardFeeValue,
      subCardFeeValue,
      addressFeeValue,
    );
    const VATFee = calculateVATFee(totalFee);
    const revenueFee = calculateRevenueFee(totalFee, VATFee);

    return {
      totalFee,
      VATFee,
      revenueFee,
    };
  } else {
    return {
      totalFee: 0,
      VATFee: 0,
      revenueFee: 0,
    };
  }
}

function calculateTotalFee(
  mainCardFeeValue: number,
  subCardFeeValue: number,
  addressFeeValue: number,
) {
  return mainCardFeeValue + subCardFeeValue + addressFeeValue;
}

function calculateVATFee(totalFee: number) {
  return totalFee * (VAT / 100);
}

function calculateRevenueFee(totalFee: number, VATFee: number) {
  return totalFee + VATFee;
}
