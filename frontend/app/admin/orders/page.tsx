"use client";
import { useEffect, useState, useRef } from "react";
import api from "../../../utils/api";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import {
  Package,
  Calendar,
  DollarSign,
  Eye,
  Edit2,
  Trash2,
  X,
} from "lucide-react";

interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
  product?: {
    name: string;
    imgUrl?: string[];
    ProductImages?: { url: string }[];
  };
}

interface Order {
  id: number;
  userId: number;
  status: string;
  totalAmount: number;
  created_at: string;
  items: OrderItem[];
  user: {
    username: string;
    email?: string;
    phoneNumber?: string;
    street?: string;
    city?: string;
    town?: string;
  };
}

export default function AdminOrdersPage() {
  const router = useRouter();
  const { isAdmin, isLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push("/");
    }
  }, [isLoading, isAdmin, router]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/order/get");
        console.log(res.data.orders);
        setOrders(res.data.orders || []);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };

    if (isAdmin) {
      fetchOrders();
    }
  }, [isAdmin]);

  const totalRevenue = orders.reduce(
    (acc, order) => acc + (Number(order.totalAmount) || 0),
    0,
  );

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      await api.patch(`/order/${orderId}/status`, { status: newStatus });
      const res = await api.get("/order/get");
      setOrders(res.data.orders || []);
    } catch (error) {
      console.error("Failed to update order status", error);
      alert("Failed to update order status");
    }
  };

  const handleDeleteOrder = async (orderId: number) => {
    if (
      confirm(
        "Are you sure you want to delete this order? This action cannot be undone.",
      )
    ) {
      try {
        await api.delete(`/order/${orderId}/delete`);
        // Refresh orders
        const res = await api.get("/order/get");
        setOrders(res.data.orders || []);
      } catch (error) {
        console.error("Failed to delete order", error);
        alert("Failed to delete order");
      }
    }
  };

  if (isLoading || loading)
    return <div className="min-h-screen pt-32 text-center">Loading...</div>;
  if (!isAdmin) return null;

  return (
    <div className="min-h-screen pt-32 px-10 bg-[#f5f5f7] select-none">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-semibold text-[#1d1d1f] mb-2">
            Order Management
          </h1>
          <p className="text-[#86868b] text-lg">
            Manage and track all customer orders
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[#86868b] font-medium">Total Orders</p>
              <Package className="text-[#0071e3]" size={24} />
            </div>
            <p className="text-3xl font-semibold text-[#1d1d1f]">
              {orders.length}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[#86868b] font-medium">Total Revenue</p>
              <DollarSign className="text-green-500" size={24} />
            </div>
            <p className="text-3xl font-semibold text-[#1d1d1f]">
              ${totalRevenue.toFixed(2)}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[#86868b] font-medium">Latest Order</p>
              <Calendar className="text-purple-500" size={24} />
            </div>
            <p className="text-3xl font-semibold text-[#1d1d1f]">
              {orders.length > 0
                ? new Date(orders[0].created_at).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {orders.length === 0 ? (
            <div className="p-12 text-center">
              <Package size={48} className="mx-auto mb-4 text-[#86868b]" />
              <h3 className="text-xl font-semibold text-[#1d1d1f] mb-2">
                No orders yet
              </h3>
              <p className="text-[#86868b]">
                Orders will appear here once customers start purchasing
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="py-4 px-6 text-left font-medium text-[#86868b] text-sm">
                      Order ID
                    </th>
                    <th className="py-4 px-6 text-left font-medium text-[#86868b] text-sm">
                      Customer
                    </th>
                    <th className="py-4 px-6 text-left font-medium text-[#86868b] text-sm">
                      Items
                    </th>
                    <th className="py-4 px-6 text-left font-medium text-[#86868b] text-sm">
                      Total
                    </th>
                    <th className="py-4 px-6 text-left font-medium text-[#86868b] text-sm">
                      Status
                    </th>
                    <th className="py-4 px-6 text-left font-medium text-[#86868b] text-sm">
                      Date
                    </th>
                    <th className="py-4 px-6 text-right font-medium text-[#86868b] text-sm">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-5 px-6">
                        <span className="font-medium text-[#1d1d1f]">
                          #{order.id.toString().padStart(5, "0")}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        <div>
                          <p className="font-medium text-[#1d1d1f]">
                            {order.user.username}
                          </p>
                          <p className="text-sm text-[#86868b]">
                            User ID: {order.userId}
                          </p>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#f5f5f7] text-sm font-medium text-[#1d1d1f]">
                          {order.items.length}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        <span className="font-semibold text-[#1d1d1f]">
                          ${Number(order.totalAmount).toFixed(2)}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${order.status === "shipped"
                            ? "bg-green-100 text-green-700"
                            : order.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : order.status === "processing" ||
                                order.status === "delivered"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                        >
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        <span className="text-[#86868b]">
                          {new Date(order.created_at).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => handleViewDetails(order)}
                            className="p-2 text-gray-500 hover:text-[#0071e3] hover:bg-blue-50 rounded-full transition-all"
                            title="View Details"
                          >
                            <Eye size={18} />
                          </button>
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleStatusChange(order.id, e.target.value)
                            }
                            className="px-3 py-1 text-sm border border-gray-300 rounded-full hover:border-[#0071e3] focus:outline-none focus:border-[#0071e3] transition-all"
                            title="Change Status"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="delivered">Delivered</option>
                            <option value="shipped">Shipped</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          <button
                            onClick={() => handleDeleteOrder(order.id)}
                            className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                            title="Delete Order"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Order Details Modal */}
        {isModalOpen && selectedOrder && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-2xl">
                <div>
                  <h2 className="text-2xl font-semibold text-[#1d1d1f]">
                    Order #{selectedOrder.id.toString().padStart(5, "0")}
                  </h2>
                  <p className="text-[#86868b] mt-1">
                    {new Date(selectedOrder.created_at).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      },
                    )}
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-all"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Customer Info */}
                <div className="mb-6">
                  <h3 className="font-semibold text-lg text-[#1d1d1f] mb-3">
                    Customer Information
                  </h3>
                  <div className="bg-[#f5f5f7] rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-[#86868b] text-xs uppercase tracking-wider font-semibold">User</p>
                      <p className="font-medium text-[#1d1d1f]">
                        {selectedOrder.user.username}
                      </p>
                      <p className="text-[#86868b] text-sm">
                        ID: {selectedOrder.userId}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#86868b] text-xs uppercase tracking-wider font-semibold">Contact</p>
                      <p className="font-medium text-[#1d1d1f]">
                        {selectedOrder.user.phoneNumber}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-[#86868b] text-xs uppercase tracking-wider font-semibold">Shipping Address</p>
                      <p className="font-medium text-[#1d1d1f]">
                        {selectedOrder.user.street}, {selectedOrder.user.town}, {selectedOrder.user.city}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-6">
                  <h3 className="font-semibold text-lg text-[#1d1d1f] mb-3">
                    Order Items ({selectedOrder.items.length})
                  </h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 bg-[#f5f5f7] rounded-xl p-4"
                      >
                        <img
                          src={
                            item.product?.ProductImages?.[0]?.url ||
                            item.product?.imgUrl?.[0] ||
                            "https://dummyimage.com/80x80/ccc/000.png&text=Product"
                          }
                          alt={item.product?.name || "Product"}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-[#1d1d1f]">
                            {item.product?.name ||
                              `Product ID: ${item.productId}`}
                          </p>
                          <p className="text-sm text-[#86868b] mt-1">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-[#1d1d1f]">
                            ${(Number(item.price) * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-[#86868b]">
                            ${Number(item.price).toFixed(2)} each
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[#86868b]">Status</span>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${selectedOrder.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : selectedOrder.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : selectedOrder.status === "processing"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                    >
                      {selectedOrder.status.charAt(0).toUpperCase() +
                        selectedOrder.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xl font-semibold text-[#1d1d1f] mt-4">
                    <span>Total</span>
                    <span>${Number(selectedOrder.totalAmount).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
