# sciences-applications-admin

An application for handling applications and preregistrations at the Faculty of Sciences of the University of Antananarivo.
For the administrations.

2 databases on backend/sql

The bac may take a will to Dump ( cut whith ctrl+c if it is to long (while inserting the data))

```
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=[your_database];Username=[your_user];Password=[your_password]"
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
