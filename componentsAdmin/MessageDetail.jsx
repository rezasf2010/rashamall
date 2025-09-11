'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { convertToJalaali } from '@/utils/calenderConvert';
import { fetchUsers, fetchMessage } from '@/utils/requests';

const MessageDetail = () => {
  const [message, setMessage] = useState({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const messageId = params.id;

  useEffect(() => {
    const fetchData = async () => {
      if (!messageId) return;
      try {
        const users = await fetchUsers();
        const message = await fetchMessage(messageId);
        setUsers(users);
        setMessage(message);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const persianDateAndTime = message.updatedAt ? convertToJalaali(message.updatedAt) : 'N/A';
  const user = users.find((user) => user._id === message.sender);

  if (loading) {
    return <Spinner loading={loading} />;
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-lg sm:text-xl md:text-3xl text-center font-semibold mb-6">جزییات پیام</h2>
      <div className="border border-gray-200 rounded-xl shadow-xl p-3 flex flex-col gap-3">
        <div className="message-time text-sm sm:text-base">
          <span className="font-semibold">زمان پیام :</span> {persianDateAndTime}
        </div>

        <div className="orderer text-sm sm:text-base">
          <span className="font-semibold">فرستنده :</span> {user.name}
        </div>

        <div className="orderer text-sm sm:text-base">
          <span className="font-semibold">ایمیل :</span> {user.email}
        </div>

        <div className="orderer text-sm sm:text-base">
          <span className="font-semibold">موضوع پیام :</span> {message.subject}
        </div>

        <div className="orderer text-sm sm:text-base">
          <span className="font-semibold">متن پیام :</span> {message.body}
        </div>

        <div className="flex justify-center gap-3 mt-6">
          <Link href="/admin/dashboard/messages" passHref>
            <button className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500">
              بازگشت
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MessageDetail;
