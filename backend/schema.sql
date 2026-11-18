CREATE DATABASE IF NOT EXISTS eaglereads_db;
USE eaglereads_db;

CREATE TABLE books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  genre VARCHAR(100) NOT NULL,
  isbn VARCHAR(50) NOT NULL,
  qty INT NOT NULL DEFAULT 0
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  card_id VARCHAR(100) NOT NULL UNIQUE,
  role ENUM('Client', 'Librarian') NOT NULL DEFAULT 'Client'
);

CREATE TABLE transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  book_id INT NOT NULL,
  user_name VARCHAR(255) NOT NULL,
  type ENUM('ADD', 'DEDUCT') NOT NULL,
  quantity INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
);

INSERT INTO books (title, author, genre, isbn, qty) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', 'Fiction', '9780743273565', 5),
('To Kill a Mockingbird', 'Harper Lee', 'Classic', '9780061120084', 1),
('1984', 'George Orwell', 'Dystopian', '9780451524935', 4);

INSERT INTO users (name, card_id, role) VALUES
('Head Librarian', 'LIB001', 'Librarian'),
('Jane Doe', 'CLI001', 'Client');
