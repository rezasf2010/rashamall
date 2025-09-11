'use client';
import { useState } from 'react';
import { toast } from 'react-toastify';

const MessageForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    body: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.status === 401) {
        toast.error('ابتدا وارد حساب کاربری شوید');
        return;
      }

      if (res.ok) {
        toast.success('پیام شما با موفقیت ارسال شد');
        setFormData({ name: '', email: '', subject: '', body: '' });
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Failed to send message', error);
      toast.error('Something went wrong');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-blue-200 shadow-lg mx-8 p-3 rounded-lg flex flex-col items-center"
    >
      <div className="flex flex-col items-start sm:flex-row gap-4 sm:items-center mb-4 w-full">
        <label htmlFor="name" className="p-2 font-bold text-gray-700  flex-shrink-0">
          نام و نام خانوادگی:{' '}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="border border-gray-300 rounded-lg h-10 px-2 text-gray-700 w-full"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col items-start sm:flex-row gap-4 sm:items-center mb-4 w-full">
        <label htmlFor="email" className="p-2 font-bold text-gray-700">
          ایمیل:{' '}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="border border-gray-300 rounded-lg h-10 px-2 text-gray-700 w-full text-end"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col items-start sm:flex-row gap-4 sm:items-center mb-4 w-full">
        <label htmlFor="subject" className="p-2 font-bold text-gray-700">
          موضوع:{' '}
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          className="border border-gray-300 rounded-lg h-10 px-2 text-gray-700 w-full"
          value={formData.subject}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col items-start sm:flex-row gap-4 sm:items-center mb-4 w-full">
        <label htmlFor="message" className="p-2 font-bold text-gray-700">
          پیام:{' '}
        </label>
        <textarea
          id="message"
          rows="4"
          name="body"
          className="border border-gray-300 rounded w-full py-2 px-3 resize-none text-gray-700"
          value={formData.body}
          onChange={handleChange}
        ></textarea>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-4/5 focus:outline-none focus:shadow-outline"
        type="submit"
      >
        ارسال
      </button>
    </form>
  );
};

export default MessageForm;
