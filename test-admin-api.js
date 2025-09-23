// Admin API Test Script
// Test the admin authentication and endpoints

const axios = require('axios');

const BASE_URL = 'https://crypto-pay-api-server.onrender.com';
const ADMIN_CREDENTIALS = {
  email: 'vaibhav.admin@gmail.com',
  password: 'Vaibhav1234'
};

let adminToken = null;

async function testAdminAPI() {
  console.log('🔐 Testing Admin API Authentication...\n');

  try {
    // Test 1: Admin Login
    console.log('1️⃣ Testing Admin Login...');
    const loginResponse = await axios.post(`${BASE_URL}/api/admin/login`, ADMIN_CREDENTIALS);
    
    if (loginResponse.data.success) {
      adminToken = loginResponse.data.admin.token;
      console.log('✅ Admin login successful!');
      console.log('📋 Admin Token:', adminToken);
      console.log('👤 Admin UID:', loginResponse.data.admin.uid);
    } else {
      throw new Error('Login failed');
    }

    // Test 2: Get Admin Stats
    console.log('\n2️⃣ Testing Admin Stats...');
    const statsResponse = await axios.get(`${BASE_URL}/api/admin/stats`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    
    if (statsResponse.data.success) {
      console.log('✅ Admin stats retrieved!');
      console.log('📊 Stats:', JSON.stringify(statsResponse.data.stats, null, 2));
    }

    // Test 3: Get Pending Withdrawals
    console.log('\n3️⃣ Testing Pending Withdrawals...');
    const withdrawalsResponse = await axios.get(`${BASE_URL}/api/admin/withdrawals`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    
    if (withdrawalsResponse.data.success) {
      console.log('✅ Pending withdrawals retrieved!');
      console.log('📋 Withdrawals Count:', withdrawalsResponse.data.count);
    }

    // Test 4: Get All Users
    console.log('\n4️⃣ Testing Users List...');
    const usersResponse = await axios.get(`${BASE_URL}/api/admin/users`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    
    if (usersResponse.data.success) {
      console.log('✅ Users list retrieved!');
      console.log('👥 Users Count:', usersResponse.data.count);
    }

    // Test 5: Get All Transactions
    console.log('\n5️⃣ Testing Transactions List...');
    const transactionsResponse = await axios.get(`${BASE_URL}/api/admin/transactions`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    
    if (transactionsResponse.data.success) {
      console.log('✅ Transactions list retrieved!');
      console.log('💳 Transactions Count:', transactionsResponse.data.count);
    }

    console.log('\n🎉 All Admin API tests passed successfully!');
    console.log('\n📋 Available Admin Endpoints:');
    console.log('   POST /api/admin/login - Admin login');
    console.log('   GET  /api/admin/stats - Admin dashboard stats');
    console.log('   GET  /api/admin/withdrawals - Pending withdrawals');
    console.log('   GET  /api/admin/users - All users');
    console.log('   GET  /api/admin/transactions - All transactions');
    console.log('   POST /api/admin/withdrawals/:id/execute - Execute withdrawal');
    console.log('   POST /api/admin/withdrawals/:id/reject - Reject withdrawal');

  } catch (error) {
    console.error('❌ Admin API test failed:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      console.log('\n🔐 Authentication failed. Check admin credentials.');
    } else if (error.response?.status === 404) {
      console.log('\n🔍 Endpoint not found. Check server deployment.');
    } else {
      console.log('\n🚨 Server error. Check server logs.');
    }
  }
}

// Run the test
testAdminAPI();
