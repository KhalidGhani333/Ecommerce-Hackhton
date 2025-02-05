import { shipEngine } from "@/helper/shipEngine";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    return new Response(JSON.stringify({message:"shipEngine testing"}))
}

export async function POST(request:NextRequest){
    const {shipToAddress, packages} = await request.json();
    try {
        const shipmentDetails = await shipEngine.getRatesWithShipmentDetails({
            shipment:{
                shipTo:shipToAddress,
                shipFrom:{
                    name:"Khalid Ghani",
                    phone:"03123549066",
                    addressLine1:"Address 1",
                    addressLine2:"Address 2",
                    cityLocality:"karachi",
                    stateProvince:"sindh",
                    postalCode:"12345",
                    countryCode:"PK",
                    addressResidentialIndicator:"no",
                },
                packages:packages,
            },
            rateOptions:{
                carrierIds:[
                    process.env.SHIPENGINE_FIRST_COURIER || "",
                    process.env.SHIPENGINE_SECOND_COURIER || "",
                    process.env.SHIPENGINE_THIRD_COURIER || "",
                    process.env.SHIPENGINE_FOURTH_COURIER || "",
                ].filter(Boolean)
            }
        });

        return new Response(JSON.stringify(shipmentDetails),{status:200})
        
    } catch (error) {
        return new Response(JSON.stringify({error:"Error Occur"}))
    }
}