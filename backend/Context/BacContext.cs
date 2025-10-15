using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using backend.Models.Bac;

namespace backend.Context;

public partial class BacContext : DbContext
{
    public BacContext()
    {
    }

    public BacContext(DbContextOptions<BacContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Administration> Administrations { get; set; }

    public virtual DbSet<AspNetRole> AspNetRoles { get; set; }

    public virtual DbSet<AspNetRoleClaim> AspNetRoleClaims { get; set; }

    public virtual DbSet<AspNetUser> AspNetUsers { get; set; }

    public virtual DbSet<AspNetUserClaim> AspNetUserClaims { get; set; }

    public virtual DbSet<AspNetUserLogin> AspNetUserLogins { get; set; }

    public virtual DbSet<AspNetUserRole> AspNetUserRoles { get; set; }

    public virtual DbSet<AspNetUserToken> AspNetUserTokens { get; set; }

    public virtual DbSet<Bachelier> Bacheliers { get; set; }

    public virtual DbSet<Centre> Centres { get; set; }

    public virtual DbSet<Etablissement> Etablissements { get; set; }

    public virtual DbSet<Historique> Historiques { get; set; }

    public virtual DbSet<Matiere> Matieres { get; set; }

    public virtual DbSet<Mention> Mentions { get; set; }

    public virtual DbSet<Note> Notes { get; set; }

    public virtual DbSet<Option> Options { get; set; }

    public virtual DbSet<Personne> Personnes { get; set; }

    public virtual DbSet<Province> Provinces { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Administration>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.IdAdmin).ValueGeneratedOnAdd();
            entity.Property(e => e.Username).HasMaxLength(100);
        });

        modelBuilder.Entity<AspNetRole>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.Name).HasMaxLength(256);
            entity.Property(e => e.NormalizedName).HasMaxLength(256);
        });

        modelBuilder.Entity<AspNetRoleClaim>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.Id).ValueGeneratedOnAdd();
        });

        modelBuilder.Entity<AspNetUser>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.Email).HasMaxLength(256);
            entity.Property(e => e.NormalizedEmail).HasMaxLength(256);
            entity.Property(e => e.NormalizedUserName).HasMaxLength(256);
            entity.Property(e => e.UserName).HasMaxLength(256);
        });

        modelBuilder.Entity<AspNetUserClaim>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.Id).ValueGeneratedOnAdd();
        });

        modelBuilder.Entity<AspNetUserLogin>(entity =>
        {
            entity.HasNoKey();
        });

        modelBuilder.Entity<AspNetUserRole>(entity =>
        {
            entity.HasNoKey();
        });

        modelBuilder.Entity<AspNetUserToken>(entity =>
        {
            entity.HasNoKey();
        });

        modelBuilder.Entity<Bachelier>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.IdBachelier).ValueGeneratedOnAdd();
            entity.Property(e => e.Moyenne).HasPrecision(18, 2);
        });

        modelBuilder.Entity<Centre>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.IdCentre).ValueGeneratedOnAdd();
            entity.Property(e => e.NomCentre).HasMaxLength(200);
        });

        modelBuilder.Entity<Etablissement>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.IdEtablissement).ValueGeneratedOnAdd();
            entity.Property(e => e.NomEtablissement).HasMaxLength(200);
        });

        modelBuilder.Entity<Historique>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.DateEvenement).HasDefaultValueSql("now()");
            entity.Property(e => e.IdHistorique).ValueGeneratedOnAdd();
        });

        modelBuilder.Entity<Matiere>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.IdMatiere).ValueGeneratedOnAdd();
            entity.Property(e => e.NomMatiere).HasMaxLength(100);
        });

        modelBuilder.Entity<Mention>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.IdMention).ValueGeneratedOnAdd();
            entity.Property(e => e.Max).HasDefaultValue(20);
            entity.Property(e => e.Min).HasDefaultValue(0);
            entity.Property(e => e.NomMention).HasMaxLength(100);
        });

        modelBuilder.Entity<Note>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.EstOptionnel).HasDefaultValue(false);
            entity.Property(e => e.IdNote).ValueGeneratedOnAdd();
            entity.Property(e => e.ValeurNote).HasPrecision(18, 2);
        });

        modelBuilder.Entity<Option>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.IdOption).ValueGeneratedOnAdd();
            entity.Property(e => e.Serie).HasMaxLength(50);
        });

        modelBuilder.Entity<Personne>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.IdPersonne).ValueGeneratedOnAdd();
            entity.Property(e => e.LieuNaissance).HasMaxLength(200);
            entity.Property(e => e.NomPrenom).HasMaxLength(200);
            entity.Property(e => e.Sexe)
                .HasMaxLength(1)
                .HasDefaultValueSql("'M'::character varying");
        });

        modelBuilder.Entity<Province>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.IdProvince).ValueGeneratedOnAdd();
            entity.Property(e => e.NomProvince).HasMaxLength(100);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
