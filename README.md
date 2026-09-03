# Wishlist Trust Builder

Build "FabricDNA" — a new decision card feature for the Myntra mobile web app. 

I have attached two images:

1. A screenshot of the actual Myntra Wishlist (use this to perfectly match the CSS padding, fonts, icons, and colors).

2. A mockup of the new "FabricDNA" expanded feature.

I am also attaching the Product Spec and the JSON Data model below. 

Before building, confirm the screen list and data model match the spec. Ensure the UI you build dynamically consumes the JSON structure provided.

SPEC:

[One-Liner & Value Proposition 

One-Liner: FabricDNA is an interactive Wishlist decision engine that eliminates buyer hesitation by combining AI-driven fabric validation, unedited visual proof, and stress-free logistics. 

Value Proposition: We bridge the trust gap between polished catalog imagery and real-world expectations. By guaranteeing after-hours returns and providing unvarnished quality data, we transform high-intent Wishlist items into confident, zero-risk purchases for time-starved professionals. 

Target User & Problem 

Target Audience: Working professional men, aged 25-34, who want to upgrade their wardrobe with premium clothing but frequently abandon their carts due to lingering logistical and material doubts. 

Quality Uncertainty: This user is highly cynical about heavily edited, perfectly lit studio photography. They refuse to pay premium prices without knowing exactly how a fabric drapes, feels, and survives a wash in the real world. 

Return Anxiety: The standard 9-to-5 return window is fundamentally incompatible with their schedule. The fear of navigating a logistical nightmare—specifically, coordinating with delivery agents during peak work meetings—stops them from taking a chance on new fits or unfamiliar brands. 

Core Experience When a user browses their Wishlist, they can tap a verification prompt under any saved item to seamlessly expand the FabricDNA panel. This dashboard instantly establishes trust by displaying a "Fabric Truth Score," which uses AI to distill thousands of raw customer reviews into a single, honest metric focused strictly on material quality and durability. Alongside this score, the user views "Studio Proof"—three unedited, authentic photos sourced directly from Myntra Studio creators to demonstrate how the garment actually looks in natural lighting and everyday settings. Finally, the panel secures the transaction by offering the "Working-Pro Guarantee," locking in flexible 7-10 PM or weekend return pickups paired with instant refunds, effectively removing the final psychological barrier to moving the item to their bag. 

Out of Scope for V1 

User-generated video uploads or live-commerce integrations. 

Express 4-hour delivery or hyper-local fulfillment tracking. 

Implementation on the main Product Display Page (PDP) or category search grids (V1 is restricted entirely to the Wishlist environment). 

Dynamic negotiation of return slots outside the fixed evening and weekend blocks. 

Automated sizing recommendations, 3D measurements, or virtual try-on avatars. ]

DATA MODEL:

[{

  "models": [

    {

      "entity": "FabricDNA",

      "description": "The core data object that populates the expanded verification panel on a wishlist product card.",

      "fields": [

        {

          "name": "id",

          "type": "string",

          "required": true,

          "description": "Unique identifier for the FabricDNA record."

        },

        {

          "name": "productId",

          "type": "string",

          "required": true,

          "description": "Foreign key mapping to the Myntra catalog Product."

        },

        {

          "name": "truthScore",

          "type": "integer",

          "required": true,

          "description": "AI-generated fabric quality metric (0-100)."

        },

        {

          "name": "studioImageUrls",

          "type": "array[string]",

          "required": true,

          "description": "Array of exactly 3 URLs pointing to unedited, real-world creator photos."

        },

        {

          "name": "workingProGuaranteeEligible",

          "type": "boolean",

          "required": true,

          "description": "Determines if the product supports 7-10 PM / Weekend return slots and instant refunds."

        }

      ],

      "relationships": [

        {

          "type": "belongsTo",

          "targetEntity": "Product",

          "foreignKey": "productId"

        }

      ]

    },

    {

      "entity": "WishlistItem",

      "description": "Existing entity mapping a user to a saved product. Assumed to be augmented or joined with FabricDNA on the frontend.",

      "fields": [

        {

          "name": "id",

          "type": "string",

          "required": true

        },

        {

          "name": "userId",

          "type": "string",

          "required": true

        },

        {

          "name": "productId",

          "type": "string",

          "required": true

        }

      ],

      "relationships": [

        {

          "type": "hasOne",

          "targetEntity": "FabricDNA",

          "reference": "productId"

        }

      ]

    }

  ]

}]

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://fabric-trust-hub.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/59539a55-95e9-4890-bbc0-e806455d1398).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
