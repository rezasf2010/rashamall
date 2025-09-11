import { useState, useEffect } from 'react';
import provincesAndCities from '@/assets/data/provinceCityInfo.json';

const ProvinceCitySelect = ({ formData, setFormData }) => {
  const [, setSelectedProvince] = useState('');
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (formData.address.state) {
      setSelectedProvince(formData.address.state);
      setCities(provincesAndCities[formData.address.state] || []);
    }
  }, [formData.address.state]);

  const handleProvinceChange = (e) => {
    const province = e.target.value;
    setSelectedProvince(province);
    setCities(provincesAndCities[province] || []);
    setFormData({
      ...formData,
      address: { ...formData.address, state: province, city: '' },
    });
  };

  const handleCityChange = (e) => {
    setFormData({
      ...formData,
      address: { ...formData.address, city: e.target.value },
    });
  };

  return (
    <div className="w-full md:flex col-span-2 gap-4">
      <div className="mb-4 w-full">
        <label htmlFor="state" className="block text-gray-700">
          استان
        </label>
        <select
          id="state"
          name="address.state"
          className="mt-1 block w-full p-2 border rounded"
          value={formData.address.state || ''}
          onChange={handleProvinceChange}
          required
        >
          <option value="" disabled>
            انتخاب کنید
          </option>
          {Object.keys(provincesAndCities).map((province) => (
            <option key={province} value={province}>
              {province}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4 w-full">
        <label htmlFor="city" className="block text-gray-700">
          شهر
        </label>
        <select
          id="city"
          name="address.city"
          className="mt-1 block w-full p-2 border rounded"
          value={formData.address.city || ''}
          onChange={handleCityChange}
          required
        >
          <option value="" disabled>
            انتخاب کنید
          </option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ProvinceCitySelect;
