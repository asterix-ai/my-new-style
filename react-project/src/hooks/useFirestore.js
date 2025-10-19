import { useState, useEffect, useCallback } from 'react';
import { collection, onSnapshot, query, orderBy, where, getDocs } from 'firebase/firestore';
import { db, projectId } from '../services/firebase';
import { useAuth } from './useAuth';

export const useFirestore = (collectionPath, condition = null) => {
  const { user, isAuthenticated, isMember, loading: authLoading } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCollectionRef = useCallback(() => {
    return collection(db, `projects/${projectId}/${collectionPath}`);
  }, [collectionPath]);

  useEffect(() => {
    if (authLoading) return; // Wait for auth to load
    if (!isAuthenticated || !isMember) {
      console.log("User not authenticated or not a member, skipping firestore listener.");
      setData([]);
      setLoading(false);
      setError('غير مصرح لك بالوصول إلى هذه البيانات.');
      return;
    }

    setLoading(true);
    setError(null);

    let q = query(getCollectionRef(), orderBy('createdAt', 'desc'));

    if (condition && condition.field && condition.operator && condition.value) {
      q = query(q, where(condition.field, condition.operator, condition.value));
    }

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const docs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setData(docs);
        setLoading(false);
      },
      (err) => {
        console.error(`Firestore error for ${collectionPath}:`, err);
        setError(`فشل في جلب البيانات: ${err.message}`);
        setLoading(false);
      }
    );

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [isAuthenticated, isMember, authLoading, collectionPath, getCollectionRef, condition]);

  return { data, loading, error };
};
