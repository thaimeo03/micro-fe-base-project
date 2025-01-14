export const mainCardData = {
  typeCard: [
    { label: 'Thẻ ghi nợ quốc tế', value: 1 },
    { label: 'Thẻ ghi nợ nội địa', value: 2 },
    { label: 'Thẻ Prepaid', value: 3 },
  ],
  productCode: [
    { label: 'PVC0066 - VS Credit Infinite', value: 1 },
    { label: 'PVC0088 - VS Credit Infinite Private Banking', value: 2 },
    { label: 'PVC0051 - VS Credit Platinum online cashback 360', value: 3 },
    { label: 'PVC0052 - VS Credit Platinum OL cashback Online', value: 4 },
    { label: 'PVC0042 - VS Credit Platinum cashback Online', value: 5 },
  ],
  cardCusGr: [
    { label: '010-VIP', value: 1 },
    { label: '031-KHCC PRIVATE', value: 2 },
    { label: '033-KHCC PREMIER ELITE', value: 3 },
    { label: '045-KH TAP DOAN THANH CONG', value: 4 },
    { label: '051-KH CHUYEN TIEN QUOC TE', value: 5 },
  ],
  mainAcc: [
    { label: '1234567891 - VND', value: 1 },
    { label: '1234567891 - EUR', value: 2 },
    { label: '1234567891 - USD', value: 3 },
    { label: '1234567891 - GBP', value: 4 },
  ],
  questions: [
    { label: 'Họ tên mẹ?', value: 1 },
    { label: 'Tên trường tiếu học?', value: 2 },
  ],
  annualFees: [
    { label: 'Thu phí thường niên', value: 1 },
    { label: 'Không thu phí thường niên', value: 2 },
  ],
  subAccs: [
    { label: '1234567891 - VND', value: 1 },
    { label: '1234567891 - EUR', value: 2 },
    { label: '1234567891 - USD', value: 3 },
    { label: '1234567891 - GBP', value: 4 },
  ],
  staffId: [
    { label: '178702 - Nguyễn Huy Quân', value: 1 },
    { label: '178888 - Lê Văn Tùng', value: 2 },
  ],
  cardForm: ['Thẻ vật lý', 'Thẻ phi vật lý'],
};

export const subCardItemData = {
  productCode: [
    { label: 'PVC0066 - VS Credit Infinite', value: 1 },
    { label: 'PVC0088 - VS Credit Infinite Private Banking', value: 2 },
    { label: 'PVC0051 - VS Credit Platinum online cashback 360', value: 3 },
    { label: 'PVC0052 - VS Credit Platinum OL cashback Online', value: 4 },
    { label: 'PVC0042 - VS Credit Platinum cashback Online', value: 5 },
  ],
  cardCusGr: [
    { label: '010-VIP', value: 1 },
    { label: '031-KHCC PRIVATE', value: 2 },
    { label: '033-KHCC PREMIER ELITE', value: 3 },
    { label: '045-KH TAP DOAN THANH CONG', value: 4 },
    { label: '051-KH CHUYEN TIEN QUOC TE', value: 5 },
  ],
  typeCard: [
    { label: 'Thẻ ghi nợ quốc tế', value: 1 },
    { label: 'Thẻ ghi nợ nội địa', value: 2 },
    { label: 'Thẻ Prepaid', value: 3 },
  ],
  mainAcc: [
    { label: '1234567891 - VND', value: 1 },
    { label: '1234567891 - EUR', value: 2 },
    { label: '1234567891 - USD', value: 3 },
    { label: '1234567891 - GBP', value: 4 },
  ],
  questions: [
    { label: 'Họ tên mẹ?', value: 1 },
    { label: 'Tên trường tiếu học?', value: 2 },
  ],
  annualFees: [
    { label: 'Thu phí thường niên', value: 1 },
    { label: 'Không thu phí thường niên', value: 2 },
  ],
  subAccs: [
    { label: '1234567891 - VND', value: 1 },
    { label: '1234567891 - EUR', value: 2 },
    { label: '1234567891 - USD', value: 3 },
    { label: '1234567891 - GBP', value: 4 },
  ],
  staffId: [
    { label: '178702 - Nguyễn Huy Quân', value: 1 },
    { label: '178888 - Lê Văn Tùng', value: 2 },
  ],
  numberCard: [
    { label: '1234567890', value: 1 },
    { label: '1122334455', value: 2 },
  ],
  cardForm: ['Thẻ vật lý', 'Thẻ phi vật lý'],
};

export const mainCardInit = {
  cardType: mainCardData.typeCard[0],
  productCode: mainCardData.productCode[0],
  name: '',
  cardCusGr: null,
  mainAcc: null,
  question: mainCardData.questions[0],
  answer: '',
  cardForm: mainCardData.cardForm[0],
  printPin: false,
  annualFees: mainCardData.annualFees[0],
  subAcc: null,
  staffId: mainCardData.staffId[0],
};

export const subCardInit = {
  cifNumber: '',
  name: '',
  mainAcc: null,
  question: null,
  cardType: subCardItemData.cardForm[0],
  printPin: false,
  subAcc: null,
  answer: null,
};
