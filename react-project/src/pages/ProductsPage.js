import React from 'react';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import { useFirestore } from '../hooks/useFirestore';
import { deleteProduct } from '../services/productService';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { Trash2, Fish, AlertCircle } from 'lucide-react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const ProductsPage = () => {
  const { data: products, loading, error } = useFirestore('products');
  const { user, isAuthenticated, isMember, userRoles, loading: authLoading } = useAuth();
  const isAdmin = userRoles.includes('admin') || userRoles.includes('owner');

  const handleDelete = async (productId, imageUrl) => {
    if (!isAuthenticated || !isMember || !isAdmin) {
      toast.error('غير مصرح لك بحذف المنتجات.', { icon: <AlertCircle className="text-rose-500" /> });
      return;
    }
    if (window.confirm('هل أنت متأكد أنك تريد حذف هذا المنتج؟')) {
      try {
        await deleteProduct(productId, imageUrl);
        toast.success('تم حذف المنتج بنجاح! 🎉');
      } catch (err) {
        console.error('Error deleting product:', err);
        toast.error('فشل حذف المنتج: ' + err.message, { icon: <AlertCircle className="text-rose-500" /> });
      }
    }
  };

  if (authLoading || loading) {
    return <LoadingSpinner className="min-h-screen pt-24" />;
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center min-h-screen pt-24"
      >
        <Card className="text-center bg-rose-50 dark:bg-rose-900 border-rose-200 dark:border-rose-700">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-rose-700 dark:text-rose-300 mb-4">خطأ في جلب المنتجات</h2>
          <p className="text-rose-600 dark:text-rose-400">{error}</p>
          {!isAuthenticated && (
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              يرجى <Link to="/signin" className="text-indigo-600 dark:text-indigo-400 hover:underline">تسجيل الدخول</Link> لعرض المنتجات.
            </p>
          )}
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4 pt-24 sm:px-4 md:px-8 lg:px-12"
    >
      <div className="container mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 dark:text-indigo-400 mb-10">
          <Fish className="inline-block w-8 h-8 md:w-10 md:h-10 text-cyan-500 mr-2" /> قائمة منتجاتنا
        </h1>

        {isAuthenticated && isMember && isAdmin && (
          <div className="text-center mb-8">
            <Link to="/add-product">
              <Button className="text-lg">إضافة منتج جديد</Button>
            </Link>
          </div>
        )}

        {products.length === 0 ? (
          <Card className="text-center py-10">
            <p className="text-xl text-gray-700 dark:text-gray-300">
              لا توجد منتجات حالياً. {isAuthenticated && isMember && isAdmin && "ابدأ بإضافة منتجاتك!"}
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="flex flex-col items-center text-center p-6">
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-xl mb-4 shadow-md"
                  />
                )}
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">{product.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 flex-grow">{product.description}</p>
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">{product.price} ر.س</p>
                {isAuthenticated && isMember && isAdmin && (
                  <Button
                    onClick={() => handleDelete(product.id, product.imageUrl)}
                    className="bg-rose-500 hover:bg-rose-600 from-rose-500 to-red-600 text-white mt-4"
                    icon={Trash2}
                  >
                    حذف
                  </Button>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductsPage;
