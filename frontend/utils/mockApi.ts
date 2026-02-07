// Mock API service to replace backend API calls
// Simulates API responses with realistic delays

import {
    mockUsers,
    getProducts,
    saveProducts,
    getOrders,
    saveOrders,
    initializeMockData,
    MockProduct,
    MockOrder,
    MockOrderItem
} from './mockData';

// Initialize mock data on import
if (typeof window !== 'undefined') {
    initializeMockData();
}

// Simulate network delay for realism
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to create mock JWT token
const createMockToken = (user: { id: number; username: string; email: string; role: string }) => {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        iat: Date.now()
    }));
    const signature = btoa('mock_signature');
    return `${header}.${payload}.${signature}`;
};

// Helper to get current user from token
const getCurrentUser = () => {
    if (typeof window === 'undefined') return null;
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return mockUsers.find(u => u.id === payload.id);
    } catch {
        return null;
    }
};

// Mock API object that mimics axios API
export const mockApi = {
    // Auth endpoints
    async post(endpoint: string, data?: any) {
        await delay();

        // Login
        if (endpoint === '/auth/login') {
            // AuthForm sends 'username' field, but we match by email
            const { username, email, password } = data;
            const loginEmail = email || username; // Support both fields
            const user = mockUsers.find(u => u.email === loginEmail && u.password === password);

            if (!user) {
                throw { response: { status: 401, data: { message: 'Invalid credentials' } } };
            }

            const token = createMockToken(user);
            return {
                data: {
                    token,
                    user: {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        role: user.role
                    }
                }
            };
        }

        // Register
        if (endpoint === '/auth/register') {
            const { username, email, password } = data;

            // Check if user already exists
            if (mockUsers.find(u => u.email === email)) {
                throw { response: { status: 400, data: { message: 'User already exists' } } };
            }

            // Create new user (in a real app, we'd save this)
            const newUser = {
                id: mockUsers.length + 1,
                username,
                email,
                password,
                role: 'user' as const
            };

            mockUsers.push(newUser);
            const token = createMockToken(newUser);

            return {
                data: {
                    token,
                    user: {
                        id: newUser.id,
                        username: newUser.username,
                        email: newUser.email,
                        role: newUser.role
                    }
                }
            };
        }

        // Cart add
        if (endpoint === '/cart/add') {
            await delay(200);
            // Cart is handled in CartContext with localStorage
            return { data: { success: true } };
        }

        // Cart remove
        if (endpoint === '/cart/remove') {
            await delay(200);
            return { data: { success: true } };
        }

        // Product create
        if (endpoint === '/product/make') {
            const user = getCurrentUser();
            if (!user || user.role !== 'admin') {
                throw { response: { status: 403, data: { message: 'Forbidden' } } };
            }

            const products = getProducts();
            const newProduct: MockProduct = {
                id: Math.max(...products.map(p => p.id), 0) + 1,
                name: data.name,
                price: parseFloat(data.price),
                category: data.category,
                description: data.description || '',
                stock: parseInt(data.stock) || 0,
                created_at: new Date().toISOString(),
                ProductImages: data.images?.map((url: string) => ({ url })) || []
            };

            products.push(newProduct);
            saveProducts(products);

            return { data: { product: newProduct } };
        }

        // Product update
        if (endpoint === '/product/update') {
            const user = getCurrentUser();
            if (!user || user.role !== 'admin') {
                throw { response: { status: 403, data: { message: 'Forbidden' } } };
            }

            const products = getProducts();
            const index = products.findIndex(p => p.id === data.id);

            if (index === -1) {
                throw { response: { status: 404, data: { message: 'Product not found' } } };
            }

            products[index] = {
                ...products[index],
                name: data.name,
                price: parseFloat(data.price),
                category: data.category,
                description: data.description || '',
                stock: parseInt(data.stock) || 0,
                ProductImages: data.images?.map((url: string) => ({ url })) || products[index].ProductImages
            };

            saveProducts(products);

            return { data: { product: products[index] } };
        }

        // Order create
        if (endpoint === '/order/make') {
            const user = getCurrentUser();
            if (!user) {
                throw { response: { status: 401, data: { message: 'Unauthorized' } } };
            }

            // Get cart from localStorage
            const cartStr = localStorage.getItem('mock_cart');
            if (!cartStr) {
                throw { response: { status: 400, data: { message: 'Cart is empty' } } };
            }

            const cartItems = JSON.parse(cartStr);
            const products = getProducts();
            const orders = getOrders();

            // Create order items
            const orderItems: MockOrderItem[] = cartItems.map((item: any) => {
                const product = products.find(p => p.id === item.productId);
                return {
                    productId: item.productId,
                    quantity: item.quantity,
                    price: product?.price || 0,
                    productName: product?.name || 'Unknown Product'
                };
            });

            const totalAmount = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

            const newOrder: MockOrder = {
                id: Math.max(...orders.map(o => o.id), 0) + 1,
                userId: user.id,
                items: orderItems,
                totalAmount,
                status: 'pending',
                created_at: new Date().toISOString()
            };

            orders.push(newOrder);
            saveOrders(orders);

            // Clear cart
            localStorage.removeItem('mock_cart');

            return { data: { order: newOrder } };
        }

        // Order status update
        if (endpoint.startsWith('/order/') && endpoint.includes('/status')) {
            const user = getCurrentUser();
            if (!user || user.role !== 'admin') {
                throw { response: { status: 403, data: { message: 'Forbidden' } } };
            }

            const orderId = parseInt(endpoint.split('/')[2]);
            const orders = getOrders();
            const index = orders.findIndex(o => o.id === orderId);

            if (index === -1) {
                throw { response: { status: 404, data: { message: 'Order not found' } } };
            }

            orders[index].status = data.status;
            saveOrders(orders);

            return { data: { order: orders[index] } };
        }

        throw { response: { status: 404, data: { message: 'Endpoint not found' } } };
    },

    async get(endpoint: string) {
        await delay();

        // Get products
        if (endpoint.startsWith('/product/get')) {
            const products = getProducts();
            const url = new URL('http://localhost' + endpoint);
            const limit = url.searchParams.get('limit');

            const items = limit ? products.slice(0, parseInt(limit)) : products;

            return {
                data: {
                    items,
                    total: products.length
                }
            };
        }

        // Get single product
        if (endpoint.startsWith('/product/') && !endpoint.includes('get')) {
            const id = parseInt(endpoint.split('/')[2]);
            const products = getProducts();
            const product = products.find(p => p.id === id);

            if (!product) {
                throw { response: { status: 404, data: { message: 'Product not found' } } };
            }

            return { data: { product } };
        }

        // Get cart
        if (endpoint === '/cart') {
            const cartStr = localStorage.getItem('mock_cart');
            const cartItems = cartStr ? JSON.parse(cartStr) : [];
            const products = getProducts();

            // Populate product details
            const items = cartItems.map((item: any) => {
                const product = products.find(p => p.id === item.productId);
                return {
                    productId: item.productId,
                    quantity: item.quantity,
                    product: product ? {
                        name: product.name,
                        price: product.price,
                        category: product.category,
                        ProductImages: product.ProductImages
                    } : null
                };
            });

            return { data: { items } };
        }

        // Get orders
        if (endpoint === '/order/get') {
            const user = getCurrentUser();
            if (!user) {
                throw { response: { status: 401, data: { message: 'Unauthorized' } } };
            }

            const orders = getOrders();
            const products = getProducts();

            // If admin, return all orders; if user, return only their orders
            const userOrders = user.role === 'admin'
                ? orders
                : orders.filter(o => o.userId === user.id);

            // Populate product details
            const ordersWithDetails = userOrders.map(order => {
                const orderUser = mockUsers.find(u => u.id === order.userId);
                return {
                    ...order,
                    items: order.items.map(item => {
                        const product = products.find(p => p.id === item.productId);
                        return {
                            ...item,
                            product: product ? {
                                name: product.name,
                                price: product.price,
                                ProductImages: product.ProductImages
                            } : { name: item.productName, price: item.price, ProductImages: [] }
                        };
                    }),
                    user: orderUser ? {
                        username: orderUser.username,
                        email: orderUser.email,
                        phoneNumber: '',
                        street: '',
                        city: '',
                        town: ''
                    } : {
                        username: 'Unknown User',
                        email: '',
                        phoneNumber: '',
                        street: '',
                        city: '',
                        town: ''
                    }
                };
            });

            return {
                data: {
                    orders: ordersWithDetails,
                    total: ordersWithDetails.length
                }
            };
        }

        throw { response: { status: 404, data: { message: 'Endpoint not found' } } };
    },

    async delete(endpoint: string) {
        await delay();

        // Delete product
        if (endpoint.startsWith('/product/')) {
            const user = getCurrentUser();
            if (!user || user.role !== 'admin') {
                throw { response: { status: 403, data: { message: 'Forbidden' } } };
            }

            const id = parseInt(endpoint.split('/')[2]);
            const products = getProducts();
            const filtered = products.filter(p => p.id !== id);

            if (filtered.length === products.length) {
                throw { response: { status: 404, data: { message: 'Product not found' } } };
            }

            saveProducts(filtered);

            return { data: { success: true } };
        }

        // Delete order
        if (endpoint.includes('/order/') && endpoint.includes('/delete')) {
            const user = getCurrentUser();
            if (!user || user.role !== 'admin') {
                throw { response: { status: 403, data: { message: 'Forbidden' } } };
            }

            const id = parseInt(endpoint.split('/')[2]);
            const orders = getOrders();
            const filtered = orders.filter(o => o.id !== id);

            if (filtered.length === orders.length) {
                throw { response: { status: 404, data: { message: 'Order not found' } } };
            }

            saveOrders(filtered);

            return { data: { success: true } };
        }

        throw { response: { status: 404, data: { message: 'Endpoint not found' } } };
    },

    async put(endpoint: string, data?: any) {
        return this.post(endpoint, data);
    },

    async patch(endpoint: string, data?: any) {
        return this.post(endpoint, data);
    }
};

export default mockApi;
