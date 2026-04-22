import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import api from '../api/axiosInstance'
import type { Product } from '../types/product.types';

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // 서버에서 상품 목록을 가져오는 API 호출
        try{
            const response = api.get<Product>("/api/product")
            
        }catch(err){
            console.error(err)
        }
    }, []);

    return (
        <div className="home-container">
            {/* <div className="product-grid">
                {products.map(product => (
                    <ProductCard product/>
                ))}
            </div>   */}
        </div>
    );
};

export default Home;