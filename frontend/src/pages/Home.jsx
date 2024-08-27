import React from 'react';
import CategoryList from '../components/CategoryList';
import BannerProduct from '../components/BannerProduct';
import HorizontalProductCard from '../components/HorizontalProductCard';
import VerticalProductCard from '../components/VerticalProductCard ';

const Home = () => {
  const horizontalCategories = ["airpods", "watches"];
  const verticalCategories = ["earphones","mobiles" ,"refrigerator" ,"mouse","televisions" ,"speakers" ,"trimmers","processor","printers"]; // Add categories for vertical display

  return (
    <div>
      <CategoryList />
      <BannerProduct />
      
      {/* Horizontal Product Cards */}
      {horizontalCategories.map((category) => (
        <HorizontalProductCard key={category} category={category} />
      ))}
      
      {/* Vertical Product Cards */}
        {verticalCategories.map((category) => (
          <VerticalProductCard key={category} category={category} className="mb-8" />
        ))}

    </div>
  );
};

export default Home;