import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../hooks/useAuth';
import { addProduct } from '../services/productService';
import toast from 'react-hot-toast';
import { PlusCircle, Image, DollarSign, Text, FileText, AlertCircle } from 'lucide-react';

const AddProductPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const { user, isAuthenticated, isMember, userRoles, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const isAdmin = userRoles.includes('admin') || userRoles.includes('owner');

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    } else {
      setImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!isAuthenticated || !isMember || !isAdmin) {
      toast.error('غير مصرح لك بإضافة منتجات.', { icon: <AlertCircle className="text-rose-500" /> });
      setFormError('غير مصرح لك بإضافة منتجات.');
      return;
    }

    if (!name || !description || !price) {
      setFormError('الرجاء تعبئة جميع الحقول المطلوبة.');
      toast.error('الرجاء تعبئة جميع الحقول المطلوبة.', { icon: <AlertCircle className="text-rose-500" /> });
      return;
    }
    if (isNaN(price) || parseFloat(price) <= 0) {
      setFormError('السعر يجب أن يكون رقماً صحيحاً وموجباً.');
      toast.error('السعر يجب أن يكون رقماً صحيحاً وموجباً.', { icon: <AlertCircle className="text-rose-500" /> });
      return;
    }

    setLoading(true);
    try {
      const productData = {
        name,
        description,
        price: parseFloat(price),
        userId: user.uid, // Associate product with the creator
      };
      await addProduct(productData, image);
      toast.success('تم إضافة المنتج بنجاح! 🎉');
      navigate('/products');
    } catch (err) {
      console.error('Error adding product:', err);
      toast.error('فشل إضافة المنتج: ' + err.message, { icon: <AlertCircle className="text-rose-500" /> });
      setFormError('فشل إضافة المنتج: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return <LoadingSpinner className="min-h-screen pt-24" />;
  }

  if (!isAuthenticated || !isMember || !isAdmin) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center min-h-screen pt-24"
      >
        <Card className="text-center bg-rose-50 dark:bg-rose-900 border-rose-200 dark:border-rose-700">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-rose-700 dark:text-rose-300 mb-4">غير مصرح لك</h2>
          <p className="text-rose-600 dark:text-rose-400">ليس لديك الإذن لإضافة منتجات.</p>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4 pt-24"
    >
      <Card className="w-full max-w-lg p-8 sm:p-10 md:p-12 text-center">
        <h2 className="text-3xl font-bold text-indigo-700 dark:text-indigo-400 mb-6">إضافة منتج جديد</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="اسم المنتج"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="سمك السلمون الطازج"
            icon={Text}
            required
          />
          <InputField
            label="الوصف"
            type="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="وصف مفصل للمنتج..."
            icon={FileText}
            required
          />
          <InputField
            label="السعر (ر.س)"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="120.50"
            icon={DollarSign}
            required
            step="0.01"
            min="0"
          />
          <div className="mb-4 w-full">
            <label className="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2">
              صورة المنتج
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all outline-none file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-gray-700 dark:file:text-indigo-300 dark:hover:file:bg-gray-600"
              accept="image/*"
            />
            {image && <p className="text-gray-600 dark:text-gray-400 text-xs mt-2">الصورة المحددة: {image.name}</p>}
          </div>

          {formError && <p className="text-rose-500 text-sm mt-4">{formError}</p>}

          {loading ? (
            <LoadingSpinner className="mt-6" />
          ) : (
            <Button type="submit" icon={PlusCircle} className="w-full mt-6">
              إضافة المنتج
            </Button>
          )}
        </form>
      </Card>
    </motion.div>
  );
};

export default AddProductPage;
