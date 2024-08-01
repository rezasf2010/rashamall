"use client";
import { useState, useEffect } from "react";
import { fetchMessages } from "@/utils/requests";
import MessageCardAdmin from "@/componentsAdmin/MessageCardAdmin";
import { MessageCardSkeleton } from "@/ui/skeletons";
const AdminMessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllMessages = async () => {
      try {
        const messages = await fetchMessages();
        setMessages(messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllMessages();
  }, []);

  const handleDeleteMessage = (messageId) => {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message._id !== messageId),
    );
  };

  return (
    <section className="w-full">
      <div className="w-11/12 m-auto">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md bmessage m-4 md:m-0">
          <h2 className="text-xl md:text-3xl text-center font-semibold mb-6">
            لیست پیام ها
          </h2>
          <div className="">
            {loading ? (
              Array(5)
                .fill(null)
                .map((_, index) => <MessageCardSkeleton key={index} />)
            ) : messages.length === 0 ? (
              <p>پیامی موجود نیست</p>
            ) : (
              messages.map((message) => (
                <MessageCardAdmin
                  key={message._id}
                  message={message}
                  onDelete={handleDeleteMessage}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminMessagesPage;
