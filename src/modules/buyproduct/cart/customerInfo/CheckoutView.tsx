import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import OrderSummaryCard from "../../chunks/OrderSummaryCard";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { setOrderForm } from "@/store/features/Order/orderSlice";
import { useEffect, useState } from "react";

const personalInfoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
   phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  address: z.string().min(1, "Address is required"),
  shipment: z.enum(["yangon", "mandalay"]),
  payment: z.enum(["cod", "kpay"]),
});

type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;

const CheckoutView = () => {

const [isFormValid, setIsFormValid] = useState(false);
const dispatch = useDispatch();


const handleCheckout = async () => {
  const isValid = await form.trigger();
  if (!isValid) return; 

  const values = form.getValues(); 


    const orderId = uuidv4();

  const payload = {
    ...values,
    orderId,
  }
  dispatch(setOrderForm(payload));
};


const form = useForm<PersonalInfoFormValues>({
  resolver: zodResolver(personalInfoSchema),
  defaultValues: {
    name: "",
    email: "",
    phone: "",
    address: "",
    shipment: "yangon",
    payment: "cod",
  },
  mode: "onChange",
});

useEffect(() => {
  setIsFormValid(form.formState.isValid);
}, [form.formState.isValid]);

  const onSubmit = (values: PersonalInfoFormValues) => {
    console.log(values);
  };

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between p-6">
      <div className="w-full lg:w-[55%] font-secondary lg:ml-15">
        <Form {...form}>
          <h1 className="font-bold text-2xl font-secondary mb-6">
            Personal Information
          </h1>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Name"
                        className="input-borderColor rounded-none py-2 
                       focus:ring-0"
                      />
                    </FormControl>
                    <FormMessage  className="text-red-600"/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Email Address"
                        className="input-borderColor"
                      />
                    </FormControl>
                    <FormMessage  className="text-red-600"/>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      placeholder="Phone Number"
                      className="input-borderColor"
                    />
                  </FormControl>
                  <FormMessage className="text-red-600"/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Address"
                      className="pb-15 pt-5 input-borderColor"
                    />
                  </FormControl>
                  <FormMessage  className="text-red-600"/>
                </FormItem>
              )}
            />

            <Separator />

            <div className="space-y-3">
              <FormLabel>Shipment Method</FormLabel>
              <FormField
                control={form.control}
                name="shipment"
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="space-y-3"
                  >
                    <div className="flex-col items-center py-3 border border-[rgba(209,209,216,1)]">
                      <div className="flex items-center justify-start space-x-3 border-b border-b-[rgba(209,209,216,1)] py-1">
                        <RadioGroupItem
                          value="yangon"
                          id="yangon"
                          className="mx-2 mb-3"
                        />
                        <Label
                          htmlFor="yangon"
                          className="flex-1 cursor-pointer flex justify-between items-center mb-3"
                        >
                          Free Yangon
                        </Label>
                      </div>

                      <div className="flex items-center justify-start space-x-3 py-1">
                        <RadioGroupItem
                          value="mandalay"
                          id="mandalay"
                          className="mx-2 mt-3"
                        />
                        <Label
                          htmlFor="mandalay"
                          className="flex-1 cursor-pointer flex justify-between mt-3"
                        >
                          <span>$8.50 Mandalay</span>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                )}
              />
            </div>

            <div className="space-y-3">
              <FormLabel>Payment Method</FormLabel>
              <FormField
                control={form.control}
                name="payment"
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="space-y-3"
                  >
                    <div className="flex-col items-center py-3 border border-[rgba(209,209,216,1)]">
                      <div className="flex items-center justify-start space-x-3 border-b border-b-[rgba(209,209,216,1)] py-1">
                        <RadioGroupItem
                          value="cod"
                          id="cod"
                          className="mx-2 mb-3"
                        />
                        <Label
                          htmlFor="cod"
                          className="flex-1 cursor-pointer flex justify-between items-center mb-3"
                        >
                          <div className="flex gap-3 items-center">
                            <span className="font-medium">
                              Cash on delivery
                            </span>
                            <span className="text-sm text-muted-foreground">
                              Regular payment
                            </span>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center justify-start space-x-3 py-1">
                        <RadioGroupItem
                          value="kpay"
                          id="kpay"
                          className="mx-2 mt-3"
                        />
                        <Label
                          htmlFor="kpay"
                          className="flex-1 cursor-pointer flex justify-between mt-3"
                        >
                          <div className="flex gap-3 items-center">
                            <span className="font-medium">KBZ Pay</span>
                            <span className="text-sm text-muted-foreground">
                              Digital Payment
                            </span>
                          </div>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                )}
              />
            </div>
          </form>
        </Form>
      </div>

      <div className="w-full h-[60%]  lg:w-[45%] flex sm:justify-center sm:items-start md:justify-center lg:justify-end px-0 md:px-4 mt-6 md:mt-0 ">
        <OrderSummaryCard  onCheckout={handleCheckout} isFormValid={isFormValid} />
      </div>
    </div>
  );
};

export default CheckoutView;
