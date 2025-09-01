This repo contains the web-based crowdsourcing platform for the Themis framework. For our RLHF system visit: [https://anonymous.4open.science/r/Themis-157E](https://anonymous.4open.science/r/Themis-157E) (Open in new tab).

# Crowdsourcing platform setup guide

This framework integrates with four external services to function optimally. Follow the steps below to configure each service and get your project up and running.

## External Services

1. **Clerk (Authentication)**

   - Used to enable user authentication via Google. Other providers (GitHub, Apple, etc.) may also be supported.

   [Clerk Documentation](https://clerk.com/)

2. **Azure Blob Storage (File Storage)**

   - Used for storing video files.

   [Azure Blob Storage Documentation](https://docs.microsoft.com/en-us/azure/storage/blobs/)

3. **Cloudflare Tunnel (Networking)**

   - Provides a secure connection between your server and the internet by forwarding traffic.

   [Cloudflare Tunnel Documentation](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/)

4. **Resend (Email Notifications)**

   - Sends email notifications to users when new machine learning outputs are available.

   [Resend Documentation](https://resend.com/)

## Setup Instructions

### Step 1: Set Up Cloudflare Tunnel

1. Sign up for a Cloudflare account and create a Cloudflare Tunnel.
2. Configure the tunnel to forward traffic from your domain to `localhost` on port 80 (where the tunnel will be running).
   - **Tip**: This process is easier if your domain is registered with Cloudflare.
3. Follow the Cloudflare guide to set this up:  
   [Cloudflare Tunnel Setup Guide](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/)

### Step 2: Configure Clerk for Authentication

1. Sign up for a Clerk account: [Clerk Sign-Up](https://clerk.com/)
2. Enable Google as the authentication provider (other providers are optional).
3. In Clerk, navigate to the development section and create a production instance.
4. Follow Clerk’s documentation to obtain your **Publishable Key** and **Secret Key**.
   - These keys will be used for authentication in your app.
5. Go to Configure/domains to set up the DNS settings.
6. Go to Configure/Paths do setup the domain names for the app, sing-up and sign-in pages.
7. Go to Configure/Sessions and customize user session token. Add the following under Claims:
   ```yaml
      {
	      "metadata": "{{user.public_metadata}}"
      }
   ```

### Step 3: Set Up Azure Blob Storage

1. Sign up for an Azure account and create a Blob Storage bucket.
2. Create a container named `videos` for storing the video files.
3. Obtain the following from Azure:
   - **Connection String**
   - **Public URL** for the bucket (format: `https://[accountName].blob.core.windows.net/videos/`).

### Step 4: Configure Resend for Email Notifications

1. Sign up for a Resend account using the domain where the service will run.
2. Obtain an **API Key** from Resend for email functionality.

### Step 5: Fill In Configuration Files

1. **Secrets Configuration**  
   Open the `secrets.yaml` file and fill in the following values, ensuring they are **Base64 encoded**:

   - `DATALAKE_CONNECTION_STRING`: The connection string obtained from Azure.
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk's Publishable Key.
   - `CLERK_SECRET_KEY`: Clerk's Secret Key.
   - `RESEND_API_KEY`: API Key from Resend.
   - Choose secure values for the MongoDB username, password, and private API key (also Base64 encoded).

2. **Public URL Configuration**  
   In `config.yaml`, set the `PUBLIC_DATALAKE_URL` to the Azure Blob Storage URL obtained earlier.

3. **Domain Configuration**  
   In `ingress.yaml`, replace the placeholder domain with the domain your service will run on:

   ```yaml
   spec:
     rules:
       - host: example.yourdomain.com
   ```

4. **Middleware Configuration**  
   In `middleware.yaml`, update the domain to match your service's domain:

   ```yaml
   accessControlAllowOriginList:
     - "https://example.yourdomain.com"
   ```

### Step 5: Install k3s and Apply Configurations

1. Install k3s on your server: [k3s Installation Guide](https://k3s.io/)
2. Apply the `yaml` files to the default namespace in your k3s cluster to deploy your service.

### Step 6: Create the first admin account in the Clerk dashboard
Register into the website with the account you intent to use as admin. Go to the Clerk Dashboard, find the user and in its profile add the followoing under public Metadata:
```yaml
   {
      "role": "admin"
   }
```
You only need to this step for the first admin user. Other user's roles can be changed from the admin page on the website. 

### Step 7: Use the hitl library to upload videos and get the preference results
In the developer page on the question mark are the instructions on how to upload videos and download the results.

### Done: You can now begin to set-up your human studies and experiment with RLHF models
