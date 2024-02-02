import { useEffect, useState } from 'react';
import { axiosNode } from '../../axios/axios';
import { AxiosError } from 'axios';
import { INotification } from './types';

const Notification = () => {
  const [notifs, setNotifs] = useState<INotification[]>([]);
  useEffect(() => {
    const getNotifications = async () => {
      try {
        const notifications = await axiosNode.get('/notification');
        setNotifs(notifications.data);
      } catch (err) {
        if (err instanceof AxiosError) {
        } else if (err instanceof Error) {
        }
      }
    };
    getNotifications();
  }, []);
  return (
    <div>
      {notifs &&
        notifs.map((notif) => (
          <div
            key={notif.id}
            className="p-5 border border-neutral-05 rounded-lg shadow-card flex gap-4 mb-4"
          >
            <div>
              <img src={notif.image} width={80} alt="notif-image" />
            </div>
            <div>
              <h1 className="font-semibold text-lg">{notif.title}</h1>
              <p className="font-medium mt-2 text-sm">{notif.body}</p>
            </div>
          </div>
        ))}
    </div>
  );
};
export default Notification;
