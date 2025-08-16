-- PostgreSQL initialization script
-- This script will be executed when the container starts for the first time

-- Create database if not exists
SELECT 'CREATE DATABASE meb_coordination'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'meb_coordination')\gexec

-- Connect to the database
\c meb_coordination;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create a simple test table to verify connection
CREATE TABLE IF NOT EXISTS connection_test (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    message TEXT DEFAULT 'PostgreSQL connection successful'
);

INSERT INTO connection_test (message) VALUES ('Database initialized successfully');