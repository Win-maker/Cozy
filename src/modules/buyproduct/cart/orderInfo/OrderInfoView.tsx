import { useAppSelector } from "@/store";
import OrderSummaryCard from "../../chunks/OrderSummaryCard";

const OrderInfoView = () => {
  const customerInfo = useAppSelector((state) => state.order.customerInfo);

  if (!customerInfo) {
    return (
      <div className="text-center py-10 text-gray-500">
        No order information available.
      </div>
    );
  }

  return (
    <>
      <div
        className="w-[95%] flex justify-start items-center
             px-2 py-3 mx-auto font-secondary text-[rgba(58,163,159,1)] rounded-md mt-3"
        style={{
          backgroundColor: "rgba(58,163,159,0.13)",
        }}
      >
        Order created successfully!
      </div>

      <div className="lg:w-[95%] flex flex-col lg:flex-row lg:justify-between py-5 mx-auto font-secondary">
        <div className="w-full lg:w-[55%] min-h-[450px]  font-secondary mx-auto p-6 flex flex-col justify-between items-start">
          <h2 className="text-[28px] font-semibold mb-4 font-secondary">
            Order Information
          </h2>

          <hr className="border-t border-[rgba(232,232,235,1)] mb-4 w-full" />

          <div className="mb-4">
            <p className="text-sm text-gray-500">Order Number</p>
            <p className="mt-1 text-[rgba(0,0,0,1)] font-medium">
              {customerInfo.orderId}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="mt-1 text-[rgba(0,0,0,1)] font-medium">
                {customerInfo.name}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email Address</p>
              <p className="mt-1 text-[rgba(0,0,0,1)] font-medium">
                {customerInfo.email}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 md:text-center text-left">
                Phone Number
              </p>
              <p className="mt-1 text-[rgba(0,0,0,1)] font-medium md:text-center text-left">
                {customerInfo.phone}
              </p>
            </div>
          </div>

          <hr className="border-t border-[rgba(232,232,235,1)] mb-4 w-full" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
            <div>
              <p className="text-sm text-gray-500">Shipment</p>
              <p className="mt-1 text-[rgba(0,0,0,1)] font-medium">
                {customerInfo.shipment === "yangon"
                  ? "Free Yangon"
                  : "$8.50 Mandalay"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Payment Method</p>
              <p className="mt-1 text-[rgba(0,0,0,1)] font-medium">
                {customerInfo.payment === "cod"
                  ? "Cash on Delivery"
                  : "KBZ Pay"}
              </p>
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="text-sm text-gray-500">Address</p>
            <p className="mt-1 text-[rgba(0,0,0,1)] font-medium">
              {customerInfo.address}
            </p>
          </div>
        </div>

        <div className="w-full h-[60%] lg:w-[45%] flex sm:justify-center sm:items-start md:justify-center lg:justify-end px-0 md:px-4 lg:px-0 mt-6 md:mt-0">
          <OrderSummaryCard />
        </div>
      </div>
    </>
  );
};

export default OrderInfoView;
