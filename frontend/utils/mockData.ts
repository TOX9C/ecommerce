// Mock data for standalone frontend deployment
// This allows the app to work without a backend server

export interface MockProduct {
    id: number;
    name: string;
    price: number;
    category: string;
    description: string;
    stock: number;
    created_at: string;
    ProductImages: { url: string }[];
}

export interface MockUser {
    id: number;
    username: string;
    email: string;
    password: string; // Plain text for demo purposes only
    role: 'user' | 'admin';
}

export interface MockOrderItem {
    productId: number;
    quantity: number;
    price: number;
    productName: string;
}

export interface MockOrder {
    id: number;
    userId: number;
    items: MockOrderItem[];
    totalAmount: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    created_at: string;
}

// Mock users for demo/login
export const mockUsers: MockUser[] = [
    {
        id: 1,
        username: 'Demo User',
        email: 'user@demo.com',
        password: 'password',
        role: 'user'
    },
    {
        id: 2,
        username: 'Admin User',
        email: 'admin@demo.com',
        password: 'admin123',
        role: 'admin'
    }
];

// Mock products with realistic data
export const mockProducts: MockProduct[] = [
    {
        id: 1,
        name: 'Wireless Bluetooth Headphones',
        price: 89.99,
        category: 'Electronics',
        description: 'Premium wireless headphones with active noise cancellation, 30-hour battery life, and superior sound quality.',
        stock: 50,
        created_at: new Date('2024-01-15').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop' },
            { url: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 2,
        name: 'Smart Fitness Watch',
        price: 199.99,
        category: 'Electronics',
        description: 'Track your fitness goals with heart rate monitoring, GPS, sleep tracking, and 7-day battery life.',
        stock: 35,
        created_at: new Date('2024-01-20').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 3,
        name: 'Minimalist Leather Wallet',
        price: 45.00,
        category: 'Accessories',
        description: 'Handcrafted genuine leather wallet with RFID blocking technology. Slim design fits comfortably in your pocket.',
        stock: 100,
        created_at: new Date('2024-02-01').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 4,
        name: 'Organic Cotton T-Shirt',
        price: 29.99,
        category: 'Clothing',
        description: '100% organic cotton, pre-shrunk, tagless for comfort. Available in multiple colors. Eco-friendly and sustainable.',
        stock: 200,
        created_at: new Date('2024-02-05').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 5,
        name: 'Stainless Steel Water Bottle',
        price: 24.99,
        category: 'Home & Kitchen',
        description: 'Keeps drinks cold for 24 hours or hot for 12 hours. BPA-free, leak-proof, and dishwasher safe.',
        stock: 150,
        created_at: new Date('2024-02-10').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 6,
        name: 'Yoga Mat Pro',
        price: 49.99,
        category: 'Sports & Fitness',
        description: 'Extra thick (6mm) non-slip yoga mat with carrying strap. Perfect for yoga, pilates, and floor exercises.',
        stock: 75,
        created_at: new Date('2024-02-12').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 7,
        name: 'Portable Phone Charger 20000mAh',
        price: 39.99,
        category: 'Electronics',
        description: 'High-capacity power bank with dual USB ports and fast charging. Charge your devices multiple times on the go.',
        stock: 120,
        created_at: new Date('2024-02-15').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 8,
        name: 'Ceramic Coffee Mug Set',
        price: 34.99,
        category: 'Home & Kitchen',
        description: 'Set of 4 handcrafted ceramic mugs. Microwave and dishwasher safe. Each holds 12oz of your favorite beverage.',
        stock: 60,
        created_at: new Date('2024-02-18').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 9,
        name: 'Running Shoes - Performance',
        price: 129.99,
        category: 'Sports & Fitness',
        description: 'Lightweight running shoes with responsive cushioning and breathable mesh upper. Perfect for long distance runs.',
        stock: 45,
        created_at: new Date('2024-02-20').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 10,
        name: 'Desk Lamp LED',
        price: 59.99,
        category: 'Home & Kitchen',
        description: 'Adjustable LED desk lamp with touch controls, 3 color modes, and 10 brightness levels. USB charging port included.',
        stock: 80,
        created_at: new Date('2024-02-22').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 11,
        name: 'Backpack - Travel Edition',
        price: 79.99,
        category: 'Accessories',
        description: 'Durable travel backpack with laptop compartment, USB charging port, and water-resistant material.',
        stock: 55,
        created_at: new Date('2024-02-25').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 12,
        name: 'Sunglasses - Polarized',
        price: 89.00,
        category: 'Accessories',
        description: 'UV400 protection polarized sunglasses with lightweight frame. Includes cleaning cloth and hard case.',
        stock: 95,
        created_at: new Date('2024-02-28').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 13,
        name: 'Bamboo Cutting Board Set',
        price: 44.99,
        category: 'Home & Kitchen',
        description: 'Set of 3 eco-friendly bamboo cutting boards in different sizes. Knife-friendly and naturally antibacterial.',
        stock: 70,
        created_at: new Date('2024-03-01').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1594962840834-c8f39351a3e1?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 14,
        name: 'Wireless Mouse - Ergonomic',
        price: 34.99,
        category: 'Electronics',
        description: 'Comfortable ergonomic wireless mouse with adjustable DPI and long battery life. Works on any surface.',
        stock: 110,
        created_at: new Date('2024-03-05').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 15,
        name: 'Cotton Bed Sheets - Queen',
        price: 69.99,
        category: 'Home & Kitchen',
        description: '400 thread count 100% cotton sheets. Soft, breathable, and machine washable. Includes fitted and flat sheet plus pillowcases.',
        stock: 40,
        created_at: new Date('2024-03-08').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 16,
        name: 'Resistance Bands Set',
        price: 29.99,
        category: 'Sports & Fitness',
        description: 'Set of 5 resistance bands with different resistance levels. Includes carrying bag and workout guide.',
        stock: 130,
        created_at: new Date('2024-03-10').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 17,
        name: 'Camera Tripod - Professional',
        price: 99.99,
        category: 'Electronics',
        description: 'Lightweight aluminum tripod with fluid head, extends up to 65 inches. Compatible with DSLR and mirrorless cameras.',
        stock: 30,
        created_at: new Date('2024-03-12').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1606933248010-ef7f6f3bf5b5?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 18,
        name: 'Scented Candle Collection',
        price: 39.99,
        category: 'Home & Kitchen',
        description: 'Set of 4 natural soy wax candles with essential oils. Lavender, vanilla, citrus, and eucalyptus scents.',
        stock: 85,
        created_at: new Date('2024-03-15').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1602874801006-e24aa6f7d8ad?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 19,
        name: 'Denim Jacket - Classic',
        price: 79.99,
        category: 'Clothing',
        description: 'Timeless denim jacket with button closure and multiple pockets. Comfortable fit, available in multiple sizes.',
        stock: 65,
        created_at: new Date('2024-03-18').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 20,
        name: 'Wireless Earbuds Pro',
        price: 149.99,
        category: 'Electronics',
        description: 'True wireless earbuds with active noise cancellation, transparency mode, and wireless charging case. 24-hour total battery.',
        stock: 42,
        created_at: new Date('2024-03-20').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=500&fit=crop' }
        ]
    },

    // Laptops (10 items)
    {
        id: 21,
        name: 'MacBook Pro 14" M3',
        price: 1999.00,
        category: 'Laptops',
        description: 'Apple M3 chip, 14-inch Liquid Retina XDR display, 18-hour battery life. Perfect for professionals.',
        stock: 25,
        created_at: new Date('2024-03-22').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 22,
        name: 'Dell XPS 15',
        price: 1499.00,
        category: 'Laptops',
        description: '15.6-inch 4K display, Intel i7, 16GB RAM, 512GB SSD. Premium Windows laptop.',
        stock: 30,
        created_at: new Date('2024-03-23').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 23,
        name: 'HP Spectre x360',
        price: 1299.00,
        category: 'Laptops',
        description: '2-in-1 convertible laptop with touchscreen, 12-hour battery, and sleek design.',
        stock: 20,
        created_at: new Date('2024-03-24').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 24,
        name: 'Lenovo ThinkPad X1',
        price: 1399.00,
        category: 'Laptops',
        description: 'Business-class laptop with military-grade durability and excellent keyboard.',
        stock: 18,
        created_at: new Date('2024-03-25').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 25,
        name: 'ASUS ROG Gaming Laptop',
        price: 1799.00,
        category: 'Laptops',
        description: 'RTX 4060 graphics, 144Hz display, RGB keyboard. Built for gaming.',
        stock: 15,
        created_at: new Date('2024-03-26').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 26,
        name: 'MacBook Air M2',
        price: 1199.00,
        category: 'Laptops',
        description: 'Ultra-thin and light, M2 chip, 13.6-inch display, all-day battery.',
        stock: 35,
        created_at: new Date('2024-03-27').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 27,
        name: 'Microsoft Surface Laptop 5',
        price: 999.00,
        category: 'Laptops',
        description: 'Elegant touchscreen laptop, perfect balance of performance and portability.',
        stock: 28,
        created_at: new Date('2024-03-28').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 28,
        name: 'Acer Swift 3',
        price: 649.00,
        category: 'Laptops',
        description: 'Budget-friendly ultrabook with solid performance for everyday tasks.',
        stock: 40,
        created_at: new Date('2024-03-29').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 29,
        name: 'LG Gram 17',
        price: 1699.00,
        category: 'Laptops',
        description: '17-inch display in ultra-lightweight design, weighs less than 3 lbs.',
        stock: 12,
        created_at: new Date('2024-03-30').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 30,
        name: 'Razer Blade 15',
        price: 2399.00,
        category: 'Laptops',
        description: 'Premium gaming laptop with sleek aluminum design and powerful specs.',
        stock: 10,
        created_at: new Date('2024-03-31').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1593642634443-44adaa06623a?w=500&h=500&fit=crop' }
        ]
    },

    // Phones (10 items)
    {
        id: 31,
        name: 'iPhone 15 Pro Max',
        price: 1199.00,
        category: 'Phones',
        description: 'Titanium design, A17 Pro chip, 48MP camera with 5x telephoto zoom.',
        stock: 50,
        created_at: new Date('2024-04-01').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1592286927505-2fd0d3e3c049?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 32,
        name: 'Samsung Galaxy S24 Ultra',
        price: 1199.00,
        category: 'Phones',
        description: '200MP camera, Galaxy AI features, S Pen included, vibrant display.',
        stock: 45,
        created_at: new Date('2024-04-02').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 33,
        name: 'Google Pixel 8 Pro',
        price: 999.00,
        category: 'Phones',
        description: 'Best Google AI camera, Magic Eraser, pure Android experience.',
        stock: 40,
        created_at: new Date('2024-04-03').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 34,
        name: 'iPhone 15',
        price: 799.00,
        category: 'Phones',
        description: 'Dynamic Island, 48MP main camera, all-day battery life.',
        stock: 60,
        created_at: new Date('2024-04-04').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 35,
        name: 'OnePlus 12',
        price: 799.00,
        category: 'Phones',
        description: 'Fast charging, Snapdragon 8 Gen 3, incredible value flagship.',
        stock: 35,
        created_at: new Date('2024-04-05').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 36,
        name: 'Samsung Galaxy S24',
        price: 799.00,
        category: 'Phones',
        description: 'Compact flagship with AI features and beautiful design.',
        stock: 50,
        created_at: new Date('2024-04-06').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 37,
        name: 'Google Pixel 8',
        price: 699.00,
        category: 'Phones',
        description: 'Flagship camera features at midrange price, clean software.',
        stock: 55,
        created_at: new Date('2024-04-07').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 38,
        name: 'Xiaomi 14 Pro',
        price: 899.00,
        category: 'Phones',
        description: 'Flagship specs with Leica camera system at competitive price.',
        stock: 30,
        created_at: new Date('2024-04-08').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 39,
        name: 'Nothing Phone (2)',
        price: 699.00,
        category: 'Phones',
        description: 'Unique Glyph interface design, clean Android, great value.',
        stock: 25,
        created_at: new Date('2024-04-09').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 40,
        name: 'Sony Xperia 1 V',
        price: 1399.00,
        category: 'Phones',
        description: 'Pro camera controls, 4K 120Hz display, for content creators.',
        stock: 15,
        created_at: new Date('2024-04-10').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop' }
        ]
    },

    // Shoes (15 items)
    {
        id: 41,
        name: 'Nike Air Max 270',
        price: 150.00,
        category: 'Shoes',
        description: 'Iconic Air cushioning, comfortable lifestyle sneaker for everyday wear.',
        stock: 75,
        created_at: new Date('2024-04-11').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 42,
        name: 'Adidas Ultraboost 23',
        price: 190.00,
        category: 'Shoes',
        description: 'Premium running shoe with responsive Boost cushioning technology.',
        stock: 60,
        created_at: new Date('2024-04-12').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 43,
        name: 'Nike Air Force 1',
        price: 110.00,
        category: 'Shoes',
        description: 'Classic basketball silhouette, timeless white sneaker.',
        stock: 100,
        created_at: new Date('2024-04-13').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 44,
        name: 'New Balance 990v6',
        price: 185.00,
        category: 'Shoes',
        description: 'Made in USA, premium comfort with heritage style.',
        stock: 45,
        created_at: new Date('2024-04-14').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 45,
        name: 'Jordan 1 Retro High',
        price: 170.00,
        category: 'Shoes',
        description: 'Legendary basketball sneaker with premium leather construction.',
        stock: 35,
        created_at: new Date('2024-04-15').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 46,
        name: 'Converse Chuck Taylor',
        price: 65.00,
        category: 'Shoes',
        description: 'Timeless canvas sneaker, perfect for casual everyday style.',
        stock: 120,
        created_at: new Date('2024-04-16').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 47,
        name: 'Vans Old Skool',
        price: 70.00,
        category: 'Shoes',
        description: 'Classic skate shoe with iconic side stripe design.',
        stock: 90,
        created_at: new Date('2024-04-17').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 48,
        name: 'Adidas Samba',
        price: 100.00,
        category: 'Shoes',
        description: 'Classic soccer-inspired sneaker, retro street style.',
        stock: 80,
        created_at: new Date('2024-04-18').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 49,
        name: 'Nike Dunk Low',
        price: 120.00,
        category: 'Shoes',
        description: 'Retro basketball style adapted for modern streetwear.',
        stock: 65,
        created_at: new Date('2024-04-19').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 50,
        name: 'Puma Suede Classic',
        price: 75.00,
        category: 'Shoes',
        description: 'Iconic suede sneaker, timeless design since 1968.',
        stock: 70,
        created_at: new Date('2024-04-20').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 51,
        name: 'ASICS Gel-Kayano 30',
        price: 160.00,
        category: 'Shoes',
        description: 'Stability running shoe for long-distance comfort.',
        stock: 50,
        created_at: new Date('2024-04-21').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 52,
        name: 'On Cloud 5',
        price: 140.00,
        category: 'Shoes',
        description: 'Swiss-engineered running shoe with CloudTec cushioning.',
        stock: 55,
        created_at: new Date('2024-04-22').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 53,
        name: 'Hoka Clifton 9',
        price: 145.00,
        category: 'Shoes',
        description: 'Maximum cushioning for comfortable long runs.',
        stock: 48,
        created_at: new Date('2024-04-23').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 54,
        name: 'Reebok Club C 85',
        price: 80.00,
        category: 'Shoes',
        description: 'Minimalist tennis-inspired sneaker, clean retro look.',
        stock: 75,
        created_at: new Date('2024-04-24').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 55,
        name: 'New Balance 550',
        price: 130.00,
        category: 'Shoes',
        description: 'Retro basketball silhouette, versatile everyday style.',
        stock: 60,
        created_at: new Date('2024-04-25').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500&h=500&fit=crop' }
        ]
    },

    // More Clothing (10 items)
    {
        id: 56,
        name: 'Levi\'s 501 Jeans',
        price: 89.00,
        category: 'Clothing',
        description: 'The original blue jean since 1873, classic straight fit.',
        stock: 100,
        created_at: new Date('2024-04-26').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 57,
        name: 'Patagonia Better Sweater',
        price: 139.00,
        category: 'Clothing',
        description: 'Warm fleece jacket made from recycled materials.',
        stock: 65,
        created_at: new Date('2024-04-27').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 58,
        name: 'The North Face Nuptse',
        price: 299.00,
        category: 'Clothing',
        description: 'Iconic puffer jacket with 700-fill down insulation.',
        stock: 40,
        created_at: new Date('2024-04-28').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 59,
        name: 'Champion Hoodie',
        price: 70.00,
        category: 'Clothing',
        description: 'Classic heavyweight Reverse Weave hoodie.',
        stock: 85,
        created_at: new Date('2024-04-29').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 60,
        name: 'Carhartt Jacket',
        price: 169.00,
        category: 'Clothing',
        description: 'Durable workwear-inspired Detroit jacket.',
        stock: 50,
        created_at: new Date('2024-04-30').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 61,
        name: 'Ralph Lauren Polo',
        price: 89.00,
        category: 'Clothing',
        description: 'Classic polo shirt with embroidered pony logo.',
        stock: 95,
        created_at: new Date('2024-05-01').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 62,
        name: 'Lululemon ABC Pants',
        price: 128.00,
        category: 'Clothing',
        description: 'Anti-Ball Crushing pants for ultimate comfort.',
        stock: 70,
        created_at: new Date('2024-05-02').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 63,
        name: 'Nike Tech Fleece',
        price: 110.00,
        category: 'Clothing',
        description: 'Modern athletic joggers with thermal comfort.',
        stock: 80,
        created_at: new Date('2024-05-03').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 64,
        name: 'Uniqlo Heattech',
        price: 29.00,
        category: 'Clothing',
        description: 'Thermal base layer for cold weather comfort.',
        stock: 150,
        created_at: new Date('2024-05-04').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 65,
        name: 'Supreme Box Logo Tee',
        price: 54.00,
        category: 'Clothing',
        description: 'Iconic streetwear t-shirt with classic logo.',
        stock: 60,
        created_at: new Date('2024-05-05').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&h=500&fit=crop' }
        ]
    },

    // Books (10 items)
    {
        id: 66,
        name: 'Atomic Habits',
        price: 20.00,
        category: 'Books',
        description: 'James Clear - Proven way to build good habits and break bad ones.',
        stock: 150,
        created_at: new Date('2024-05-06').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 67,
        name: 'Sapiens',
        price: 22.00,
        category: 'Books',
        description: 'Yuval Noah Harari - A brief history of humankind.',
        stock: 120,
        created_at: new Date('2024-05-07').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 68,
        name: 'The Psychology of Money',
        price: 18.00,
        category: 'Books',
        description: 'Morgan Housel - Timeless lessons on wealth and happiness.',
        stock: 140,
        created_at: new Date('2024-05-08').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 69,
        name: 'Project Hail Mary',
        price: 18.00,
        category: 'Books',
        description: 'Andy Weir - Thrilling space adventure sci-fi novel.',
        stock: 100,
        created_at: new Date('2024-05-09').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 70,
        name: 'Educated',
        price: 17.00,
        category: 'Books',
        description: 'Tara Westover - Powerful memoir about education and family.',
        stock: 110,
        created_at: new Date('2024-05-10').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 71,
        name: 'Can\'t Hurt Me',
        price: 19.00,
        category: 'Books',
        description: 'David Goggins - Master your mind and defy the odds.',
        stock: 95,
        created_at: new Date('2024-05-11').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 72,
        name: 'The Midnight Library',
        price: 16.00,
        category: 'Books',
        description: 'Matt Haig - Choices that make a life well lived.',
        stock: 130,
        created_at: new Date('2024-05-12').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 73,
        name: 'Shoe Dog',
        price: 20.00,
        category: 'Books',
        description: 'Phil Knight - Memoir by the creator of Nike.',
        stock: 105,
        created_at: new Date('2024-05-13').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 74,
        name: 'The 48 Laws of Power',
        price: 25.00,
        category: 'Books',
        description: 'Robert Greene - Timeless wisdom on power dynamics.',
        stock: 90,
        created_at: new Date('2024-05-14').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 75,
        name: 'Thinking, Fast and Slow',
        price: 21.00,
        category: 'Books',
        description: 'Daniel Kahneman - How we make decisions.',
        stock: 115,
        created_at: new Date('2024-05-15').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=500&h=500&fit=crop' }
        ]
    },

    // Gaming & Electronics (10 items)
    {
        id: 76,
        name: 'PlayStation 5',
        price: 499.00,
        category: 'Gaming',
        description: 'Next-gen console with lightning-fast loading and stunning graphics.',
        stock: 30,
        created_at: new Date('2024-05-16').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 77,
        name: 'Xbox Series X',
        price: 499.00,
        category: 'Gaming',
        description: 'Most powerful Xbox ever, 4K gaming at 120fps.',
        stock: 28,
        created_at: new Date('2024-05-17').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 78,
        name: 'Nintendo Switch OLED',
        price: 349.00,
        category: 'Gaming',
        description: '7-inch OLED screen, portable and home gaming in one.',
        stock: 45,
        created_at: new Date('2024-05-18').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 79,
        name: 'Steam Deck',
        price: 399.00,
        category: 'Gaming',
        description: 'Handheld PC gaming, play your entire Steam library.',
        stock: 25,
        created_at: new Date('2024-05-19').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 80,
        name: 'Meta Quest 3',
        price: 499.00,
        category: 'Gaming',
        description: 'Advanced VR headset with mixed reality capabilities.',
        stock: 20,
        created_at: new Date('2024-05-20').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 81,
        name: 'iPad Pro 12.9"',
        price: 1099.00,
        category: 'Tablets',
        description: 'M2 chip, Liquid Retina XDR display, Ultimate tablet.',
        stock: 35,
        created_at: new Date('2024-05-21').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 82,
        name: 'Samsung Galaxy Tab S9+',
        price: 999.00,
        category: 'Tablets',
        description: '12.4-inch AMOLED display, S Pen included.',
        stock: 30,
        created_at: new Date('2024-05-22').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1585789575857-9d7c4df92000?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 83,
        name: 'iPad Air',
        price: 599.00,
        category: 'Tablets',
        description: 'M1 chip, 10.9-inch display, perfect balance.',
        stock: 50,
        created_at: new Date('2024-05-23').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 84,
        name: 'Microsoft Surface Pro 9',
        price: 999.00,
        category: 'Tablets',
        description: '2-in-1 tablet and laptop replacement.',
        stock: 25,
        created_at: new Date('2024-05-24').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 85,
        name: 'Kindle Paperwhite',
        price: 139.00,
        category: 'Electronics',
        description: 'Waterproof e-reader with glare-free display, weeks of battery.',
        stock: 80,
        created_at: new Date('2024-05-25').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=500&h=500&fit=crop' }
        ]
    },

    // Cameras, Watches & Audio (15 items)
    {
        id: 86,
        name: 'Sony A7 IV',
        price: 2499.00,
        category: 'Cameras',
        description: '33MP full-frame camera, 4K 60fps video, professional quality.',
        stock: 15,
        created_at: new Date('2024-05-26').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 87,
        name: 'Canon EOS R6 II',
        price: 2499.00,
        category: 'Cameras',
        description: '24.2MP, 40fps continuous shooting, incredible autofocus.',
        stock: 12,
        created_at: new Date('2024-05-27').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1606941165253-8c569d96aa4c?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 88,
        name: 'GoPro HERO12 Black',
        price: 399.00,
        category: 'Cameras',
        description: '5.3K video, HyperSmooth 6.0 stabilization, waterproof.',
        stock: 40,
        created_at: new Date('2024-05-28').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 89,
        name: 'Fujifilm X-T5',
        price: 1699.00,
        category: 'Cameras',
        description: '40MP APS-C sensor, classic design, incredible image quality.',
        stock: 18,
        created_at: new Date('2024-05-29').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1526413232644-8a40f03cc03b?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 90,
        name: 'DJI Mini 3 Pro',
        price: 759.00,
        category: 'Cameras',
        description: 'Compact drone with 4K camera, intelligent flight modes.',
        stock: 25,
        created_at: new Date('2024-05-30').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 91,
        name: 'Apple Watch Ultra 2',
        price: 799.00,
        category: 'Watches',
        description: 'Titanium case, precision GPS, extreme sports watch.',
        stock: 30,
        created_at: new Date('2024-05-31').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 92,
        name: 'Apple Watch Series 9',
        price: 399.00,
        category: 'Watches',
        description: 'Advanced health features, always-on display, fitness tracking.',
        stock: 60,
        created_at: new Date('2024-06-01').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 93,
        name: 'Garmin Fenix 7X',
        price: 899.00,
        category: 'Watches',
        description: 'Multisport GPS watch with solar charging, rugged design.',
        stock: 22,
        created_at: new Date('2024-06-02').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 94,
        name: 'Samsung Galaxy Watch6',
        price: 299.00,
        category: 'Watches',
        description: 'Comprehensive health tracking, sleek design, long battery.',
        stock: 45,
        created_at: new Date('2024-06-03').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 95,
        name: 'Casio G-Shock',
        price: 110.00,
        category: 'Watches',
        description: 'Iconic tough watch, shock resistant, water resistant.',
        stock: 75,
        created_at: new Date('2024-06-04').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1587836374619-91e3f1e2f6e9?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 96,
        name: 'Sony WH-1000XM5',
        price: 399.00,
        category: 'Audio',
        description: 'Industry-leading noise cancellation, premium sound quality.',
        stock: 55,
        created_at: new Date('2024-06-05').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 97,
        name: 'AirPods Pro 2',
        price: 249.00,
        category: 'Audio',
        description: 'Active noise cancellation, spatial audio, transparency mode.',
        stock: 80,
        created_at: new Date('2024-06-06').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 98,
        name: 'Bose QuietComfort',
        price: 429.00,
        category: 'Audio',
        description: 'Premium noise cancelling headphones, legendary comfort.',
        stock: 40,
        created_at: new Date('2024-06-07').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1558756520-22cfe5d382ca?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 99,
        name: 'JBL Flip 6',
        price: 129.00,
        category: 'Audio',
        description: 'Portable Bluetooth speaker, waterproof, powerful bass.',
        stock: 70,
        created_at: new Date('2024-06-08').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop' }
        ]
    },
    {
        id: 100,
        name: 'Sonos One',
        price: 219.00,
        category: 'Audio',
        description: 'Smart speaker with Alexa, AirPlay 2, rich room-filling sound.',
        stock: 50,
        created_at: new Date('2024-06-09').toISOString(),
        ProductImages: [
            { url: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500&h=500&fit=crop' }
        ]
    }
];

