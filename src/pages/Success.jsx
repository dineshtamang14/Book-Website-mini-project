import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { userRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state.stripeData;
  const cart = location.state.products;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);

//   const emailData = {
//     from: "dineshshah960@gmail.com",
//     to: currentUser.email,
//     subject: `Purchased Books`,
//     html: `
//         <h1>Hi, ${currentUser.name}</h1>
//         <p>Sir, you can download books pdf from this  urls given below: </p>
//         <hr />
//         ${cart.products.map((item) => {
//           <ol type="1">
//             <li>${item.pdf}</li>
//           </ol>
//         })}
//     `
// };

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products?.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        setOrderId(res.data._id);
      } catch(error) {
        console.log(error);
        toast(`something went..${error}`, { type: "success" });
      }
    };
    data && createOrder();
  }, [cart, data, currentUser]);

  const handleClick = () => {
    toast("Ordered successfully...!", { type: "success" });
    navigate("/");
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <button style={{ padding: 10, marginTop: 20 }} onClick={handleClick}>Go to Homepage</button>
    </div>
  );
};

export default Success;