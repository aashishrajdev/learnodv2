"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { CodeExecutionService } from "../services/CodeExecutionService";
import { languages } from "../constants/languages";
import "../styles/editor.css";

// Import Prettier for code formatting
import * as prettier from "prettier";
import prettierPluginBabel from "prettier/plugins/babel";
import prettierPluginEstree from "prettier/plugins/estree";
import prettierPluginTypescript from "prettier/plugins/typescript";
import prettierPluginHtml from "prettier/plugins/html";
import prettierPluginCss from "prettier/plugins/postcss";

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

// Dynamically import WebEditor to prevent SSR issues
const WebEditor = dynamic(() => import("./WebEditor"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[500px] bg-gray-100 dark:bg-gray-800 rounded-lg border">
      <div className="text-gray-500 dark:text-gray-400">
        Loading Web Editor...
      </div>
    </div>
  ),
});

// Configure Monaco Editor for better syntax highlighting
const configureMonaco = () => {
  if (typeof window !== "undefined" && (window as any).monaco) {
    // Set up additional language features
    const monaco = (window as any).monaco;
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2020,
      allowNonTsExtensions: true,
    });

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2020,
      allowNonTsExtensions: true,
    });
  }
};

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

  // Map our language IDs to Monaco Editor language IDs
  const getMonacoLanguage = (lang: string): string => {
    const languageMap: Record<string, string> = {
      javascript: "javascript",
      typescript: "typescript",
      python: "python",
      java: "java",
      cpp: "cpp",
      c: "c",
      php: "php",
      go: "go",
      rust: "rust",
      html: "html",
      css: "css",
    };
    return languageMap[lang] || "javascript";
  };

  // Load example code when language changes
  useEffect(() => {
    if (exampleCode[language as keyof typeof exampleCode]) {
      setCode(exampleCode[language as keyof typeof exampleCode]);
    }
  }, [language, setCode]);

  // Configure Monaco Editor when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      configureMonaco();
    }, 1000); // Wait for Monaco to load

    return () => clearTimeout(timer);
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const formatCodeSilently = async (codeToFormat: string): Promise<string> => {
    try {
      // Map language to Prettier parser
      const getParser = (lang: string): string => {
        const parserMap: Record<string, string> = {
          javascript: "babel",
          typescript: "typescript",
          html: "html",
          css: "css",
          json: "json",
        };
        return parserMap[lang] || "babel";
      };

      // Get plugins for the language
      const getPlugins = (lang: string) => {
        const plugins = [prettierPluginEstree];

        if (lang === "javascript" || lang === "typescript") {
          plugins.push(prettierPluginBabel);
        }

        if (lang === "typescript") {
          plugins.push(prettierPluginTypescript);
        }

        if (lang === "html") {
          plugins.push(prettierPluginHtml);
        }

        if (lang === "css") {
          plugins.push(prettierPluginCss);
        }

        return plugins;
      };

      // Only format supported languages
      const supportedLanguages = [
        "javascript",
        "typescript",
        "html",
        "css",
        "json",
      ];

      if (!supportedLanguages.includes(language) || !codeToFormat.trim()) {
        return codeToFormat; // Return original code if not supported or empty
      }

      // Basic syntax validation for JS/TS
      if (language === "javascript" || language === "typescript") {
        const openBraces = (codeToFormat.match(/{/g) || []).length;
        const closeBraces = (codeToFormat.match(/}/g) || []).length;

        if (openBraces !== closeBraces) {
          return codeToFormat; // Return original if syntax issues
        }
      }

      const formatted = await prettier.format(codeToFormat, {
        parser: getParser(language),
        plugins: getPlugins(language),
        semi: true,
        singleQuote: false,
        tabWidth: 2,
        trailingComma: "es5",
        printWidth: 80,
      });

      return formatted;
    } catch (error) {
      // Silently return original code if formatting fails
      console.warn("Auto-formatting failed:", error);
      return codeToFormat;
    }
  };

  const handleRunCode = async () => {
    if (isExecuting) return;

    setIsExecuting(true);
    try {
      // Auto-format code before running
      const formattedCode = await formatCodeSilently(code);
      if (formattedCode !== code) {
        setCode(formattedCode);
      }

      let output = "";
      if (
        language === "java" ||
        language === "cpp" ||
        language === "typescript" ||
        language === "c" ||
        language === "php" ||
        language === "go" ||
        language === "rust"
      ) {
        // Use Judge0 API via Next.js route
        const res = await fetch("/api/execute", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: formattedCode, language }),
        });
        const data = await res.json();
        if (data.stderr) output = data.stderr;
        else if (data.compile_output) output = data.compile_output;
        else if (data.stdout) output = data.stdout;
        else if (data.message) output = data.message;
        else output = JSON.stringify(data, null, 2);
      } else {
        const executionService = CodeExecutionService.getInstance();
        output = await executionService.executeCode(formattedCode, language);
      }
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
      {language === "web" ? (
        // Render WebEditor for Web (HTML/CSS/JS) mode
        <div className="p-4">
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
                  {languages.map(lang => (
                    <option key={lang.id} value={lang.id}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          <WebEditor isDarkMode={isDarkMode} onOutputChange={onOutputChange} />
        </div>
      ) : (
        // Render regular CodeEditor for other languages
        <>
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
                    {languages.map(lang => (
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
              language={getMonacoLanguage(language)}
              theme={isDarkMode ? "vs-dark" : "vs-light"}
              value={code}
              onChange={newCode => setCode(newCode || "")}
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
                colorDecorators: true,
                wordWrap: "on",
                suggest: {
                  showWords: true,
                  showKeywords: true,
                  showSnippets: true,
                },
                quickSuggestions: true,
                parameterHints: { enabled: true },
                formatOnType: true,
                formatOnPaste: true,
                bracketPairColorization: { enabled: true },
                folding: true,
                foldingStrategy: "indentation",
                scrollbar: {
                  vertical: "visible",
                  horizontal: "visible",
                  useShadows: false,
                },
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CodeEditor;
