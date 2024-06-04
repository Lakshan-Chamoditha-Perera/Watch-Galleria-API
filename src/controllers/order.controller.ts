import { Request, Response } from 'express';
import { UnprocessableEntity } from "../util/exceptions/ValidationException";
import { ErrorCodes, HttpException } from "../util/exceptions/HttpException";

import { StandardResponse } from "../util/payloads/StandardResponse";
import { saveOrder, findOrdersByEmail } from "../service/order.service";
import { custom } from 'zod';

export const createOrder = async (req: Request, res: Response,) => {
    console.log('OrderController : createOrder() {} :');
    try {
        let order = req.body;
        console.log(order);
        let isSaved = await saveOrder(order);
        res.status(201).send(new StandardResponse(201, "Order created successfully", isSaved));
    } catch (error: any) {
        console.log('Error : ' + error)
        if (error.name === 'ZodError') {
            console.log('ZodError')
            res.status(422).send(error);
        } else {
            console.log('Server Error : ' + error.data)
            res.status(500).send(new HttpException(error.message, ErrorCodes.SERVER_ERROR, 500, error));
        }
    }
}


export const getOrdersByEmail = async (req: Request, res: Response) => {
    console.log('OrderController : getOrdersByEmail() {} :');
    try {
        let email = req.params.email;
        console.log(email);
        let orders = await findOrdersByEmail(email);
        res.status(200).send(new StandardResponse(200, "Orders fetched successfully", orders));
    } catch (error: any) {
        console.log('Error : ' + error)
        if (error.name === 'ZodError') {
            console.log('ZodError')
            res.status(422).send(error);
        } else {
            console.log('Server Error : ' + error.data)
            res.status(500).send(new HttpException(error.message, ErrorCodes.SERVER_ERROR, 500, error));
        }
    }
}


const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
export const createCheckoutSession = async (req: Request, res: Response) => {
    console.log('OrderController : createCheckoutSession() {} :');

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
