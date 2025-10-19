export const isValidEmail = (email) => {
  // Basic email regex validation
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const getFirebaseErrorMessage = (error) => {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'البريد الإلكتروني هذا مستخدم بالفعل.';
    case 'auth/invalid-email':
      return 'صيغة البريد الإلكتروني غير صالحة.';
    case 'auth/weak-password':
      return 'كلمة المرور ضعيفة جدًا، يجب أن تتكون من 6 أحرف على الأقل.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'البريد الإلكتروني أو كلمة المرور غير صحيحة.';
    case 'auth/requires-recent-login':
      return 'يجب عليك تسجيل الدخول مرة أخرى لإتمام هذه العملية.';
    case 'auth/too-many-requests':
      return 'تم حظر هذا الحساب بسبب كثرة محاولات تسجيل الدخول الفاشلة. حاول لاحقًا.';
    default:
      return `حدث خطأ: ${error.message}`;
  }
};
