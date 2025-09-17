# mhrsntrk.com

Recently, I was experimenting on using a Headless CMS (Strapi) as a backend for my personal website. I found [Lee's personal website](https://leerob.io) as a perfect frontend donor for my personal website.
His Next.js + Tailwind CSS frontend looks lovely but he uses MDX as a data provider for his website and I tought I can go further on it and adapt Strapi CMS backend as a data provider. It worked very well.
You can find all the instructions below to build your own. Cheers!

## Running Locally (Frontend)

```bash
$ git clone https://github.com/mhrsntrk/mhrsntrk.com.git
$ cd mhrsntrk.com
$ yarn
$ yarn dev
```

## Running Locally (Backend)image.png

You can also [follow the instructions on this page](https://strapi.io/documentation/v3.x/installation/cli.html) to create a Strapi project locally.

### Step 1. Setup an Empty Strapi Project

```bash
$ yarn create strapi-app backend --quickstart
$ yarn develop
```
You can access your Strapi at [http://localhost:1337](http://localhost:1337) and it will prompt you to create an admin user. 

### Step 2. Install GraphQL for Strapi

You should stop the server using Control+C and install GraphQL using below commands. 

```bash
$ yarn strapi install graphql
$ yarn develop
```

### Step 3. Create an `Author` Collection

From **Content-Types Builder**, **create a new collection type**.

- The display name should be `Author`.

Next, add these fields below,

- **Text** field called **`name`** (**Short text**)
- **Media** field called **`avatar`** (**Single media**)

Then click **Save**.

### Step 4. Create a `Gear` Collection

From **Content-Types Builder**, **create a new collection type**.

- The display name should be `Gear`.

Next, add these fields below,

- **Text** field called **`title`** (**Short text**)
- **Rich Text** field called **`content`** (**Multiple-paragraph Text**)

Then click **Save**.

### Step 5. Create a `Post` Collection

From **Content-Types Builder**, **create a new collection type**.

- The display name should be `Post`.

Next, add these fields (you don't have to modify the settings unless specified):

- **Text** field called **`title`** (**Short text**)
- **Rich Text** field called **`content`** (**Multiple-paragraph Text**)
- **Date** field called **`date`** (type should be **date**)
- **Text** field called **`excerpt`** (**Long text**)
- **UID** field called **`slug`** (attached field should be **title**)
- **Relation** field called **`author`** (Post **has one** Author)

### Step 6. Set permissions

From **Settings, Users & Permissions, Roles**, edit the **Public** role.

Then select: `count`, `find`, and `findone` permissions for both **Author**, **Gear** and **Post**. Click **Save**.

### Step 7. Populate Content

Select **Author** and click **Add New Author**.

- You just need **1 Author entry**.
- Use dummy data for the name.
- For the image, you can download one from [Unsplash](https://unsplash.com/).

Select **Gear** and click **Add New Gear**.

- You will need only **1 Gear entry** so you can name the title "My Gear"
- You can use H4 and UL for the entries for the **content** field. 

Next, select **Posts** and click **Add New Post**.

- We recommend creating at least **2 Post records**.
- You can use dummy data for the text.
- You can write markdown for the **content** field.
- You can use dummy data for the **excerpt** firled.
- Pick the **Author** you created earlier.
- Pick a date.

## Environment Variables

Create a `.env.local` on Next.js frontend with below variables. 

- `NEXT_PUBLIC_STRAPI_API_URL` should be set as `http://localhost:1337` (no trailing slash).
- `NEXT_PUBLIC_QROXY_API`
- `NEXT_PUBLIC_INFURA_API_KEY`
- `NEXT_PUBLIC_ETHERSCAN_API_KEY`

## Tech Stack

- [Next.js](https://nextjs.org/)
- [Vercel](https://vercel.com)
- [Tailwind CSS](https://tailwindcss.com/)
- [Strapi CMS](https://strapi.io/)
