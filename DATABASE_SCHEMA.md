# Inventory Management System - Database Schema

## Overview
This document describes the database schema for our inventory management system, implemented in Supabase.

## Table Structures

### 1. firma (Companies) Table
- **Purpose**: Store company information
- **Columns**:
  - `firma_id`: Unique identifier (Primary Key, Auto-incrementing)
  - `firma_ad`: Company name (45 characters)
  - `firma_vergi_no`: Tax identification number
  - `firma_telefon`: Company phone number
  - `firma_adres`: Company address
  - `firma_eposta_adresi`: Company email address

### 2. personel (Personnel) Table
- **Purpose**: Store employee/personnel information
- **Columns**:
  - `personel_id`: Unique identifier (Primary Key, Auto-incrementing)
  - `personel_ad`: First name
  - `personel_soyad`: Last name
  - `personel_telefon_no`: Phone number
  - `personel_eposta`: Email address
  - `personel_sifre`: Password (hashed)
  - `firma_firma_id`: Foreign key linking to company

### 3. tedarikci (Supplier) Table
- **Purpose**: Store supplier/vendor information
- **Columns**:
  - `tedarikci_id`: Unique identifier (Primary Key, Auto-incrementing)
  - `tedarikci_ad`: Supplier name
  - `tedarikci_telefon_no`: Supplier phone number
  - `tedarikci_adresi`: Supplier address
  - `tedarikci_eposta_adresi`: Supplier email address

### 4. siparis (Orders) Table
- **Purpose**: Track product orders
- **Columns**:
  - `siparis_id`: Unique identifier (Primary Key, Auto-incrementing)
  - `siparis_tarihi`: Order date
  - `urun_kodu`: Product code
  - `urun_adi`: Product name
  - `urun_miktari`: Product quantity
  - `tedarikci_tedarikci_id`: Foreign key linking to supplier
  - `personel_personel_id`: Foreign key linking to personnel

### 5. stok (Stock) Table
- **Purpose**: Manage inventory stock
- **Columns**:
  - `stok_id`: Unique identifier (Primary Key, Auto-incrementing)
  - `stok_giris_tarihi`: Stock entry date
  - `stok_cikis_tarihi`: Stock exit date
  - `stok_miktari`: Stock quantity
  - `siparis_siparis_id`: Foreign key linking to order

## Relationships
- A company (firma) can have multiple personnel
- A personnel belongs to one company
- An order can be created by one personnel
- An order is associated with one supplier
- A stock entry is linked to one order

## SQL Creation Script
```sql
-- SQL script for creating tables is available in the project's documentation
-- Refer to the specific SQL file for full creation script
```

## Notes
- All tables use auto-incrementing integer IDs
- Foreign key constraints ensure data integrity
- Designed for a typical inventory management workflow