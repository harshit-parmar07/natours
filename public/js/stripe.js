/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51RxqfeGaIsZJR66x02duAlFEAWBi9KFOGrxfghah6rbjMx3sReHlBIGJtlzZKsbErhCSjJFjumykRS1YrkU6qJRK00pu1FavHj'
);

// export const bookTour = async (tourId) => {
//   try {
//     const session = await axios(
//       // method: 'GET',
//       `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
//     );
//     console.log(session);

//     await stripe.redirectToCheckout({
//       sessionId: session.data.session.id
//     });
//   } catch (err) {
//     showAlert('error', err);
//   }
// };

export const bookTour = async (tourId) => {
  try {
    // console.log('requesting session for', tourId);
    const { data } = await axios.get(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    await stripe.redirectToCheckout({ sessionId: data.session.id });
  } catch (err) {
    const msg =
      (err && err.response && err.response.data && err.response.data.message) ||
      err.message ||
      'Request failed';
    console.error(
      'bookTour error:',
      (err && err.response && err.response.data) || err
    );
    showAlert('error', msg);
  }
};
