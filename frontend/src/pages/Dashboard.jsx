// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { Line, Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
// import { FaUsers, FaShoppingCart, FaMoneyBillWave, FaChartLine } from 'react-icons/fa';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

// const Dashboard = () => {
//   const [salesData, setSalesData] = useState({});
//   const [categoryData, setCategoryData] = useState({});

//   useEffect(() => {
//     // Simulated data fetch
//     setTimeout(() => {
//       setSalesData({
//         labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//         datasets: [{
//           label: 'Sales',
//           data: [12, 19, 3, 5, 2, 3],
//           borderColor: 'rgb(75, 192, 192)',
//           tension: 0.1
//         }]
//       });

//       setCategoryData({
//         labels: ['Electronics', 'Clothing', 'Books', 'Home & Kitchen'],
//         datasets: [{
//           data: [300, 50, 100, 200],
//           backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
//           hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
//         }]
//       });
//     }, 1000);
//   }, []);

//   const StatCard = ({ icon, title, value, color }) => (
//     <motion.div 
//       className={`bg-white p-6 rounded-lg shadow-lg ${color}`}
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//     >
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm text-gray-500 uppercase">{title}</p>
//           <p className="text-3xl font-bold">{value}</p>
//         </div>
//         <div className={`text-4xl ${color.includes('green') ? 'text-green-500' : 'text-blue-500'}`}>
//           {icon}
//         </div>
//       </div>
//     </motion.div>
//   );

//   return (
//     <div className="p-6 bg-mint-100 min-h-screen">
//       <motion.h1 
//         className="text-3xl font-bold text-gray-800 mb-6"
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         Dashboard
//       </motion.h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//         <StatCard icon={<FaUsers />} title="Total Users" value="1,234" color="border-l-4 border-blue-500" />
//         <StatCard icon={<FaShoppingCart />} title="Orders" value="56" color="border-l-4 border-green-500" />
//         <StatCard icon={<FaMoneyBillWave />} title="Revenue" value="$9,876" color="border-l-4 border-yellow-500" />
//         <StatCard icon={<FaChartLine />} title="Growth" value="12%" color="border-l-4 border-red-500" />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <motion.div 
//           className="bg-white p-6 rounded-lg shadow-lg"
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//         >
//           <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
//           {salesData.labels && <Line data={salesData} />}
//         </motion.div>

//         <motion.div 
//           className="bg-white p-6 rounded-lg shadow-lg"
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//         >
//           <h2 className="text-xl font-semibold mb-4">Category Distribution</h2>
//           {categoryData.labels && <Pie data={categoryData} />}
//         </motion.div>
//       </div>
//     </div>
//   );
// };
// export default Dashboard;


import React from 'react'

const Dashboard = () => {
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard