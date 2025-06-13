"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { CodeExecutionService } from "../services/CodeExecutionService";
import { languages } from "../constants/languages";
import "../styles/editor.css";

// Dynamically import Monaco Editor to prevent SSR issues
const MonacoEditor = dynamic(() => import("react-monaco-editor"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[500px] bg-gray-100 dark:bg-gray-800 rounded-lg border">
      <div className="text-gray-500 dark:text-gray-400">
        Loading Monaco Editor...
      </div>
    </div>
  ),
});

interface CodeEditorProps {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  onOutputChange?: (output: string) => void;
  isDarkMode: boolean;
}

const exampleCode = {
  javascript: `// JavaScript Example
console.log("Hello, World!");

// Try some math
const result = 5 + 3;
console.log("5 + 3 =", result);

// Try an array
const fruits = ["apple", "banana", "orange"];
console.log("Fruits:", fruits);

// Try a function
function greet(name) {
  return "Hello, " + name + "!";
}
console.log(greet("User"));`,

  typescript: `// TypeScript Example
// Note: Some TypeScript features may not work in the browser environment

// Simple types
const message: string = "Hello, World!";
console.log(message);

// Arrays
const numbers: number[] = [1, 2, 3, 4, 5];
console.log("Numbers:", numbers);

// Objects
const person = {
  name: "John",
  age: 30
};
console.log("Person:", person);

// Functions
function add(a: number, b: number): number {
  return a + b;
}

const result = add(5, 3);
console.log("5 + 3 =", result);

// Classes
class Greeter {
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  greet() {
    return "Hello, " + this.greeting;
  }
}

const greeter = new Greeter("User");
console.log(greeter.greet());`,

  python: `# Python Example - Runs with Pyodide!
print("Hello, World!")

# Math operations
import math
result = 5 + 3
print(f"5 + 3 = {result}")
print(f"Square root of 16 = {math.sqrt(16)}")

# Lists and loops
fruits = ["apple", "banana", "orange"]
print("Fruits:", fruits)

for i, fruit in enumerate(fruits):
    print(f"{i+1}. {fruit}")

# Functions
def greet(name):
    return f"Hello, {name}!"

print(greet("Python User"))

# Dictionary
person = {
    "name": "Alice",
    "age": 25,
    "city": "New York"
}
print("Person:", person)

# List comprehension
squares = [x**2 for x in range(1, 6)]
print("Squares:", squares)`,

  java: `// Java Example
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        // Variables
        int number = 42;
        String message = "Java Programming";
        
        System.out.println("Number: " + number);
        System.out.println("Message: " + message);
        
        // Array
        int[] numbers = {1, 2, 3, 4, 5};
        System.out.print("Numbers: ");
        for (int num : numbers) {
            System.out.print(num + " ");
        }
        System.out.println();
        
        // Method call
        String greeting = greet("Java Developer");
        System.out.println(greeting);
    }
    
    public static String greet(String name) {
        return "Hello, " + name + "!";
    }
}`,

  cpp: `// C++ Example
#include <iostream>
#include <vector>
#include <string>

using namespace std;

// Function declaration
string greet(const string& name);

int main() {
    cout << "Hello, World!" << endl;
    
    // Variables
    int number = 42;
    string message = "C++ Programming";
    
    cout << "Number: " << number << endl;
    cout << "Message: " << message << endl;
    
    // Vector (dynamic array)
    vector<int> numbers = {1, 2, 3, 4, 5};
    cout << "Numbers: ";
    for (int num : numbers) {
        cout << num << " ";
    }
    cout << endl;
    
    // Function call
    string greeting = greet("C++ Developer");
    cout << greeting << endl;
    
    return 0;
}

string greet(const string& name) {
    return "Hello, " + name + "!";
}`,

  c: `// C Example
#include <stdio.h>
#include <string.h>

// Function declaration
void greet(const char* name);

int main() {
    printf("Hello, World!\\n");
    
    // Variables
    int number = 42;
    char message[] = "C Programming";
    
    printf("Number: %d\\n", number);
    printf("Message: %s\\n", message);
    
    // Array
    int numbers[] = {1, 2, 3, 4, 5};
    int size = sizeof(numbers) / sizeof(numbers[0]);
    
    printf("Numbers: ");
    for (int i = 0; i < size; i++) {
        printf("%d ", numbers[i]);
    }
    printf("\\n");
    
    // Function call
    greet("C Developer");
    
    return 0;
}

void greet(const char* name) {
    printf("Hello, %s!\\n", name);
}`,

  csharp: `// C# Example
using System;
using System.Collections.Generic;

namespace HelloWorld
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello, World!");
            
            // Variables
            int number = 42;
            string message = "C# Programming";
            
            Console.WriteLine($"Number: {number}");
            Console.WriteLine($"Message: {message}");
            
            // List
            List<int> numbers = new List<int> {1, 2, 3, 4, 5};
            Console.Write("Numbers: ");
            foreach (int num in numbers)
            {
                Console.Write($"{num} ");
            }
            Console.WriteLine();
            
            // Method call
            string greeting = Greet("C# Developer");
            Console.WriteLine(greeting);
        }
        
        static string Greet(string name)
        {
            return $"Hello, {name}!";
        }
    }
}`,

  php: `<?php
// PHP Example
echo "Hello, World!\\n";

// Variables
$number = 42;
$message = "PHP Programming";

echo "Number: " . $number . "\\n";
echo "Message: " . $message . "\\n";

// Array
$numbers = [1, 2, 3, 4, 5];
echo "Numbers: " . implode(" ", $numbers) . "\\n";

// Associative array
$person = [
    "name" => "John",
    "age" => 30,
    "city" => "New York"
];
echo "Person: " . json_encode($person) . "\\n";

// Function
function greet($name) {
    return "Hello, " . $name . "!";
}

echo greet("PHP Developer") . "\\n";

// Loop
echo "Counting: ";
for ($i = 1; $i <= 5; $i++) {
    echo $i . " ";
}
echo "\\n";
?>`,

  ruby: `# Ruby Example
puts "Hello, World!"

# Variables
number = 42
message = "Ruby Programming"

puts "Number: #{number}"
puts "Message: #{message}"

# Array
numbers = [1, 2, 3, 4, 5]
puts "Numbers: #{numbers.join(' ')}"

# Hash
person = {
  name: "John",
  age: 30,
  city: "New York"
}
puts "Person: #{person}"

# Method
def greet(name)
  "Hello, #{name}!"
end

puts greet("Ruby Developer")

# Block iteration
puts "Squares:"
(1..5).each { |i| puts "#{i}^2 = #{i**2}" }

# Class
class Greeter
  def initialize(name)
    @name = name
  end
  
  def say_hello
    "Hello, #{@name}!"
  end
end

greeter = Greeter.new("Ruby")
puts greeter.say_hello`,

  go: `// Go Example
package main

import (
    "fmt"
    "math"
)

func main() {
    fmt.Println("Hello, World!")
    
    // Variables
    number := 42
    message := "Go Programming"
    
    fmt.Printf("Number: %d\\n", number)
    fmt.Printf("Message: %s\\n", message)
    
    // Slice
    numbers := []int{1, 2, 3, 4, 5}
    fmt.Printf("Numbers: %v\\n", numbers)
    
    // Map
    person := map[string]interface{}{
        "name": "John",
        "age":  30,
        "city": "New York",
    }
    fmt.Printf("Person: %v\\n", person)
    
    // Function call
    greeting := greet("Go Developer")
    fmt.Println(greeting)
    
    // Math
    fmt.Printf("Square root of 16: %.2f\\n", math.Sqrt(16))
    
    // Loop
    fmt.Print("Counting: ")
    for i := 1; i <= 5; i++ {
        fmt.Printf("%d ", i)
    }
    fmt.Println()
}

func greet(name string) string {
    return fmt.Sprintf("Hello, %s!", name)
}`,

  rust: `// Rust Example
fn main() {
    println!("Hello, World!");
    
    // Variables
    let number = 42;
    let message = "Rust Programming";
    
    println!("Number: {}", number);
    println!("Message: {}", message);
    
    // Vector
    let numbers = vec![1, 2, 3, 4, 5];
    println!("Numbers: {:?}", numbers);
    
    // Struct
    struct Person {
        name: String,
        age: u32,
    }
    
    let person = Person {
        name: String::from("John"),
        age: 30,
    };
    
    println!("Person: {} is {} years old", person.name, person.age);
    
    // Function call
    let greeting = greet("Rust Developer");
    println!("{}", greeting);
    
    // Iterator
    let squares: Vec<i32> = (1..6).map(|x| x * x).collect();
    println!("Squares: {:?}", squares);
}

fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}`,

  swift: `// Swift Example
import Foundation

print("Hello, World!")

// Variables
let number = 42
let message = "Swift Programming"

print("Number: \\(number)")
print("Message: \\(message)")

// Array
let numbers = [1, 2, 3, 4, 5]
print("Numbers: \\(numbers)")

// Dictionary
let person = [
    "name": "John",
    "age": "30",
    "city": "New York"
]
print("Person: \\(person)")

// Function
func greet(name: String) -> String {
    return "Hello, \\(name)!"
}

print(greet(name: "Swift Developer"))

// Class
class Greeter {
    var name: String
    
    init(name: String) {
        self.name = name
    }
    
    func sayHello() -> String {
        return "Hello, \\(name)!"
    }
}

let greeter = Greeter(name: "Swift")
print(greeter.sayHello())

// Higher-order functions
let squares = (1...5).map { $0 * $0 }
print("Squares: \\(squares)")`,

  kotlin: `// Kotlin Example
fun main() {
    println("Hello, World!")
    
    // Variables
    val number = 42
    val message = "Kotlin Programming"
    
    println("Number: $number")
    println("Message: $message")
    
    // List
    val numbers = listOf(1, 2, 3, 4, 5)
    println("Numbers: $numbers")
    
    // Map
    val person = mapOf(
        "name" to "John",
        "age" to 30,
        "city" to "New York"
    )
    println("Person: $person")
    
    // Function call
    val greeting = greet("Kotlin Developer")
    println(greeting)
    
    // Data class
    data class Person(val name: String, val age: Int)
    val john = Person("John", 30)
    println("Data class: $john")
    
    // Lambda and higher-order functions
    val squares = (1..5).map { it * it }
    println("Squares: $squares")
}

fun greet(name: String): String {
    return "Hello, $name!"
}`,

  scala: `// Scala Example
object HelloWorld extends App {
    println("Hello, World!")
    
    // Variables
    val number = 42
    val message = "Scala Programming"
    
    println(s"Number: $number")
    println(s"Message: $message")
    
    // List
    val numbers = List(1, 2, 3, 4, 5)
    println(s"Numbers: $numbers")
    
    // Map
    val person = Map(
        "name" -> "John",
        "age" -> 30,
        "city" -> "New York"
    )
    println(s"Person: $person")
    
    // Function call
    val greeting = greet("Scala Developer")
    println(greeting)
    
    // Case class
    case class Person(name: String, age: Int)
    val john = Person("John", 30)
    println(s"Case class: $john")
    
    // Higher-order functions
    val squares = (1 to 5).map(x => x * x)
    println(s"Squares: $squares")
}

def greet(name: String): String = {
    s"Hello, $name!"
}`,

  html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Example HTML Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            border-bottom: 2px solid #007bff;
            padding-bottom: 10px;
        }
        .highlight {
            background-color: #fff3cd;
            padding: 10px;
            border-left: 4px solid #ffc107;
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to HTML</h1>
        <p>This is an example HTML document with various elements.</p>
        
        <div class="highlight">
            <strong>Highlighted content:</strong> This shows how CSS styling works!
        </div>
        
        <h2>Lists</h2>
        <ul>
            <li>HTML - Structure</li>
            <li>CSS - Styling</li>
            <li>JavaScript - Interactivity</li>
        </ul>
        
        <h2>Table Example</h2>
        <table border="1" style="border-collapse: collapse; width: 100%;">
            <tr>
                <th>Language</th>
                <th>Type</th>
                <th>Year</th>
            </tr>
            <tr>
                <td>HTML</td>
                <td>Markup</td>
                <td>1993</td>
            </tr>
            <tr>
                <td>CSS</td>
                <td>Stylesheet</td>
                <td>1996</td>
            </tr>
        </table>
        
        <h2>Form Example</h2>
        <form>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Enter your name">
            <br><br>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Enter your email">
            <br><br>
            <button type="submit">Submit</button>
        </form>
    </div>
</body>
</html>`,

  css: `/* CSS Example - Modern Styling */

/* CSS Variables for theming */
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --success-color: #28a745;
    --danger-color: #dc3545;
    --warning-color: #ffc107;
    --info-color: #17a2b8;
    --light-color: #f8f9fa;
    --dark-color: #343a40;
    --font-family: 'Arial', sans-serif;
    --border-radius: 8px;
    --box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

/* Reset and base styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: var(--font-family);
    line-height: 1.6;
    color: var(--dark-color);
    background-color: var(--light-color);
}

/* Container and layout */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
    margin-bottom: 1rem;
    font-weight: 600;
}

h1 { font-size: 2.5rem; color: var(--primary-color); }
h2 { font-size: 2rem; color: var(--secondary-color); }
h3 { font-size: 1.75rem; }

/* Card component */
.card {
    background: white;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    padding: 1.5rem;
    margin-bottom: 1rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}

/* Button styles */
.btn {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: var(--border-radius);
    text-decoration: none;
    font-weight: 500;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 0.25rem;
}

.btn-primary {
    background-color: var(--primary-color);
    color: white;
}

.btn-primary:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
}

.btn-success {
    background-color: var(--success-color);
    color: white;
}

.btn-danger {
    background-color: var(--danger-color);
    color: white;
}

/* Grid system */
.row {
    display: flex;
    flex-wrap: wrap;
    margin: -10px;
}

.col {
    flex: 1;
    padding: 10px;
}

.col-2 { flex: 0 0 50%; }
.col-3 { flex: 0 0 33.333%; }
.col-4 { flex: 0 0 25%; }

/* Form styling */
.form-group {
    margin-bottom: 1rem;
}

.form-control {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: var(--border-radius);
    font-size: 1rem;
    transition: border-color 0.3s ease;
}

.form-control:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(0,123,255,0.25);
}

/* Animations */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.fade-in {
    animation: fadeIn 0.6s ease-out;
}

/* Responsive design */
@media (max-width: 768px) {
    .container {
        padding: 10px;
    }
    
    .col-2, .col-3, .col-4 {
        flex: 0 0 100%;
    }
    
    h1 { font-size: 2rem; }
    h2 { font-size: 1.5rem; }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
    :root {
        --light-color: #1a1a1a;
        --dark-color: #ffffff;
    }
    
    .card {
        background: #2d2d2d;
        color: var(--dark-color);
    }
}`,

  json: `{
    "name": "Learnod Learning Platform",
    "version": "1.0.0",
    "description": "Interactive learning platform with code execution",
    "author": {
        "name": "Learnod Team",
        "email": "team@learnod.com",
        "website": "https://learnod.com"
    },
    "features": {
        "codeEditor": {
            "engine": "Monaco Editor",
            "languages": [
                "JavaScript",
                "TypeScript", 
                "Python",
                "HTML",
                "CSS",
                "JSON"
            ],
            "capabilities": {
                "syntaxHighlighting": true,
                "autoCompletion": true,
                "errorDetection": true,
                "codeExecution": true
            }
        },
        "videoPlayer": {
            "supported": ["YouTube"],
            "features": ["embedded", "responsive"]
        },
        "themes": ["light", "dark"],
        "responsive": true
    },
    "technologies": {
        "frontend": {
            "framework": "Next.js",
            "library": "React",
            "language": "TypeScript",
            "styling": "Tailwind CSS"
        },
        "codeExecution": {
            "javascript": "Native browser",
            "python": "Pyodide WASM",
            "validation": "Built-in parsers"
        }
    },
    "statistics": {
        "supportedLanguages": 20,
        "executableLanguages": 6,
        "totalFeatures": 15,
        "responsive": true
    },
    "configuration": {
        "editor": {
            "fontSize": {
                "min": 10,
                "max": 24,
                "default": 14
            },
            "lineNumbers": true,
            "minimap": false,
            "wordWrap": "on"
        },
        "execution": {
            "timeout": 5000,
            "memoryLimit": "128MB",
            "sandboxed": true
        }
    },
    "examples": {
        "simpleArray": [1, 2, 3, 4, 5],
        "nested": {
            "level1": {
                "level2": {
                    "value": "deeply nested"
                }
            }
        },
        "mixed": [
            "string",
            42,
            true,
            null,
            {"key": "value"}
        ]
    }
}`,

  xml: `<?xml version="1.0" encoding="UTF-8"?>
<!-- XML Example Document -->
<catalog xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <metadata>
        <title>Programming Languages Catalog</title>
        <description>A collection of popular programming languages</description>
        <version>1.0</version>
        <lastUpdated>2024-01-01</lastUpdated>
    </metadata>
    
    <languages>
        <language id="js" type="interpreted">
            <name>JavaScript</name>
            <category>Web Development</category>
            <year>1995</year>
            <creator>Brendan Eich</creator>
            <features>
                <feature>Dynamic typing</feature>
                <feature>First-class functions</feature>
                <feature>Prototype-based OOP</feature>
            </features>
            <popularity rating="10">Very High</popularity>
        </language>
        
        <language id="py" type="interpreted">
            <name>Python</name>
            <category>General Purpose</category>
            <year>1991</year>
            <creator>Guido van Rossum</creator>
            <features>
                <feature>Clean syntax</feature>
                <feature>Dynamic typing</feature>
                <feature>Extensive libraries</feature>
            </features>
            <popularity rating="9">Very High</popularity>
        </language>
        
        <language id="java" type="compiled">
            <name>Java</name>
            <category>Enterprise</category>
            <year>1995</year>
            <creator>James Gosling</creator>
            <features>
                <feature>Platform independent</feature>
                <feature>Object-oriented</feature>
                <feature>Strong typing</feature>
            </features>
            <popularity rating="8">High</popularity>
        </language>
    </languages>
    
    <statistics>
        <totalLanguages>3</totalLanguages>
        <categories>
            <category name="Web Development" count="1"/>
            <category name="General Purpose" count="1"/>
            <category name="Enterprise" count="1"/>
        </categories>
    </statistics>
</catalog>`,

  yaml: `# YAML Example - Configuration File
---
application:
  name: "Learnod Learning Platform"
  version: "1.0.0"
  description: "Interactive coding education platform"
  
environment:
  development:
    database:
      host: "localhost"
      port: 5432
      name: "learnod_dev"
      username: "dev_user"
      password: "dev_password"
      ssl: false
    
    redis:
      host: "localhost"
      port: 6379
      database: 0
      
    logging:
      level: "debug"
      file: "./logs/development.log"
      
  production:
    database:
      host: "\${DB_HOST}"
      port: \${DB_PORT}
      name: "\${DB_NAME}"
      username: "\${DB_USER}"
      password: "\${DB_PASSWORD}"
      ssl: true
      
    redis:
      host: "\${REDIS_HOST}"
      port: \${REDIS_PORT}
      database: 0
      
    logging:
      level: "info"
      file: "./logs/production.log"

features:
  codeEditor:
    enabled: true
    languages:
      - javascript
      - typescript
      - python
      - html
      - css
      - json
      - yaml
      - xml
    settings:
      fontSize: 14
      lineNumbers: true
      autoComplete: true
      
  videoPlayer:
    enabled: true
    providers:
      - youtube
      - vimeo
    autoplay: false
    
  themes:
    - name: "light"
      primary: "#007bff"
      secondary: "#6c757d"
      background: "#ffffff"
      
    - name: "dark"
      primary: "#4dabf7"
      secondary: "#868e96"
      background: "#1a1a1a"

security:
  cors:
    enabled: true
    origins:
      - "http://localhost:3000"
      - "https://learnod.com"
      
  rateLimit:
    windowMs: 900000  # 15 minutes
    max: 100  # requests per window
    
  codeExecution:
    timeout: 5000  # milliseconds
    memoryLimit: "128MB"
    sandboxed: true
    
deployment:
  docker:
    image: "learnod/platform:latest"
    ports:
      - "3000:3000"
    volumes:
      - "./data:/app/data"
      - "./logs:/app/logs"
    environment:
      - NODE_ENV=production
      - PORT=3000
      
  kubernetes:
    replicas: 3
    resources:
      requests:
        memory: "256Mi"
        cpu: "250m"
      limits:
        memory: "512Mi"
        cpu: "500m"`,

  sql: `-- SQL Example - Database Operations
-- Create database schema for a learning platform

-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

-- Create courses table
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    instructor_id INTEGER REFERENCES users(id),
    category VARCHAR(50),
    difficulty_level VARCHAR(20) CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
    price DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_published BOOLEAN DEFAULT false
);

-- Create lessons table
CREATE TABLE lessons (
    id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    video_url VARCHAR(500),
    order_number INTEGER NOT NULL,
    duration_minutes INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create enrollments table
CREATE TABLE enrollments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    course_id INTEGER REFERENCES courses(id),
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    progress_percentage DECIMAL(5,2) DEFAULT 0.0,
    UNIQUE(user_id, course_id)
);

-- Insert sample data
INSERT INTO users (username, email, password_hash, first_name, last_name) VALUES
('john_doe', 'john@example.com', 'hashed_password_123', 'John', 'Doe'),
('jane_smith', 'jane@example.com', 'hashed_password_456', 'Jane', 'Smith'),
('bob_wilson', 'bob@example.com', 'hashed_password_789', 'Bob', 'Wilson');

INSERT INTO courses (title, description, instructor_id, category, difficulty_level, price) VALUES
('JavaScript Fundamentals', 'Learn the basics of JavaScript programming', 1, 'Programming', 'beginner', 49.99),
('Advanced Python', 'Master advanced Python concepts and frameworks', 2, 'Programming', 'advanced', 99.99),
('Web Development Bootcamp', 'Complete web development course with HTML, CSS, and JavaScript', 1, 'Web Development', 'intermediate', 149.99);

INSERT INTO lessons (course_id, title, content, order_number, duration_minutes) VALUES
(1, 'Introduction to JavaScript', 'What is JavaScript and why is it important?', 1, 15),
(1, 'Variables and Data Types', 'Understanding JavaScript variables and data types', 2, 25),
(1, 'Functions and Scope', 'How to write and use functions in JavaScript', 3, 30),
(2, 'Advanced Data Structures', 'Working with complex data structures in Python', 1, 40),
(2, 'Decorators and Metaclasses', 'Understanding Python decorators and metaclasses', 2, 45);

-- Query examples
-- Get all courses with their instructors
SELECT 
    c.title,
    c.description,
    c.difficulty_level,
    c.price,
    u.first_name || ' ' || u.last_name AS instructor_name
FROM courses c
JOIN users u ON c.instructor_id = u.id
WHERE c.is_published = true
ORDER BY c.created_at DESC;

-- Get enrollment statistics
SELECT 
    c.title,
    COUNT(e.user_id) as enrollment_count,
    AVG(e.progress_percentage) as avg_progress,
    c.price * COUNT(e.user_id) as total_revenue
FROM courses c
LEFT JOIN enrollments e ON c.id = e.course_id
GROUP BY c.id, c.title, c.price
ORDER BY enrollment_count DESC;

-- Get user progress for a specific course
SELECT 
    u.username,
    u.first_name,
    u.last_name,
    e.progress_percentage,
    e.enrolled_at,
    CASE 
        WHEN e.completed_at IS NOT NULL THEN 'Completed'
        WHEN e.progress_percentage > 50 THEN 'In Progress'
        ELSE 'Just Started'
    END as status
FROM enrollments e
JOIN users u ON e.user_id = u.id
WHERE e.course_id = 1
ORDER BY e.progress_percentage DESC;

-- Update user progress
UPDATE enrollments 
SET progress_percentage = 75.0,
    updated_at = CURRENT_TIMESTAMP
WHERE user_id = 1 AND course_id = 1;

-- Create indexes for better performance
CREATE INDEX idx_enrollments_user_course ON enrollments(user_id, course_id);
CREATE INDEX idx_lessons_course_order ON lessons(course_id, order_number);
CREATE INDEX idx_courses_category ON courses(category);`,

  markdown: `# Learnod - Interactive Learning Platform

![Learnod Logo](https://via.placeholder.com/400x200/007bff/ffffff?text=Learnod)

## 🚀 Welcome to the Future of Learning

**Learnod** is a revolutionary interactive learning platform that combines the power of video tutorials with hands-on coding practice. Built with modern web technologies, it provides an immersive learning experience for developers of all skill levels.

---

## ✨ Features

### 🎥 Video Integration
- **YouTube Integration**: Watch tutorials directly in the platform
- **Responsive Player**: Adapts to any screen size
- **Custom URLs**: Support for any YouTube video

### 💻 Advanced Code Editor
- **Monaco Editor**: VS Code-like editing experience
- **20+ Languages**: Support for JavaScript, Python, Java, C++, and more
- **Real-time Execution**: Run code instantly with immediate feedback
- **Syntax Highlighting**: Beautiful syntax highlighting for all languages
- **Auto-completion**: IntelliSense-powered code completion

### 🌓 Theme Support
- **Dark/Light Mode**: Toggle between themes
- **Persistent Settings**: Your preferences are saved
- **Responsive Design**: Beautiful on all devices

---

## 🛠️ Supported Languages

| Language | Execution | Features |
|----------|-----------|----------|
| JavaScript | ✅ Full | Console output, error handling |
| TypeScript | ✅ Full | Type checking, console output |
| Python | ✅ Pyodide | NumPy, Pandas, Matplotlib |
| HTML | ✅ Validation | Syntax validation, analysis |
| CSS | ✅ Validation | Style validation, analysis |
| JSON | ✅ Parsing | Validation, object analysis |
| Java | ❌ Info | Syntax highlighting only |
| C++ | ❌ Info | Syntax highlighting only |
| C# | ❌ Info | Syntax highlighting only |

---

## 🚀 Quick Start

### Prerequisites
\`\`\`bash
node --version  # v16+
npm --version   # v8+
\`\`\`

### Installation
\`\`\`bash
# Clone the repository
git clone https://github.com/yourusername/learnod.git
cd learnod

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
open http://localhost:3000
\`\`\`

---

## 💡 Usage Examples

### JavaScript Example
\`\`\`javascript
// Variables and functions
const greeting = "Hello, World!";
console.log(greeting);

// Arrays and methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log("Doubled:", doubled);

// Objects
const person = {
    name: "Alice",
    age: 30,
    greet() {
        return \`Hello, I'm \${this.name}\`;
    }
};
console.log(person.greet());
\`\`\`

### Python Example
\`\`\`python
# Lists and comprehensions
numbers = [1, 2, 3, 4, 5]
squares = [n**2 for n in numbers]
print(f"Squares: {squares}")

# Functions and classes
class Calculator:
    def __init__(self):
        self.history = []
    
    def add(self, a, b):
        result = a + b
        self.history.append(f"{a} + {b} = {result}")
        return result

calc = Calculator()
print(calc.add(5, 3))
print(calc.history)
\`\`\`

---

## 🎯 Learning Paths

### 🌟 Beginner
1. **HTML Basics** - Structure your content
2. **CSS Fundamentals** - Style your pages
3. **JavaScript Intro** - Add interactivity

### 🚀 Intermediate
1. **Advanced JavaScript** - ES6+, Async/Await
2. **Python Programming** - Data structures, OOP
3. **Web APIs** - Fetch, DOM manipulation

### 🏆 Advanced
1. **TypeScript** - Type-safe JavaScript
2. **System Design** - Architecture patterns
3. **Performance** - Optimization techniques

---

## 🔧 Configuration

### Editor Settings
\`\`\`json
{
  "fontSize": 14,
  "lineNumbers": true,
  "autoComplete": true,
  "theme": "vs-dark",
  "minimap": false
}
\`\`\`

### Execution Environment
\`\`\`yaml
timeout: 5000ms
memoryLimit: 128MB
sandboxed: true
languages:
  - javascript
  - python
  - html
  - css
\`\`\`

---

## 📊 Statistics

> **20+** Programming languages supported  
> **6** Languages with full execution  
> **∞** Learning possibilities  

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **🐛 Report Bugs**: [Create an issue](https://github.com/yourusername/learnod/issues)
2. **💡 Suggest Features**: Share your ideas
3. **🔧 Submit PRs**: Fix bugs or add features
4. **📖 Improve Docs**: Help others learn

### Development Workflow
\`\`\`bash
# 1. Fork the repository
# 2. Create a feature branch
git checkout -b feature/amazing-feature

# 3. Make your changes
# 4. Test your changes
npm test

# 5. Commit your changes
git commit -m "Add amazing feature"

# 6. Push to your fork
git push origin feature/amazing-feature

# 7. Create a Pull Request
\`\`\`

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - VS Code editor for the web
- [Next.js](https://nextjs.org/) - The React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Pyodide](https://pyodide.org/) - Python for the browser

---

## 📞 Support

- 📧 **Email**: support@learnod.com
- 💬 **Discord**: [Join our community](https://discord.gg/learnod)
- 🐦 **Twitter**: [@LearnodPlatform](https://twitter.com/learnodplatform)
- 📚 **Docs**: [documentation.learnod.com](https://docs.learnod.com)

---

**Happy Learning! 🎓**

*Made with ❤️ by the Learnod Team*`,

  shell: `#!/bin/bash
# Shell Script Example - System Administration

# Colors for output
RED='\\033[0;31m'
GREEN='\\033[0;32m'
YELLOW='\\033[1;33m'
BLUE='\\033[0;34m'
NC='\\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "\${GREEN}[INFO]\${NC} $1"
}

print_warning() {
    echo -e "\${YELLOW}[WARN]\${NC} $1"
}

print_error() {
    echo -e "\${RED}[ERROR]\${NC} $1"
}

# System information
print_status "System Information Report"
echo "=================================="

# Basic system info
echo "Hostname: $(hostname)"
echo "Kernel: $(uname -r)"
echo "OS: $(cat /etc/os-release | grep PRETTY_NAME | cut -d= -f2 | tr -d '\"')"
echo "Uptime: $(uptime -p)"

# Disk usage
echo ""
print_status "Disk Usage:"
df -h | grep -E '^/dev/' | awk '{print $1 ": " $3 "/" $2 " (" $5 " used)"}'

# Memory usage
echo ""
print_status "Memory Usage:"
free -h | awk 'NR==2{printf "Memory: %s/%s (%.2f%%)", $3,$2,$3*100/$2 }'
echo ""

# CPU information
echo ""
print_status "CPU Information:"
lscpu | grep -E "Model name|CPU\\(s\\):|CPU MHz"

# Network interfaces
echo ""
print_status "Network Interfaces:"
ip addr show | grep -E "^[0-9]+" | awk '{print $2}' | tr -d ':'

# Process monitoring
echo ""
print_status "Top 5 CPU consuming processes:"
ps aux --sort=-%cpu | head -6

# File operations example
echo ""
print_status "File Operations Example:"

# Create a temporary directory
TEMP_DIR="/tmp/shell_example_$$"
mkdir -p "$TEMP_DIR"
print_status "Created temporary directory: $TEMP_DIR"

# Create some example files
echo "Hello World" > "$TEMP_DIR/hello.txt"
echo "$(date)" > "$TEMP_DIR/timestamp.txt"
echo "user:password:1000:1000:User Name:/home/user:/bin/bash" > "$TEMP_DIR/user.txt"

# List files
print_status "Created files:"
ls -la "$TEMP_DIR"

# File processing with grep, awk, sed
echo ""
print_status "Text Processing Examples:"

# Grep example
echo "Lines containing 'Hello':"
grep "Hello" "$TEMP_DIR"/*.txt

# Awk example  
echo "Processing user file with awk:"
awk -F: '{print "Username: " $1 ", UID: " $3, ", Home: " $6}' "$TEMP_DIR/user.txt"

# Sed example
echo "Replacing 'World' with 'Universe':"
sed 's/World/Universe/g' "$TEMP_DIR/hello.txt"

# Loop examples
echo ""
print_status "Loop Examples:"

# For loop
echo "Counting 1 to 5:"
for i in {1..5}; do
    echo "Number: $i"
done

# While loop with condition
echo "While loop example:"
counter=1
while [ $counter -le 3 ]; do
    echo "Iteration: $counter"
    ((counter++))
done

# Conditional statements
echo ""
print_status "Conditional Examples:"

# Check if file exists
if [ -f "$TEMP_DIR/hello.txt" ]; then
    print_status "hello.txt exists"
else
    print_warning "hello.txt does not exist"
fi

# Check disk space
DISK_USAGE=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
if [ $DISK_USAGE -gt 80 ]; then
    print_warning "Disk usage is high: $DISK_USAGE%"
else
    print_status "Disk usage is normal: $DISK_USAGE%"
fi

# Function example
backup_file() {
    local file="$1"
    local backup_dir="$2"
    
    if [ -f "$file" ]; then
        cp "$file" "$backup_dir/$(basename $file).backup"
        print_status "Backed up: $(basename $file)"
    else
        print_error "File not found: $file"
    fi
}

# Use the function
echo ""
print_status "Backup Example:"
backup_file "$TEMP_DIR/hello.txt" "$TEMP_DIR"

# Array example
echo ""
print_status "Array Example:"
fruits=("apple" "banana" "orange" "grape")
echo "Fruits array:"
for fruit in "\${fruits[@]}"; do
    echo "- $fruit"
done

# Cleanup
print_status "Cleaning up temporary files..."
rm -rf "$TEMP_DIR"
print_status "Cleanup complete!"

echo ""
print_status "Script execution completed successfully!"`,

  powershell: `# PowerShell Example - System Administration and Automation

# Define colors for output
$Colors = @{
    Info    = 'Green'
    Warning = 'Yellow'
    Error   = 'Red'
    Header  = 'Cyan'
}

# Function to write colored output
function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$Type = 'Info'
    )
    Write-Host "[$Type] $Message" -ForegroundColor $Colors[$Type]
}

# Header
Write-Host "PowerShell System Administration Example" -ForegroundColor $Colors.Header
Write-Host "=======================================" -ForegroundColor $Colors.Header

# System Information
Write-ColorOutput "Gathering System Information..." "Info"

$SystemInfo = @{
    ComputerName = $env:COMPUTERNAME
    OSVersion    = (Get-WmiObject Win32_OperatingSystem).Caption
    PowerShell   = $PSVersionTable.PSVersion.ToString()
    CurrentUser  = $env:USERNAME
    Domain       = $env:USERDOMAIN
    LogonServer  = $env:LOGONSERVER
    Uptime       = (Get-Date) - (Get-CimInstance Win32_OperatingSystem).LastBootUpTime
}

# Display system information
Write-ColorOutput "System Information:" "Header"
$SystemInfo.GetEnumerator() | ForEach-Object {
    Write-Host "  $($_.Key): $($_.Value)"
}

# Hardware Information
Write-ColorOutput "Hardware Information:" "Header"

# CPU Information
$CPU = Get-WmiObject Win32_Processor | Select-Object Name, NumberOfCores, NumberOfLogicalProcessors
Write-Host "  CPU: $($CPU.Name)"
Write-Host "  Cores: $($CPU.NumberOfCores), Logical Processors: $($CPU.NumberOfLogicalProcessors)"

# Memory Information
$Memory = Get-WmiObject Win32_ComputerSystem
$MemoryGB = [math]::Round($Memory.TotalPhysicalMemory / 1GB, 2)
Write-Host "  Total Memory: $MemoryGB GB"

# Disk Information
Write-ColorOutput "Disk Information:" "Header"
Get-WmiObject Win32_LogicalDisk | Where-Object { $_.DriveType -eq 3 } | ForEach-Object {
    $UsedSpace = [math]::Round(($_.Size - $_.FreeSpace) / 1GB, 2)
    $FreeSpace = [math]::Round($_.FreeSpace / 1GB, 2)
    $TotalSpace = [math]::Round($_.Size / 1GB, 2)
    $PercentUsed = [math]::Round(($UsedSpace / $TotalSpace) * 100, 2)
    
    Write-Host "  Drive $($_.DeviceID) - Total: $TotalSpace GB, Used: $UsedSpace GB, Free: $FreeSpace GB ($PercentUsed% used)"
}

# Network Information
Write-ColorOutput "Network Information:" "Header"
Get-NetAdapter | Where-Object { $_.Status -eq 'Up' } | ForEach-Object {
    Write-Host "  Interface: $($_.Name) - Status: $($_.Status)"
}

# Process Management Examples
Write-ColorOutput "Process Management Examples:" "Header"

# Top CPU consuming processes
Write-Host "  Top 5 CPU consuming processes:"
Get-Process | Sort-Object CPU -Descending | Select-Object -First 5 | ForEach-Object {
    Write-Host "    $($_.ProcessName): CPU Time: $([math]::Round($_.CPU, 2)) seconds"
}

# Memory consuming processes
Write-Host "  Top 5 Memory consuming processes:"
Get-Process | Sort-Object WorkingSet -Descending | Select-Object -First 5 | ForEach-Object {
    $MemoryMB = [math]::Round($_.WorkingSet / 1MB, 2)
    Write-Host "    $($_.ProcessName): Memory: $MemoryMB MB"
}

# File and Directory Operations
Write-ColorOutput "File Operations Example:" "Header"

# Create temporary directory
$TempPath = Join-Path $env:TEMP "PowerShellExample_$(Get-Date -Format 'yyyyMMdd_HHmmss')"
New-Item -Path $TempPath -ItemType Directory -Force | Out-Null
Write-ColorOutput "Created temporary directory: $TempPath" "Info"

# Create sample files
$SampleFiles = @{
    'system_info.txt' = $SystemInfo | ConvertTo-Json -Depth 3
    'processes.csv'   = Get-Process | Select-Object ProcessName, Id, CPU, WorkingSet | ConvertTo-Csv -NoTypeInformation
    'services.txt'    = Get-Service | Where-Object { $_.Status -eq 'Running' } | Out-String
    'timestamp.txt'   = "File created at: $(Get-Date)"
}

$SampleFiles.GetEnumerator() | ForEach-Object {
    $FilePath = Join-Path $TempPath $_.Key
    $_.Value | Out-File -FilePath $FilePath -Encoding UTF8
    Write-Host "  Created: $($_.Key)"
}

# File processing examples
Write-ColorOutput "File Processing Examples:" "Header"

# Read and filter content
$ProcessFile = Join-Path $TempPath "processes.csv"
$HighMemoryProcesses = Import-Csv $ProcessFile | Where-Object { [int]$_.WorkingSet -gt 50MB } | Select-Object -First 5

Write-Host "  High memory processes (>50MB):"
$HighMemoryProcesses | ForEach-Object {
    $MemoryMB = [math]::Round([int]$_.WorkingSet / 1MB, 2)
    Write-Host "    $($_.ProcessName): $MemoryMB MB"
}

# Array and Collection Examples
Write-ColorOutput "Array and Collection Examples:" "Header"

# Array operations
$Numbers = 1..10
$EvenNumbers = $Numbers | Where-Object { $_ % 2 -eq 0 }
$Squared = $Numbers | ForEach-Object { $_ * $_ }

Write-Host "  Original: $($Numbers -join ', ')"
Write-Host "  Even numbers: $($EvenNumbers -join ', ')"
Write-Host "  Squared: $($Squared -join ', ')"

# Hash table example
$ServerConfig = @{
    'WebServer'      = @{ Port = 80; Status = 'Running'; CPU = 15.2 }
    'DatabaseServer' = @{ Port = 1433; Status = 'Running'; CPU = 8.7 }
    'FileServer'     = @{ Port = 445; Status = 'Stopped'; CPU = 0.0 }
}

Write-Host "  Server Configuration:"
$ServerConfig.GetEnumerator() | ForEach-Object {
    $Server = $_.Value
    Write-Host "    $($_.Key): Port $($Server.Port), Status: $($Server.Status), CPU: $($Server.CPU)%"
}

# Function Examples
Write-ColorOutput "Function Examples:" "Header"

# Function to check service status
function Get-ServiceStatus {
    param(
        [string[]]$ServiceNames
    )
    
    foreach ($ServiceName in $ServiceNames) {
        $Service = Get-Service -Name $ServiceName -ErrorAction SilentlyContinue
        if ($Service) {
            $Status = if ($Service.Status -eq 'Running') { 'Running' } else { 'Stopped' }
            Write-Host "    Service '$ServiceName': $Status"
        } else {
            Write-ColorOutput "Service '$ServiceName' not found" "Warning"
        }
    }
}

# Use the function
Write-Host "  Checking critical services:"
Get-ServiceStatus -ServiceNames @('Spooler', 'Themes', 'AudioSrv', 'NonExistentService')

# Advanced Pipeline Example
Write-ColorOutput "Advanced Pipeline Example:" "Header"

# Get running services, group by status, and count
$ServiceSummary = Get-Service | 
    Group-Object Status | 
    Select-Object Name, Count | 
    Sort-Object Count -Descending

Write-Host "  Service Status Summary:"
$ServiceSummary | ForEach-Object {
    Write-Host "    $($_.Name): $($_.Count) services"
}

# Error Handling Example
Write-ColorOutput "Error Handling Example:" "Header"

try {
    # Attempt to access a non-existent registry key
    $RegistryKey = Get-ItemProperty -Path "HKLM:\\SOFTWARE\\NonExistent" -ErrorAction Stop
    Write-Host "  Registry access successful"
} catch {
    Write-ColorOutput "Expected error caught: $($_.Exception.Message)" "Warning"
} finally {
    Write-Host "  Error handling example completed"
}

# Event Log Example
Write-ColorOutput "Event Log Example:" "Header"

# Get recent system events
$RecentEvents = Get-WinEvent -FilterHashtable @{LogName='System'; Level=2,3} -MaxEvents 5 -ErrorAction SilentlyContinue

if ($RecentEvents) {
    Write-Host "  Recent system events (Warnings and Errors):"
    $RecentEvents | ForEach-Object {
        Write-Host "    $($_.TimeCreated): $($_.LevelDisplayName) - $($_.Id)"
    }
} else {
    Write-Host "  No recent system events found"
}

# Performance Counter Example
Write-ColorOutput "Performance Counter Example:" "Header"

try {
    $CPUUsage = (Get-Counter "\\Processor(_Total)\\% Processor Time" -SampleInterval 1 -MaxSamples 1).CounterSamples.CookedValue
    $MemoryUsage = (Get-Counter "\\Memory\\Available MBytes").CounterSamples.CookedValue
    
    Write-Host "  Current CPU Usage: $([math]::Round($CPUUsage, 2))%"
    Write-Host "  Available Memory: $([math]::Round($MemoryUsage, 2)) MB"
} catch {
    Write-ColorOutput "Performance counter access failed: $($_.Exception.Message)" "Warning"
}

# Cleanup
Write-ColorOutput "Cleaning up temporary files..." "Info"
Remove-Item -Path $TempPath -Recurse -Force -ErrorAction SilentlyContinue
Write-ColorOutput "Cleanup completed!" "Info"

# Summary
Write-ColorOutput "PowerShell Script Execution Summary:" "Header"
Write-Host "  - System information gathered"
Write-Host "  - Hardware details collected"
Write-Host "  - Process and service analysis completed"
Write-Host "  - File operations demonstrated"
Write-Host "  - Advanced PowerShell features showcased"
Write-Host "  - Error handling and performance monitoring included"

Write-ColorOutput "Script execution completed successfully!" "Info"`,

  html: `<!DOCTYPE html>
<html>
<head>
    <title>Example</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        h1 {
            color: #333;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Hello World</h1>
        <p>This is an example HTML document.</p>
        <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
        </ul>
    </div>
</body>
</html>`,

  json: `{
    "name": "Example JSON",
    "version": "1.0.0",
    "description": "A sample JSON object",
    "data": {
        "numbers": [1, 2, 3, 4, 5],
        "text": "Hello World",
        "boolean": true,
        "nested": {
            "key": "value"
        }
    }
}`,
};

