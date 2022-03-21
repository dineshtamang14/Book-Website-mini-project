import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { userRequest, publicRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state.stripeData;
  const cart = location.state.products;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);

  const sendEmail = async () => {
    try {
      await publicRequest.post("/orders/send_mail", {
        email: currentUser.email,
        name: currentUser.name,
        url: cart.products
      })
    } catch (error) {
      console.log(error);
    }
  }

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
    sendEmail();
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