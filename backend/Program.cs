using Microsoft.EntityFrameworkCore;
using backend.Context;
using backend.Models.Enums;

var builder = WebApplication.CreateBuilder(args);

var FacConnectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string"
        + "'DefaultConnection' not found.");

builder.Services.AddDbContext<FacContext>(options =>
    options.UseNpgsql(
        FacConnectionString,
        o => o.MapEnum<TypeModePreinscription>("type_mode_preinscription")
        .MapEnum<TypeMedia>("type_media")
    )
);

builder.Services.AddControllers();
builder.Services.AddAuthorization();

// These one are for swagger guy
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Also swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();

// make all of the controller visible when consulting them
app.MapControllers();


app.Run();
