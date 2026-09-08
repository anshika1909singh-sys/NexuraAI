import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  updateDoc,
  doc,
  serverTimestamp
} from "firebase/firestore";

import { db } from "../firebase/firebase";

const notificationsRef = collection(db, "notifications");

/**
 * Create a notification for a specific user.
 */
export const createNotification = async ({
  recipientId,
  type,
  title,
  message,
  relatedId = null,
  tab = null
}) => {
  if (!recipientId) {
    throw new Error("Notification recipient is required.");
  }

  const notification = {
    recipientId,
    type,
    title,
    message,
    relatedId,
    tab,
    read: false,
    createdAt: serverTimestamp()
  };

  const docRef = await addDoc(
    notificationsRef,
    notification
  );

  return {
    id: docRef.id,
    ...notification
  };
};

/**
 * Get notifications belonging to the logged-in user.
 */
export const getUserNotifications = async (
  userId
) => {
  if (!userId) {
    return [];
  }

  const q = query(
    notificationsRef,
    where("recipientId", "==", userId),
    orderBy("createdAt", "desc"),
    limit(50)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data()
  }));
};

/**
 * Mark one notification as read.
 */
export const markNotificationAsRead = async (
  notificationId
) => {
  const notificationRef = doc(
    db,
    "notifications",
    notificationId
  );

  await updateDoc(notificationRef, {
    read: true
  });

  return {
    success: true
  };
};

/**
 * Mark all supplied notifications as read.
 */
export const markAllNotificationsAsRead = async (
  notifications
) => {
  const unreadNotifications =
    notifications.filter(
      (notification) => !notification.read
    );

  await Promise.all(
    unreadNotifications.map(
      (notification) =>
        markNotificationAsRead(notification.id)
    )
  );

  return {
    success: true
  };
};