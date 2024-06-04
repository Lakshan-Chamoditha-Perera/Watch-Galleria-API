import { Request, Response } from 'express';

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req: Request, res: Response) => {
    console.log('CheckOutController : createCheckoutSession() {} :');

    try {
        const order = req.body;
        const lineItems = order.cart.map((storeItem: { 
            itemCode: string; 
            imageUrlList: []; 
            price: number; 
            quantity: number ;
            addToCartQuantity: number;
            description: string;

        }) => {
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: storeItem.itemCode,
                        images: storeItem.imageUrlList,
                        description: storeItem.description,
                    },
                    unit_amount: storeItem.price * 100,
                },
                quantity: storeItem.addToCartQuantity,
            };
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            shipping_address_collection: {
                allowed_countries: ["SL", "US", "CA", "GB", "FR", "IT", "ES", "NL", "BE", "DK", "SE", "NO", "FI", "AT", "CH", "IE", "PT", "PL", "CZ", "GR", "HU", "LU", "SK", "SI", "EE", "LT", "LV", "MT", "CY"],
            },
            line_items: lineItems,
            customer_email: order.userEmail,
            success_url: `http://localhost:5173/purchases/success`,
            cancel_url: `http://localhost:5173/purchases`,
            invoice_creation: {
                enabled: true,
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: "fixed_amount",
                        fixed_amount: {
                            amount: 0,
                            currency: "usd",
                        },
                        display_name: "Free shipping",
                        // Delivers between 5-7 business days
                        delivery_estimate: {
                            minimum: {
                                unit: "business_day",
                                value: 5,
                            },
                            maximum: {
                                unit: "business_day",
                                value: 7,
                            },
                        },
                    },
                },
            ],
        });

        res.send({ url: session.url });
    } catch (e: any) {
        console.log('Error : ' + e);
        res.status(500).json({ error: e.message });
    }
};
