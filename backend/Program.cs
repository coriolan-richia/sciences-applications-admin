using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

using backend.Context;
using backend.Models.Enums;
using backend.Models.Fac;

var builder = WebApplication.CreateBuilder(args);

var FacConnectionString = builder.Configuration.GetConnectionString("ConnectionToFac") ?? throw new InvalidOperationException("Connection string"
        + "'ConnectionToFac' not found.");
var BacConnectionString = builder.Configuration.GetConnectionString("ConnectionToBac") ?? throw new InvalidOperationException("Connection string"
        + "'ConnectionToBac' not found.");

builder.Services.AddDbContext<FacContext>(options =>
    options.UseNpgsql(
        FacConnectionString,
        o => o.MapEnum<TypeModePreinscription>("type_mode_preinscription")
        .MapEnum<TypeMedia>("type_media")
    )
);

builder.Services.AddDbContext<BacContext>(options =>
    options.UseNpgsql(BacConnectionString)
);

var key = Encoding.ASCII.GetBytes(builder.Configuration["Jwt:Key"] ?? throw new InvalidOperationException("jwt key not found"));


builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(key)
    };
});

builder.Services.AddControllers();
builder.Services.AddAuthorization();

/* -----------------CORS !!!!!--------------------- */
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// These one are for swagger guy
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IPasswordHasher<Utilisateur>, PasswordHasher<Utilisateur>>();
builder.Services.AddScoped<backend.Services.JwtService>();

var app = builder.Build();

// Also swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

/* -----------------CORS !!!!!--------------------- */
app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();

// make all of the controller visible when consulting them
app.MapControllers();


app.Run();
