import { collection, addDoc, getDocs, doc, deleteDoc, query, where } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage, projectId } from './firebase';

const getProductsCollectionRef = () => collection(db, `projects/${projectId}/products`);

export const addProduct = async (productData, imageFile) => {
  if (!productData.userId) {
    throw new Error('User ID is required to add a product.');
  }

  let imageUrl = '';
  if (imageFile) {
    const storageRef = ref(storage, `projects/${projectId}/images/${imageFile.name}-${Date.now()}`);
    const uploadResult = await uploadBytes(storageRef, imageFile);
    imageUrl = await getDownloadURL(uploadResult.ref);
  }

  const productWithImage = { ...productData, imageUrl, createdAt: new Date() };
  await addDoc(getProductsCollectionRef(), productWithImage);
};

export const getProducts = async () => {
  const q = query(getProductsCollectionRef());
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const deleteProduct = async (productId, imageUrl) => {
  // Delete product document from Firestore
  await deleteDoc(doc(getProductsCollectionRef(), productId));

  // If there's an image, delete it from Firebase Storage
  if (imageUrl) {
    try {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
    } catch (error) {
      console.warn("Error deleting product image from storage, might not exist: ", error);
    }
  }
};