// Mock orders for demonstration
export const mockOrders: MockOrder[] = [
    {
        id: 1,
        userId: 1,
        items: [
            { productId: 1, quantity: 1, price: 89.99, productName: 'Wireless Bluetooth Headphones' },
            { productId: 5, quantity: 2, price: 24.99, productName: 'Stainless Steel Water Bottle' }
        ],
        totalAmount: 139.97,
        status: 'delivered',
        created_at: new Date('2024-01-25').toISOString()
    },
    {
        id: 2,
        userId: 2,
        items: [
            { productId: 2, quantity: 1, price: 199.99, productName: 'Smart Fitness Watch' }
        ],
        totalAmount: 199.99,
        status: 'shipped',
        created_at: new Date('2024-02-10').toISOString()
    },
    {
        id: 3,
        userId: 1,
        items: [
            { productId: 4, quantity: 3, price: 29.99, productName: 'Organic Cotton T-Shirt' },
            { productId: 3, quantity: 1, price: 45.00, productName: 'Minimalist Leather Wallet' }
        ],
        totalAmount: 134.97,
        status: 'processing',
        created_at: new Date('2024-03-01').toISOString()
    }
];

// Initialize mock data in localStorage if not present
// Version key to force refresh when data is updated
const MOCK_DATA_VERSION = '2.0'; // Increment this when mockProducts changes

