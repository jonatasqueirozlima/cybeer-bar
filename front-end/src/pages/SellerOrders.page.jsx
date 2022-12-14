import React, { useState, useEffect } from 'react';
import Navbar from '../components/NavBar';
import OrderCard from '../components/OrderCard';
import CyBeerBarAPI from '../services/CyBeerBarAPI.service';

function SellerOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    new CyBeerBarAPI().getOrders()
      .then((data) => setOrders(data));
  }, []);

  return (
    <section>
      <Navbar />
      { orders?.map((order) => (
        <OrderCard key={ order.id } order={ order } />
      )) }
    </section>
  );
}

export default SellerOrders;
