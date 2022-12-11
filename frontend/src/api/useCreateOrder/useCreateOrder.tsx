import { gql } from "@apollo/client";
import { client } from "../../apollo-client";

export type ItemInput = {
  item: string;
  quantity: number;
};

export type OrderInput = {
  items: ItemInput[];
  customerName: string;
  customerDiscordID: string;
  powerbase: string;
  role: string;
  totalCost: number;
  deliveryOrCollection: string;
  deliveryLocation?: string;
  notes?: string;
};

const useCreateOrder = () => {
  const apiClient = client;

  const execute = async (order: OrderInput) => {
    await apiClient.mutate({
      mutation: gql`
        mutation CreateOrder($order: OrderInput!) {
          createOrder(data: $order) {
            data {
              attributes {
                notes
              }
            }
          }
        }
      `,
      variables: {
        order: { ...order },
      },
    });
  };

  return { execute };
};

export { useCreateOrder };