export const initializeMockData = () => {
    if (typeof window === 'undefined') return;

    const storedVersion = localStorage.getItem('mock_data_version');

    // Force refresh if version changed or no version exists
    if (storedVersion !== MOCK_DATA_VERSION) {
        localStorage.setItem('mock_products', JSON.stringify(mockProducts));
        localStorage.setItem('mock_orders', JSON.stringify(mockOrders));
        localStorage.setItem('mock_data_version', MOCK_DATA_VERSION);
        console.log(`Mock data refreshed to version ${MOCK_DATA_VERSION} with ${mockProducts.length} products`);
        return;
    }

    if (!localStorage.getItem('mock_products')) {
        localStorage.setItem('mock_products', JSON.stringify(mockProducts));
    }

    if (!localStorage.getItem('mock_orders')) {
        localStorage.setItem('mock_orders', JSON.stringify(mockOrders));
    }
};

// Get products from localStorage (allows admin edits to persist)
export const getProducts = (): MockProduct[] => {
    if (typeof window === 'undefined') return mockProducts;

    const stored = localStorage.getItem('mock_products');
    return stored ? JSON.parse(stored) : mockProducts;
};

// Save products to localStorage
export const saveProducts = (products: MockProduct[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('mock_products', JSON.stringify(products));
};

// Get orders from localStorage
export const getOrders = (): MockOrder[] => {
    if (typeof window === 'undefined') return mockOrders;

    const stored = localStorage.getItem('mock_orders');
    return stored ? JSON.parse(stored) : mockOrders;
};

// Save orders to localStorage
export const saveOrders = (orders: MockOrder[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('mock_orders', JSON.stringify(orders));
};
