import axios from 'axios';
import * as mockData from './mockData';

// For testing purposes, we use a mock API instead of a real one
const API = {
    get: async (url) => {
        console.log(`Mock GET: ${url}`);
        if (url.includes('/reports/dashboard')) return { data: { dashboard: mockData.MOCK_DASHBOARD_DATA } };
        if (url.includes('/students')) {
            if (url.match(/\/students\/\w+$/)) return { data: { student: mockData.MOCK_STUDENTS[0] } };
            return { data: { students: mockData.MOCK_STUDENTS } };
        }
        if (url.includes('/staff')) {
            if (url.match(/\/staff\/\w+$/)) return { data: { staff: mockData.MOCK_STAFF[0] } };
            if (url.includes('/salaries')) return { data: { salaryPayments: [{ slipNo: 'SL-001', month: 'Jan 2024', amount: 30000, paymentDate: new Date(), paymentMode: 'bank' }] } };
            return { data: { staff: mockData.MOCK_STAFF } };
        }
        if (url.includes('/settings')) return { data: { settings: { schoolName: 'Oxford School Mock' } } };
        if (url.includes('/auth/me')) return { data: { user: { name: 'Mock Admin', role: 'owner' } } };
        return { data: {} };
    },
    post: async (url, data) => {
        console.log(`Mock POST: ${url}`, data);
        return { data: { success: true } };
    },
    put: async (url, data) => {
        console.log(`Mock PUT: ${url}`, data);
        return { data: { success: true } };
    },
    delete: async (url) => {
        console.log(`Mock DELETE: ${url}`);
        return { data: { success: true } };
    },
    patch: async (url, data) => {
        console.log(`Mock PATCH: ${url}`, data);
        return { data: { success: true } };
    },
    // Add other axios-like properties if needed
    interceptors: {
        request: { use: () => { } },
        response: { use: () => { } }
    },
    defaults: { headers: { common: {} } }
};

export default API;

