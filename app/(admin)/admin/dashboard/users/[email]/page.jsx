'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import ProvinceCitySelect from '@/components/ProvinceCitySelect';
import Spinner from '@/components/Spinner';
import axios from 'axios';

const AdminUserDetailPage = () => {
  const { email } = useParams();
  const router = useRouter();

  //   const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [, setisNewUser] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    mobile: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
    },
  });

  useEffect(() => {
    setMounted(true);

    const fetchUserData = async () => {
      if (email) {
        try {
          const response = await axios.get(`/api/users/${email}`);
          const user = response.data;

          if (!user) {
            setisNewUser(true);
          } else {
            setFormData({
              name: user.name,
              username: user.username,
              mobile: user.mobile || '',
              phone: user.phone || '',
              email: user.email,
              address: {
                street: user.address?.street || '',
                city: user.address?.city || '',
                state: user.address?.state || '',
                zip: user.address?.zip || '',
              },
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [outerKey, innerKey] = name.split('.');
      setFormData((prevFormData) => ({
        ...prevFormData,
        [outerKey]: {
          ...prevFormData[outerKey],
          [innerKey]: value,
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);

      const res = await fetch(`/api/users/${email}`, {
        method: 'PUT',
        body: formData,
      });

      if (res.status === 200) {
        toast.success('ویرایش اطلاعات با موفقیت انجام شد');
        router.push(`/admin/dashboard/users`);
      } else if (res.status === 401 || res.status === 403) {
        toast.error('Permission denied');
      } else {
        toast.error('مشکل در بروزرسانی اطلاعات');
      }
    } catch (error) {
      console.log(error);
      toast.error('مشکل در بروزرسانی اطلاعات');
    }
  };

  if (loading) {
    return <Spinner loading={loading} />;
  }

  return (
    mounted && (
      <section className=" w-full">
        <div className="lg:w-11/12 lg:m-auto flex justify-center">
          <div className="bg-white w-full px-2 py-4 md:px-6 md:py-8 mb-4 shadow-md rounded-md border">
            <h1 className="text-xl lg:text-3xl text-center font-bold mb-4">ویرایش اطلاعات</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">
                  نام و نام خانوادگی
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full p-2 border rounded"
                  value={formData.name || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4 hidden">
                <label htmlFor="username" className="block text-gray-700">
                  نام کاربری
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="mt-1 block w-full p-2 border rounded"
                  value={formData.username || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="mobile" className="block text-gray-700">
                  تلفن همراه
                </label>
                <input
                  type="text"
                  id="mobile"
                  name="mobile"
                  className="mt-1 block w-full p-2 border rounded"
                  value={formData.mobile || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700">
                  تلفن ثابت
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className="mt-1 block w-full p-2 border rounded"
                  value={formData.phone || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="address.street" className="block text-gray-700">
                  آدرس
                </label>
                <input
                  type="text"
                  id="address.street"
                  name="address.street"
                  className="mt-1 block w-full p-2 border rounded"
                  value={formData.address.street || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <ProvinceCitySelect formData={formData} setFormData={setFormData} />
              <div className="mb-4">
                <label htmlFor="address.zip" className="block text-gray-700">
                  کد پستی
                </label>
                <input
                  type="text"
                  id="address.zip"
                  name="address.zip"
                  className="mt-1 block w-full p-2 border rounded"
                  value={formData.address.zip || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex w-full justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white w-full md:w-1/2 px-4 py-2 rounded"
                >
                  ذخیره اطلاعات
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    )
  );
};

export default AdminUserDetailPage;
