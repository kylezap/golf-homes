import axios from "axios";
import { db } from "../db/connection";
import { properties as propertiesTable } from "../db/schema";
import { eq } from "drizzle-orm";
import dotenv from "dotenv";
dotenv.config();

export async function syncPropertiesWithMLS() {
  try {
    // Fetch properties from MLS API
    // https://bridgedataoutput.com/docs/platform/API/bridge

    const response = await axios.get(
      `https://api.bridgedataoutput.com/api/v2/OData/test/Property?access_token=${process.env.MLS_API_KEY}`
    );

    const propertiesList = response.data.value;

    // console.log(properties);

    for (const property of propertiesList) {
      const address = property.UnparsedAddress;
      if (!address) {
        console.warn("Skipping property with missing address:", property);
        continue;
      }
      const price = property.ListPrice;
      const bedrooms = property.BedroomsTotal || 0;
      const bathrooms = property.BathroomsTotalInteger || 0;
      const description = property.PublicRemarks || "";
      const sqft = property.LivingArea || 0;
      const image = property.Media?.[0]?.MediaURL || null;
      const metadata = property;

      const existingProperty = await db
        .select()
        .from(propertiesTable)
        .where(eq(propertiesTable.address, address))
        .execute();

      if (existingProperty.length > 0) {
        //Update existing property
        await db
          .update(propertiesTable)
          .set({
            price: price,
            bedrooms: bedrooms,
            bathrooms: bathrooms,
            description: description,
            sqft: sqft,
            image: image,
            metadata: metadata,
          })
          .where(eq(propertiesTable.address, address))
          .execute();
      } else {
        //Insert new property
        await db.insert(propertiesTable).values({
          address: address,
          price: price,
          bedrooms: bedrooms,
          bathrooms: bathrooms,
          description: description,
          sqft: sqft,
          image: image,
          metadata: metadata,
        })
        .execute();
      }
    }
    console.log("Properties synced with MLS successfully");
  } catch (error) {
    console.error("Error syncing properties with MLS:", error);
  }
}

syncPropertiesWithMLS();
