import axios from 'axios';

export const useViesVerification = async (searchVatId, handleChange) => {
  const result = await axios.get(`/api/verify?vat=${searchVatId}`);
  const {
    data: { data },
  } = result;
  console.log(data);

  if (data.valid) {
    const splittedAddres = data.address.split(',');
    const streetVies = splittedAddres[0];
    const postCodeVies = splittedAddres[1].split(' ')[1].replace('-', '');
    const townVies = splittedAddres[1].split(' ')[2];

    handleChange((state) => ({
      ...state,
      name: data.name,
      vat_number: data.countryCode + data.vatNumber,
      country: data.countryCode,
      town: townVies,
      street: streetVies,
      postCode: data.countryCode + postCodeVies,
    }));
  }
};
