# sciences-applications-admin

An application for handling applications and preregistrations at the Faculty of Sciences of the University of Antananarivo.
For the administrations.

### configure this

Here is My appsettings.json , please configure yours

```
{
  "ConnectionStrings": {
    "ConnectionToFac": "Host=localhost;Database=[fac_database_name];Username=[your_username];Password=[your_password]",
    "ConnectionToBac": "Host=localhost;Database=[bac_database_name];Username=[your_username];Password=[your_password]"
  },
  "Jwt": {
    "Key": "LaClefSecreteDuGrandSANDANIAINAAdrien!!!",
    "Issuer": "http://localhost:5174",
    "Audience": "http://localhost:3000",
    "ExpireMinutes": 60
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

### API ROUTES

Since it's not practical to hardcode the API URL, I've configured the app so that we read it from the environment variable.

Create for yourself at the root of the frontend project a file `.env.local` containing the next line.

```
NEXT_PUBLIC_API_URL=http://localhost:5174/api
```
