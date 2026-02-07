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
export const initializeMockData = () => {
    if (typeof window === 'undefined') return;

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
