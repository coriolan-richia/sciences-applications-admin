# sciences-applications-admin

An application for handling applications and preregistrations at the Faculty of Sciences of the University of Antananarivo.
For the administrations.

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
