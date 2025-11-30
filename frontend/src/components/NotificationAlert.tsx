import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { markAsRead } from '../common/Slices/notificationSlice';
import { RootState } from '../hooks/store';

const NotificationAlert: React.FC = () => {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state: RootState) => state.notification);
  const [visibleNotifications, setVisibleNotifications] = useState<string[]>([]);

  useEffect(() => {
    notifications.forEach(notification => {
      if (!visibleNotifications.includes(notification.id) && !notification.isRead) {
        showBrowserNotification(notification);
        
        setVisibleNotifications(prev => [...prev, notification.id]);
        
        setTimeout(() => {
          dispatch(markAsRead(notification.id));
          setVisibleNotifications(prev => prev.filter(id => id !== notification.id));
        }, 5000);
      }
    });
  }, [notifications, dispatch, visibleNotifications]);

  const showBrowserNotification = (notification: any) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/icon.png',
      });
    } else if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification(notification.title, {
            body: notification.message,
            icon: '/icon.png',
          });
        }
      });
    }
    
    console.log('New Notification:', notification);
  };

  return null; 
};

export default NotificationAlert;