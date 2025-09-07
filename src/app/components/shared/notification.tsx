"use client";

import { useHomeContext } from '@/app/context/homeContext/homeContext';
import { notificationVariants } from '@/app/constants/data';

const Notification = () => {

  const {state} = useHomeContext()
  const type = state.notification.notificationType
  
  const variant = notificationVariants[type] || notificationVariants.info;
  const { Icon, iconClass, borderClass, bgClass, title: defaultTitle } = variant;

  return (
    <div
      className={`fixed top-5 right-5 flex items-center justify-between max-w-md mx-auto p-4 rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.05)] border ${borderClass} ${bgClass}`}
    >
      <div className="flex items-center">
        <Icon className={`mr-4 flex-shrink-0 ${iconClass}`} size={24} strokeWidth={2} />
        <div>
          <p className="font-semibold text-gray-800">
            {variant.title || defaultTitle}
          </p>
          {state.notification.message && (
            <p className="text-sm text-gray-600">{state.notification.message}</p>
          )}
        </div>
      </div>
      {/* You could add a close button here if needed */}
    </div>
  );
};

export default Notification;