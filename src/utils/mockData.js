export const MOCK_DASHBOARD_DATA = {
    totalStudents: 150,
    totalStaff: 25,
    totalFeesCollected: 750000,
    totalFeesPending: 250000,
    totalSalaryPaid: 350000,
    libraryCollected: 15000,
    libraryPending: 5000,
    classWise: {
        '1st': { collected: 50000, pending: 10000, count: 15 },
        '2nd': { collected: 45000, pending: 15000, count: 12 },
        '3rd': { collected: 60000, pending: 5000, count: 18 },
    },
    monthlyCollections: {
        'Jan': 100000,
        'Feb': 120000,
        'Mar': 90000,
    },
    monthlySalaryPaid: {
        'Jan': 50000,
        'Feb': 50000,
        'Mar': 50000,
    },
    recentPayments: [
        { receiptNo: 'RE-001', studentName: 'Alex Johnson', class: '1st', amount: 5000, paymentMode: 'cash', paymentDate: new Date() },
        { receiptNo: 'RE-002', studentName: 'Sam Smith', class: '2nd', amount: 3000, paymentMode: 'online', paymentDate: new Date() },
    ]
};

export const MOCK_STUDENTS = [
    { _id: '1', name: 'Alex Johnson', class: '1st', rollNo: '101', fatherName: 'John', phone: '1234567890', totalFees: 10000, feesPaid: 5000 },
    { _id: '2', name: 'Sam Smith', class: '2nd', rollNo: '201', fatherName: 'Tom', phone: '0987654321', totalFees: 10000, feesPaid: 7000 },
];

export const MOCK_STAFF = [
    { _id: '1', name: 'Mrs. Davis', role: 'Teacher', email: 'davis@example.com', phone: '1112223333', salary: 30000 },
    { _id: '2', name: 'Mr. Wilson', role: 'Admin', email: 'wilson@example.com', phone: '4445556666', salary: 35000 },
];