const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  setCode,
  onOutputChange,
  isDarkMode,
}) => {
  const [language, setLanguage] = useState<string>("javascript");
  const [isExecuting, setIsExecuting] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [showLineNumbers, setShowLineNumbers] = useState(true);

  // Load example code when language changes
  useEffect(() => {
    if (exampleCode[language as keyof typeof exampleCode]) {
      setCode(exampleCode[language as keyof typeof exampleCode]);
    }
  }, [language, setCode]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const handleRunCode = async () => {
    if (isExecuting) return;

    setIsExecuting(true);
    try {
      const executionService = CodeExecutionService.getInstance();
      const output = await executionService.executeCode(code, language);
      if (onOutputChange) {
        onOutputChange(output);
      }
    } catch (error) {
      if (onOutputChange) {
        onOutputChange(
          `Error: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    } finally {
      setIsExecuting(false);
    }
  };

  const handleResetCode = () => {
    if (exampleCode[language as keyof typeof exampleCode]) {
      setCode(exampleCode[language as keyof typeof exampleCode]);
    }
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(Number(e.target.value));
  };

  return (
    <div
      className={`editor-wrapper ${
        isDarkMode ? "bg-gray-900 dark" : "bg-white"
      }`}
    >
      <div className="p-4">
        {/* Top Controls */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
          <div className="flex items-center space-x-4">
            <label
              className={`text-sm font-medium ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Language:
              <select
                value={language}
                onChange={handleLanguageChange}
                className={`ml-2 p-2 rounded border editor-select ${
                  isDarkMode
                    ? "bg-gray-800 text-white border-gray-700"
                    : "bg-white text-gray-900 border-gray-300"
                }`}
              >
                {languages.map((lang) => (
                  <option key={lang.id} value={lang.id}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleResetCode}
              className={`px-4 py-2 rounded editor-button ${
                isDarkMode
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Reset Code
            </button>

            <button
              onClick={handleRunCode}
              disabled={isExecuting}
              className={`px-4 py-2 rounded editor-button ${
                isExecuting
                  ? "bg-gray-600 cursor-not-allowed"
                  : isDarkMode
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white transition`}
            >
              {isExecuting && <span className="loading-spinner"></span>}
              {isExecuting ? "Running..." : "Run Code"}
            </button>
          </div>
        </div>

        {/* Editor Settings */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <label
            className={`text-sm font-medium ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Font Size:
            <input
              type="range"
              min="10"
              max="24"
              value={fontSize}
              onChange={handleFontSizeChange}
              className="ml-2"
            />
            <span className="ml-2">{fontSize}px</span>
          </label>

          <label
            className={`text-sm font-medium ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            <input
              type="checkbox"
              checked={showLineNumbers}
              onChange={() => setShowLineNumbers(!showLineNumbers)}
              className="mr-2"
            />
            Line Numbers
          </label>
        </div>
      </div>

      {/* Editor */}
      <div className="editor-container flex-1">
        <MonacoEditor
          height="100%"
          language={language}
          theme={isDarkMode ? "vs-dark" : "vs-light"}
          value={code}
          onChange={(newCode) => setCode(newCode || "")}
          options={{
            selectOnLineNumbers: true,
            minimap: { enabled: false },
            fontSize: fontSize,
            lineNumbers: showLineNumbers ? "on" : "off",
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: false,
            cursorStyle: "line",
            automaticLayout: true,
            smoothScrolling: true,
            mouseWheelZoom: true,
            renderWhitespace: "selection",
            renderLineHighlight: "all",
            scrollbar: {
              vertical: "visible",
              horizontal: "visible",
              useShadows: false,
            },
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
