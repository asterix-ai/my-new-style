import React from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import Card from '../components/Card';
import { Sparkles, Fish, Store, Locate, Phone, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white pt-24 pb-12 sm:px-4 md:px-8 lg:px-12"
    >
      <div className="container mx-auto text-center">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-700 dark:text-indigo-400 mb-6 leading-tight">
            <Sparkles className="inline-block w-10 h-10 md:w-12 md:h-12 text-purple-500" /> السفاريتي <span className="text-rose-500">للاسماك الطازجة</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            نقدم لكم أجود أنواع الأسماك الطازجة يومياً من البحر مباشرة إلى مائدتكم. جودة لا تُضاهى وطعم لا يُنسى.
          </p>
          <Link to="/products">
            <Button icon={Fish} className="mx-auto text-lg">تصفح منتجاتنا الآن</Button>
          </Link>
        </motion.section>

        {/* Features Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          <Card>
            <Fish className="w-12 h-12 text-cyan-500 mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">طازجة يومياً</h3>
            <p className="text-gray-600 dark:text-gray-300">نضمن لك أسماك طازجة تصلك يومياً بأعلى معايير الجودة.</p>
          </Card>
          <Card>
            <Store className="w-12 h-12 text-rose-500 mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white"> تشكيلة واسعة </h3>
            <p className="text-gray-600 dark:text-gray-300">استمتع بتنوع كبير من الأسماك والمأكولات البحرية لتلبية كل الأذواق.</p>
          </Card>
          <Card>
            <Sparkles className="w-12 h-12 text-purple-500 mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">خدمة ممتازة</h3>
            <p className="text-gray-600 dark:text-gray-300">فريق عمل مدرب لتقديم أفضل خدمة ودعم لعملائنا الكرام.</p>
          </Card>
        </motion.section>

        {/* Contact Info Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-8 rounded-3xl shadow-2xl max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-6">تواصل معنا</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
            <div className="flex items-center justify-center gap-3">
              <Locate className="w-6 h-6" />
              <span>الموقع: الشارع الرئيسي، مدينة الأسماك</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Phone className="w-6 h-6" />
              <span>الهاتف: +966 50 123 4567</span>
            </div>
            <div className="flex items-center justify-center gap-3 md:col-span-2">
              <Clock className="w-6 h-6" />
              <span>ساعات العمل: من 9 صباحاً إلى 10 مساءً يومياً</span>
            </div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default HomePage;
