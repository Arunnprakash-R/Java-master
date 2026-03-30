// Unit 5: JDBC - Complete Knowledge Base (Teacher-Style, Ultra Detailed)
const unit5Knowledge = [
  {
    topicId: 'u5t1',
    title: 'JDBC Architecture & Drivers',
    keywords: ['JDBC', 'Java Database Connectivity', 'driver', 'Type 1', 'Type 2', 'Type 3', 'Type 4', 'JDBC-ODBC', 'native', 'thin driver', 'architecture', 'DriverManager', 'Connection', 'database', 'SQL', 'MySQL', 'Oracle'],
    content: `## 🗄️ JDBC Architecture & Drivers

### 📖 Story Time: The Restaurant Ordering System 🍽️

Imagine you're at a restaurant. You want to order food (data). Here's how it works:

1. **You** (Java program) want food (data) from the kitchen (database)
2. **The Waiter** (JDBC Driver) takes your order to the kitchen
3. **The Kitchen** (Database — MySQL, Oracle, etc.) prepares the food
4. **The Waiter** brings the food (result) back to you

**Without a waiter**, you'd have to go to the kitchen yourself, learn how each kitchen works, and it would be different for every restaurant! 😰

**JDBC is the standardized waiter system** — a set of rules that every waiter (driver) follows, so YOU (the programmer) always order the same way, regardless of which kitchen (database) is being used!

---

### 🔷 What is JDBC?

**JDBC = Java Database Connectivity**

It's a **Java API** (set of classes and interfaces) that allows Java programs to:
- ✅ **Connect** to any database (MySQL, Oracle, PostgreSQL, SQL Server...)
- ✅ **Send SQL queries** (SELECT, INSERT, UPDATE, DELETE)
- ✅ **Get results** back from the database
- ✅ **Handle errors** that occur during database operations

**Think of JDBC as a universal remote control** 📱 — the same buttons work for every TV brand! Similarly, the same JDBC code works for every database brand.

\`\`\`
┌───────────────────────────────────────────────────────┐
│                    YOUR JAVA PROGRAM                   │
│                                                        │
│   Connection conn = DriverManager.getConnection(...)   │
│   Statement stmt = conn.createStatement();             │
│   ResultSet rs = stmt.executeQuery("SELECT * FROM.."); │
│                                                        │
└──────────────────────┬────────────────────────────────┘
                       │
            ┌──────────▼──────────┐
            │    JDBC API         │  ← Standard Java interfaces
            │  (java.sql package) │     (Connection, Statement,
            │                     │      ResultSet, etc.)
            └──────────┬──────────┘
                       │
            ┌──────────▼──────────┐
            │    JDBC DRIVER      │  ← Specific to each database
            │  (provided by DB    │     (MySQL driver, Oracle driver...)
            │   vendor)           │
            └──────────┬──────────┘
                       │
            ┌──────────▼──────────┐
            │     DATABASE        │  ← MySQL, Oracle, PostgreSQL, etc.
            │  ┌────────────────┐ │
            │  │ Tables & Data  │ │
            │  └────────────────┘ │
            └─────────────────────┘
\`\`\`

---

### 🔷 JDBC Architecture — Two-Tier & Three-Tier

#### Two-Tier Architecture (Direct Connection)
\`\`\`
┌──────────────┐         ┌──────────────┐
│ Java Program │ ◄──────►│   Database   │
│  (Client)    │  JDBC    │   (Server)   │
└──────────────┘  Driver  └──────────────┘

Your program talks DIRECTLY to the database.
Like calling the pizza shop directly! 📞🍕
\`\`\`

#### Three-Tier Architecture (Through a Middle Layer)
\`\`\`
┌──────────────┐     ┌───────────────┐     ┌──────────────┐
│ Java Program │ ──► │  Application  │ ──► │   Database   │
│  (Client)    │     │   Server      │     │   (Server)   │
│              │     │  (Middle Tier)│     │              │
└──────────────┘     └───────────────┘     └──────────────┘

Your program talks to a server, which talks to the database.
Like ordering through a food delivery app! 📱→🛵→🍕
\`\`\`

---

### 🔷 JDBC Drivers — The 4 Types

Drivers are the **translators** between your Java code and the specific database. There are 4 types:

#### Type 1: JDBC-ODBC Bridge Driver
\`\`\`
Java Program → JDBC API → ODBC Driver → Database
\`\`\`
- Uses an older technology called ODBC as a bridge
- **Analogy:** Like using Google Translate to talk to someone — translating Java → ODBC → Database language. Two translations = slow! 🐌
- ❌ Slow, not portable, requires ODBC setup on every machine
- ❌ **Removed in Java 8** — don't use it!

#### Type 2: Native API Driver (Partly Java)
\`\`\`
Java Program → JDBC API → Native Database Library → Database
\`\`\`
- Uses the database vendor's native C/C++ libraries
- **Analogy:** Like hiring a local guide who speaks both your language and the local language 🧑‍🤝‍🧑
- ⚠️ Faster than Type 1, but requires native library installation on each machine
- ⚠️ Not fully portable (depends on OS)

#### Type 3: Network Protocol Driver (All Java, uses middleware)
\`\`\`
Java Program → JDBC API → Middleware Server → Database
\`\`\`
- A fully Java driver that talks to a middleware server, which then talks to the database
- **Analogy:** Like ordering through a call center 📞 — they handle all the details
- ✅ No native libraries needed on client
- ⚠️ Requires middleware server setup

#### Type 4: Thin Driver (Pure Java — BEST!) ⭐
\`\`\`
Java Program → JDBC API → Database (direct!)
\`\`\`
- **100% Java**, talks directly to the database using its network protocol
- **Analogy:** Like speaking the restaurant's language fluently — no translator needed! 🗣️
- ✅ Fastest performance
- ✅ No extra installation needed
- ✅ Platform independent (pure Java!)
- ✅ **THIS IS THE ONE EVERYONE USES TODAY!** ⭐

---

### 📊 Driver Comparison Table:

| Feature | Type 1 | Type 2 | Type 3 | Type 4 ⭐ |
|---------|--------|--------|--------|----------|
| **Name** | JDBC-ODBC Bridge | Native API | Network Protocol | Thin Driver |
| **Written in** | Java + ODBC | Java + Native C | All Java | **All Java** |
| **Speed** | Slowest 🐌 | Medium | Medium | **Fastest** 🚀 |
| **Portable?** | ❌ No | ❌ No | ✅ Yes | **✅ Yes** |
| **Installation** | ODBC on each PC | Native lib on each PC | Middleware server | **Nothing extra!** |
| **Used today?** | ❌ Removed | Rarely | Sometimes | **YES! Always** ⭐ |

**For exams, remember:** Type 4 (Thin Driver) is the best and most commonly used!

---

### 🔷 Key JDBC Interfaces & Classes

All are in the \`java.sql\` package:

| Interface/Class | Purpose | Analogy |
|----------------|---------|---------|
| **DriverManager** | Manages database drivers | Phone book 📒 (finds the right driver) |
| **Connection** | Active connection to database | Phone call 📞 (open line to database) |
| **Statement** | Sends SQL queries to database | Your voice 🗣️ (sending the message) |
| **PreparedStatement** | Pre-compiled SQL (faster, safer!) | Written letter 📝 (pre-formatted) |
| **ResultSet** | Holds query results | The answer/response 📋 |
| **SQLException** | Database error handling | Error beep ⚠️ |

### 🧪 Practice Questions
1. What is JDBC? What does it stand for?
2. Name the 4 types of JDBC drivers with a one-line description of each.
3. Which driver type is the most commonly used and why?
4. What is the difference between Two-Tier and Three-Tier architecture?
5. Name 4 important JDBC interfaces.
6. What package contains all JDBC classes?
7. Why is Type 4 driver called "Thin Driver"?
8. What is the role of DriverManager?

💡 **Key Takeaway:** JDBC = Java's way to talk to databases. It uses drivers (4 types) — Type 4 (Thin Driver, pure Java) is the BEST and most used. Key interfaces: DriverManager, Connection, Statement, PreparedStatement, ResultSet. All in \`java.sql\` package.`,
    commonQuestions: [
      {
        patterns: ['jdbc', 'what is jdbc', 'jdbc architecture', 'jdbc driver', 'types of driver', 'type 1 type 2 type 3 type 4', 'thin driver', 'jdbc-odbc'],
        answer: `## 🗄️ JDBC Architecture & Drivers — Complete Explanation!

### What is JDBC?
**JDBC = Java Database Connectivity** — a Java API that lets your program talk to ANY database (MySQL, Oracle, PostgreSQL).

**Think of it like a universal remote** 📱 — same code works for every database!

### Architecture:
\`\`\`
Java Program → JDBC API → JDBC Driver → Database
   (You)      (Rules)    (Translator)   (Kitchen)
\`\`\`

### 4 Types of JDBC Drivers:

| Type | Name | How It Works | Status |
|------|------|-------------|--------|
| **Type 1** | JDBC-ODBC Bridge | Java → ODBC → Database (2 translations!) | ❌ Removed in Java 8 |
| **Type 2** | Native API | Java → C/C++ native lib → Database | ⚠️ Rarely used |
| **Type 3** | Network Protocol | Java → Middleware → Database | ⚠️ Sometimes used |
| **Type 4** | **Thin Driver** ⭐ | Java → Database (DIRECT!) | ✅ **Best! Always use!** |

### Why Type 4 is the Best:
- ✅ 100% Pure Java (platform independent)
- ✅ Fastest performance (no middleman!)
- ✅ No extra installation needed
- ✅ Direct database communication

### Key JDBC Interfaces (all in java.sql):
| Interface | Purpose |
|-----------|---------|
| **DriverManager** | Finds & loads the right driver |
| **Connection** | Active link to database |
| **Statement** | Sends SQL queries |
| **PreparedStatement** | Pre-compiled SQL (faster & safer!) |
| **ResultSet** | Holds query results |

💡 **For exams:** Type 4 (Thin Driver) = Pure Java, Fastest, Most Used!`
      }
    ]
  },
  {
    topicId: 'u5t2',
    title: 'Database Connection Steps',
    keywords: ['connection', 'connect', 'DriverManager', 'getConnection', 'URL', 'JDBC URL', 'Class.forName', 'register driver', 'load driver', 'close connection', 'connection string', 'MySQL connection', 'Oracle connection'],
    content: `## 🔌 Database Connection Steps

### 📖 Story Time: Making a Phone Call 📞

Connecting to a database is like making a phone call:

1. 📱 **Pick up the phone** → Load the JDBC driver
2. 📞 **Dial the number** → Provide the database URL, username, password
3. 🔗 **Call connects!** → Connection object is created
4. 🗣️ **Talk** → Send SQL queries
5. 👋 **Hang up** → Close the connection

Let's learn each step in detail!

---

### 🔷 The 7 Steps of JDBC

\`\`\`
Step 1: Import the JDBC package
          │
Step 2: Load/Register the JDBC driver
          │
Step 3: Establish the connection
          │
Step 4: Create a Statement object
          │
Step 5: Execute the SQL query
          │
Step 6: Process the results
          │
Step 7: Close the connection
\`\`\`

---

### 🔷 Step-by-Step Code with Detailed Explanation

\`\`\`java
// ═══════════════════════════════════════════════════════
// STEP 1: Import the JDBC package
// ═══════════════════════════════════════════════════════
// This package contains ALL JDBC classes and interfaces
// (Connection, Statement, ResultSet, DriverManager, etc.)
import java.sql.*;

public class DatabaseDemo {
    public static void main(String[] args) {
        
        // Declare variables outside try block so we can close them in finally
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;
        
        try {
            // ═══════════════════════════════════════════════
            // STEP 2: Load/Register the JDBC Driver
            // ═══════════════════════════════════════════════
            // This tells Java WHICH driver to use
            // Think of it as: "I want to call a MySQL phone"
            
            // For MySQL:
            Class.forName("com.mysql.cj.jdbc.Driver");
            
            // For Oracle:
            // Class.forName("oracle.jdbc.driver.OracleDriver");
            
            // For PostgreSQL:
            // Class.forName("org.postgresql.Driver");
            
            System.out.println("✅ Driver loaded successfully!");
            
            
            // ═══════════════════════════════════════════════
            // STEP 3: Establish the Connection
            // ═══════════════════════════════════════════════
            // Think of it as: "Dialing the number and connecting"
            // URL format: jdbc:mysql://hostname:port/databaseName
            
            String url = "jdbc:mysql://localhost:3306/schoolDB";
            //            ^^^^  ^^^^^  ^^^^^^^^^  ^^^^  ^^^^^^^^
            //          protocol sub   hostname   port  database
            //                  protocol                name
            
            String username = "root";
            String password = "mypassword";
            
            conn = DriverManager.getConnection(url, username, password);
            //     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
            //     DriverManager finds the right driver and creates
            //     a Connection object — your "phone line" to the database!
            
            System.out.println("✅ Connected to database!");
            
            
            // ═══════════════════════════════════════════════
            // STEP 4: Create a Statement Object
            // ═══════════════════════════════════════════════
            // Statement = your "voice" to send SQL commands
            
            stmt = conn.createStatement();
            System.out.println("✅ Statement created!");
            
            
            // ═══════════════════════════════════════════════
            // STEP 5: Execute the SQL Query
            // ═══════════════════════════════════════════════
            // executeQuery()  → for SELECT (returns ResultSet)
            // executeUpdate() → for INSERT, UPDATE, DELETE (returns int)
            
            String sql = "SELECT id, name, marks FROM students";
            rs = stmt.executeQuery(sql);
            System.out.println("✅ Query executed!");
            
            
            // ═══════════════════════════════════════════════
            // STEP 6: Process the Results
            // ═══════════════════════════════════════════════
            // ResultSet is like a table — use next() to move row by row
            
            System.out.println("\\n📋 Student Records:");
            System.out.println("─────────────────────────────────");
            System.out.printf("%-5s %-15s %-10s%n", "ID", "Name", "Marks");
            System.out.println("─────────────────────────────────");
            
            while (rs.next()) {
                // rs.next() moves to the next row
                // Returns false when no more rows
                
                int id = rs.getInt("id");           // Get integer column
                String name = rs.getString("name"); // Get string column
                double marks = rs.getDouble("marks"); // Get double column
                
                System.out.printf("%-5d %-15s %-10.1f%n", id, name, marks);
            }
            System.out.println("─────────────────────────────────");
            
        } catch (ClassNotFoundException e) {
            // Driver class not found — JAR file missing?
            System.out.println("❌ Driver not found! Add the JDBC JAR file.");
            e.printStackTrace();
            
        } catch (SQLException e) {
            // Database error — wrong URL, credentials, SQL syntax?
            System.out.println("❌ Database error: " + e.getMessage());
            System.out.println("   SQL State: " + e.getSQLState());
            System.out.println("   Error Code: " + e.getErrorCode());
            e.printStackTrace();
            
        } finally {
            // ═══════════════════════════════════════════════
            // STEP 7: Close the Connection (ALWAYS do this!)
            // ═══════════════════════════════════════════════
            // Close in reverse order: ResultSet → Statement → Connection
            // Think of it as: "Hang up the phone when done!"
            
            try {
                if (rs != null) rs.close();
                if (stmt != null) stmt.close();
                if (conn != null) conn.close();
                System.out.println("\\n✅ All connections closed!");
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
\`\`\`

---

### 🔷 Modern Way: try-with-resources (Auto-close!)

\`\`\`java
import java.sql.*;

public class ModernJDBC {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/schoolDB";
        String user = "root";
        String pass = "password";
        
        // try-with-resources — auto-closes everything! ✨
        try (
            Connection conn = DriverManager.getConnection(url, user, pass);
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM students")
        ) {
            while (rs.next()) {
                System.out.println(rs.getString("name") + " - " + rs.getInt("marks"));
            }
        } catch (SQLException e) {
            System.out.println("Error: " + e.getMessage());
        }
        // No need for finally block — everything auto-closes! 🎉
    }
}
\`\`\`

---

### 🔷 JDBC URL Formats for Different Databases:

| Database | JDBC URL Format | Driver Class |
|----------|----------------|-------------|
| **MySQL** | \`jdbc:mysql://host:3306/dbname\` | \`com.mysql.cj.jdbc.Driver\` |
| **Oracle** | \`jdbc:oracle:thin:@host:1521:dbname\` | \`oracle.jdbc.driver.OracleDriver\` |
| **PostgreSQL** | \`jdbc:postgresql://host:5432/dbname\` | \`org.postgresql.Driver\` |
| **SQL Server** | \`jdbc:sqlserver://host:1433;databaseName=db\` | \`com.microsoft.sqlserver.jdbc.SQLServerDriver\` |

### 📊 7 Steps Summary:

| Step | What | Code | Analogy |
|------|------|------|---------|
| 1 | Import package | \`import java.sql.*;\` | Get the phone 📱 |
| 2 | Load driver | \`Class.forName("...")\` | Find the right phone type |
| 3 | Connect | \`DriverManager.getConnection()\` | Dial the number 📞 |
| 4 | Create statement | \`conn.createStatement()\` | Clear your throat 🗣️ |
| 5 | Execute query | \`stmt.executeQuery(sql)\` | Ask your question |
| 6 | Process results | \`rs.next()\`, \`rs.getString()\` | Listen to the answer 👂 |
| 7 | Close connection | \`conn.close()\` | Hang up the phone 👋 |

### 🧪 Practice Questions
1. List the 7 steps of JDBC in order.
2. What does \`Class.forName()\` do?
3. What is the JDBC URL format for MySQL?
4. What is the difference between \`executeQuery()\` and \`executeUpdate()\`?
5. Why should we always close the connection?
6. What is \`DriverManager.getConnection()\` used for?
7. Write the JDBC URL for connecting to a database named "college" on localhost port 3306.
8. What happens if you don't close the connection?

💡 **Key Takeaway:** 7 steps: Import → Load Driver → Connect → Create Statement → Execute Query → Process Results → Close. Always close connections! Use try-with-resources for auto-closing. executeQuery() for SELECT, executeUpdate() for INSERT/UPDATE/DELETE.`,
    commonQuestions: [
      {
        patterns: ['connect to database', 'jdbc connection', 'steps of jdbc', 'database connection', 'DriverManager', 'getConnection', 'how to connect', 'jdbc steps', 'jdbc url'],
        answer: `## 🔌 JDBC Connection — 7 Steps with Full Explanation!

### The 7 Steps (like making a phone call 📞):

\`\`\`java
// Step 1: Import
import java.sql.*;

// Step 2: Load driver (find the right phone)
Class.forName("com.mysql.cj.jdbc.Driver");

// Step 3: Connect (dial the number!)
Connection conn = DriverManager.getConnection(
    "jdbc:mysql://localhost:3306/myDB", "root", "password"
);
//  jdbc:mysql://hostname:port/databaseName

// Step 4: Create statement (your voice)
Statement stmt = conn.createStatement();

// Step 5: Execute query (ask the question)
ResultSet rs = stmt.executeQuery("SELECT * FROM students");

// Step 6: Process results (hear the answer)
while (rs.next()) {
    String name = rs.getString("name");
    int marks = rs.getInt("marks");
    System.out.println(name + ": " + marks);
}

// Step 7: Close everything (hang up!)
rs.close();
stmt.close();
conn.close();
\`\`\`

### Key Methods:
| Method | Used For |
|--------|----------|
| \`executeQuery(sql)\` | SELECT queries (returns ResultSet) |
| \`executeUpdate(sql)\` | INSERT, UPDATE, DELETE (returns row count) |

### JDBC URLs:
| Database | URL |
|----------|-----|
| MySQL | \`jdbc:mysql://localhost:3306/dbname\` |
| Oracle | \`jdbc:oracle:thin:@localhost:1521:dbname\` |

💡 **Always close connections!** Use try-with-resources for auto-close.`
      }
    ]
  },
  {
    topicId: 'u5t3',
    title: 'Statement vs PreparedStatement',
    keywords: ['Statement', 'PreparedStatement', 'CallableStatement', 'SQL injection', 'parameter', 'placeholder', 'question mark', 'precompiled', 'batch', 'performance', 'security'],
    content: `## 📝 Statement vs PreparedStatement

### 📖 Story Time: Ordering Food Two Ways 🍔

**Way 1 (Statement) — Telling the waiter every detail, every time:**
- "I want a cheese burger with lettuce and tomato"
- Next time: "I want a chicken burger with lettuce and tomato"
- Next time: "I want a veggie burger with lettuce and tomato"
- The waiter has to understand the FULL sentence every single time! 😓

**Way 2 (PreparedStatement) — Using a pre-printed order form:**
- Order form: "I want a _____ burger with lettuce and tomato"
- Just fill in the blank: "cheese" ✅, "chicken" ✅, "veggie" ✅
- The waiter already understands the form — just reads the blank! 🚀

**PreparedStatement is WAY faster and safer!**

---

### 🔷 Statement (Basic — use for simple, one-time queries)

\`\`\`java
Statement stmt = conn.createStatement();

// SELECT — Reading data
ResultSet rs = stmt.executeQuery("SELECT * FROM students WHERE marks > 80");

// INSERT — Adding data
int rows = stmt.executeUpdate(
    "INSERT INTO students (name, marks) VALUES ('Rahul', 95)"
);
System.out.println(rows + " row(s) inserted! ✅");

// UPDATE — Modifying data  
int updated = stmt.executeUpdate(
    "UPDATE students SET marks = 100 WHERE name = 'Rahul'"
);

// DELETE — Removing data
int deleted = stmt.executeUpdate(
    "DELETE FROM students WHERE marks < 40"
);
\`\`\`

#### ⚠️ The BIG PROBLEM with Statement — SQL Injection!

\`\`\`java
// User enters their name in a text field:
String userInput = "Rahul";  // Normal input — works fine ✅

// But what if a HACKER enters this?
String hackerInput = "'; DROP TABLE students; --";  // EVIL INPUT! 😈

// Your SQL becomes:
String sql = "SELECT * FROM students WHERE name = '" + hackerInput + "'";
// Result: SELECT * FROM students WHERE name = ''; DROP TABLE students; --'
// THIS DELETES YOUR ENTIRE TABLE! 💀💀💀

// This is called SQL INJECTION — one of the most dangerous attacks!
\`\`\`

**Think of SQL Injection like:** Someone writing on your order form: "Cancel all orders and fire the chef!" 😱 — because you let them write anything!

---

### 🔷 PreparedStatement (RECOMMENDED! ⭐ — Safe, Fast, Clean)

PreparedStatement uses **placeholders (?)** instead of string concatenation. The database pre-compiles the SQL template, and you just fill in the values.

\`\`\`java
// ═══════════════════════════════════════════════════════
// INSERTING DATA — Safe from SQL Injection! ✅
// ═══════════════════════════════════════════════════════
String sql = "INSERT INTO students (name, age, marks) VALUES (?, ?, ?)";
//                                                           ↑  ↑  ↑
//                                                     placeholder #1, #2, #3

PreparedStatement pstmt = conn.prepareStatement(sql);

// Set values for each placeholder (index starts at 1, NOT 0!)
pstmt.setString(1, "Rahul");     // ? #1 → "Rahul" (String)
pstmt.setInt(2, 20);             // ? #2 → 20 (int)
pstmt.setDouble(3, 95.5);       // ? #3 → 95.5 (double)

int rows = pstmt.executeUpdate();
System.out.println(rows + " row inserted! ✅");

// Insert another student — just change the values!
pstmt.setString(1, "Priya");    // Reuse the same PreparedStatement!
pstmt.setInt(2, 19);
pstmt.setDouble(3, 88.0);
pstmt.executeUpdate();

// Even if hacker enters "'; DROP TABLE --", it's treated as plain TEXT
// PreparedStatement says: "Nice try, that's just a NAME string" 😎🛡️


// ═══════════════════════════════════════════════════════
// SELECTING DATA with Parameters
// ═══════════════════════════════════════════════════════
String searchSql = "SELECT * FROM students WHERE age > ? AND marks > ?";
PreparedStatement searchStmt = conn.prepareStatement(searchSql);
searchStmt.setInt(1, 18);        // age > 18
searchStmt.setDouble(2, 75.0);  // marks > 75

ResultSet rs = searchStmt.executeQuery();
while (rs.next()) {
    System.out.println(rs.getString("name") + " - " + rs.getDouble("marks"));
}


// ═══════════════════════════════════════════════════════
// UPDATING DATA
// ═══════════════════════════════════════════════════════
String updateSql = "UPDATE students SET marks = ? WHERE name = ?";
PreparedStatement updateStmt = conn.prepareStatement(updateSql);
updateStmt.setDouble(1, 100.0);   // New marks
updateStmt.setString(2, "Rahul"); // Where name is Rahul
updateStmt.executeUpdate();


// ═══════════════════════════════════════════════════════
// DELETING DATA
// ═══════════════════════════════════════════════════════
String deleteSql = "DELETE FROM students WHERE id = ?";
PreparedStatement deleteStmt = conn.prepareStatement(deleteSql);
deleteStmt.setInt(1, 5);   // Delete student with id 5
deleteStmt.executeUpdate();
\`\`\`

---

### 🔷 Batch Processing (Insert Many Rows at Once!)

\`\`\`java
String sql = "INSERT INTO students (name, marks) VALUES (?, ?)";
PreparedStatement pstmt = conn.prepareStatement(sql);

// Add multiple rows to the batch
String[] names = {"Alice", "Bob", "Charlie", "Diana"};
int[] marks = {85, 92, 78, 95};

for (int i = 0; i < names.length; i++) {
    pstmt.setString(1, names[i]);
    pstmt.setInt(2, marks[i]);
    pstmt.addBatch();       // Add to batch (not executed yet!)
}

int[] results = pstmt.executeBatch();  // Execute ALL at once! 🚀
System.out.println(results.length + " rows inserted in one go! ✅");
\`\`\`

---

### 🔷 CallableStatement (For Stored Procedures)

\`\`\`java
// Calling a database stored procedure
CallableStatement cs = conn.prepareCall("{call getStudentMarks(?, ?)}");
cs.setInt(1, 101);                      // Input parameter
cs.registerOutParameter(2, Types.DOUBLE); // Output parameter
cs.execute();
double marks = cs.getDouble(2);          // Get the output
\`\`\`

---

### 📊 Statement vs PreparedStatement vs CallableStatement:

| Feature | Statement | PreparedStatement ⭐ | CallableStatement |
|---------|-----------|---------------------|-------------------|
| **SQL Type** | Static SQL | Parameterized SQL (?) | Stored procedures |
| **Compiled** | Every time | Once (pre-compiled) | Once |
| **Speed** | Slow 🐌 | **Fast** 🚀 | Fast |
| **SQL Injection** | ❌ Vulnerable! | **✅ Protected!** | ✅ Protected |
| **Parameters** | String concatenation | ? placeholders | IN/OUT params |
| **Reusable** | No | **Yes** (just change ?) | Yes |
| **Use for** | Simple one-time queries | **Everything!** ⭐ | DB procedures |

### 🧪 Practice Questions
1. What is SQL Injection? How does PreparedStatement prevent it?
2. What is the difference between Statement and PreparedStatement?
3. What does the ? symbol represent in PreparedStatement?
4. Do PreparedStatement parameter indexes start at 0 or 1?
5. What is batch processing in JDBC?
6. When would you use CallableStatement?
7. Write PreparedStatement code to insert a student record.
8. Why is PreparedStatement faster than Statement?

💡 **Key Takeaway:** ALWAYS use PreparedStatement (never Statement for user input!). It prevents SQL injection, runs faster (pre-compiled), and is cleaner. Use ? as placeholders, set values with setString/setInt/setDouble. Index starts at 1!`,
    commonQuestions: [
      {
        patterns: ['Statement', 'PreparedStatement', 'statement vs prepared', 'sql injection', 'CallableStatement', 'which statement', 'placeholder', 'batch'],
        answer: `## 📝 Statement vs PreparedStatement!

### Statement (basic, unsafe):
\`\`\`java
Statement stmt = conn.createStatement();
stmt.executeQuery("SELECT * FROM users WHERE name = '" + input + "'");
// ⚠️ DANGER: SQL Injection possible!
\`\`\`

### PreparedStatement (ALWAYS USE THIS! ⭐):
\`\`\`java
PreparedStatement ps = conn.prepareStatement(
    "SELECT * FROM users WHERE name = ? AND age > ?"
);
ps.setString(1, name);    // ? #1 (index starts at 1!)
ps.setInt(2, 18);          // ? #2
ResultSet rs = ps.executeQuery();
\`\`\`

### Why PreparedStatement is Better:
| Statement | PreparedStatement |
|-----------|-------------------|
| Compiled every time 🐌 | Compiled once 🚀 |
| SQL Injection risk ❌ | **Safe from injection** ✅ |
| String concatenation | ? placeholders |
| Not reusable | Reusable ♻️ |

### Batch (insert many at once):
\`\`\`java
ps.setString(1, "Alice"); ps.addBatch();
ps.setString(1, "Bob"); ps.addBatch();
ps.executeBatch();  // All at once! 🚀
\`\`\`

💡 **Golden Rule:** NEVER use Statement with user input. ALWAYS use PreparedStatement!`
      }
    ]
  },
  {
    topicId: 'u5t4',
    title: 'SQL Queries with JDBC',
    keywords: ['SQL', 'SELECT', 'INSERT', 'UPDATE', 'DELETE', 'CREATE TABLE', 'DROP', 'WHERE', 'ORDER BY', 'GROUP BY', 'JOIN', 'LIKE', 'aggregate', 'COUNT', 'SUM', 'AVG', 'MAX', 'MIN', 'DDL', 'DML'],
    content: `## 💾 SQL Queries with JDBC

### 📖 Story Time: The Library Card Catalog 📚

Imagine a library with thousands of books. The **card catalog** lets you:
- **Find** books (SELECT)
- **Add** new books (INSERT)
- **Update** book info (UPDATE)
- **Remove** old books (DELETE)
- **Create** new sections (CREATE TABLE)
- **Remove** sections (DROP TABLE)

**SQL (Structured Query Language)** is the language used to talk to databases — like the language of the library card catalog!

---

### 🔷 Two Types of SQL Commands:

#### DDL (Data Definition Language) — Structure of the database
\`\`\`
CREATE TABLE  → Build a new table (create a new bookshelf)
ALTER TABLE   → Modify table structure (add more shelves)
DROP TABLE    → Delete entire table (remove the bookshelf) ⚠️
\`\`\`

#### DML (Data Manipulation Language) — Data inside the tables
\`\`\`
INSERT  → Add new data (add a new book)
SELECT  → Read/find data (search for a book)
UPDATE  → Modify existing data (change book info)
DELETE  → Remove data (remove a book)
\`\`\`

---

### 🔷 CREATE TABLE — Building the Structure

\`\`\`java
String createSQL = "CREATE TABLE students (" +
    "id INT PRIMARY KEY AUTO_INCREMENT, " +   // Auto-numbering ID
    "name VARCHAR(100) NOT NULL, " +           // Name (max 100 chars, required)
    "age INT, " +                               // Age (integer)
    "marks DOUBLE, " +                          // Marks (decimal)
    "grade CHAR(2), " +                         // Grade (2 characters)
    "email VARCHAR(200) UNIQUE, " +            // Email (must be unique)
    "enrollment_date DATE DEFAULT CURRENT_DATE" + // Auto-set today's date
    ")";

Statement stmt = conn.createStatement();
stmt.executeUpdate(createSQL);
System.out.println("✅ Table 'students' created successfully!");
\`\`\`

| SQL Data Type | Java Equivalent | Example |
|--------------|----------------|---------|
| INT | int | \`age INT\` |
| DOUBLE / FLOAT | double / float | \`marks DOUBLE\` |
| VARCHAR(n) | String | \`name VARCHAR(100)\` |
| CHAR(n) | String (fixed length) | \`grade CHAR(2)\` |
| DATE | java.sql.Date | \`dob DATE\` |
| BOOLEAN | boolean | \`active BOOLEAN\` |
| TEXT | String (long text) | \`bio TEXT\` |

---

### 🔷 INSERT — Adding Data

\`\`\`java
// Using PreparedStatement (ALWAYS recommended!)
String insertSQL = "INSERT INTO students (name, age, marks, grade) VALUES (?, ?, ?, ?)";
PreparedStatement pstmt = conn.prepareStatement(insertSQL);

// Student 1
pstmt.setString(1, "Rahul Kumar");
pstmt.setInt(2, 20);
pstmt.setDouble(3, 95.5);
pstmt.setString(4, "A+");
pstmt.executeUpdate();

// Student 2 — reuse the same statement!
pstmt.setString(1, "Priya Sharma");
pstmt.setInt(2, 19);
pstmt.setDouble(3, 88.0);
pstmt.setString(4, "A");
pstmt.executeUpdate();

System.out.println("✅ Students inserted!");
\`\`\`

---

### 🔷 SELECT — Reading Data

\`\`\`java
// Simple SELECT — get all students
ResultSet rs = stmt.executeQuery("SELECT * FROM students");
while (rs.next()) {
    System.out.println(rs.getInt("id") + " | " + 
                       rs.getString("name") + " | " + 
                       rs.getDouble("marks"));
}

// SELECT with WHERE — filter results
rs = stmt.executeQuery("SELECT name, marks FROM students WHERE marks > 80");

// SELECT with ORDER BY — sort results
rs = stmt.executeQuery("SELECT * FROM students ORDER BY marks DESC");
// DESC = highest first, ASC = lowest first (default)

// SELECT with LIKE — pattern matching
rs = stmt.executeQuery("SELECT * FROM students WHERE name LIKE 'R%'");
// R% = starts with R, %kumar% = contains 'kumar', %a = ends with 'a'

// SELECT with aggregate functions
rs = stmt.executeQuery("SELECT COUNT(*) AS total FROM students");
rs.next();
System.out.println("Total students: " + rs.getInt("total"));

rs = stmt.executeQuery("SELECT AVG(marks) AS average, " +
    "MAX(marks) AS highest, MIN(marks) AS lowest FROM students");
rs.next();
System.out.println("Average: " + rs.getDouble("average"));
System.out.println("Highest: " + rs.getDouble("highest"));
System.out.println("Lowest: " + rs.getDouble("lowest"));

// SELECT with GROUP BY
rs = stmt.executeQuery(
    "SELECT grade, COUNT(*) AS count, AVG(marks) AS avg_marks " +
    "FROM students GROUP BY grade ORDER BY avg_marks DESC"
);
while (rs.next()) {
    System.out.println("Grade " + rs.getString("grade") + 
        ": " + rs.getInt("count") + " students, " +
        "avg marks: " + rs.getDouble("avg_marks"));
}
\`\`\`

---

### 🔷 UPDATE — Modifying Data

\`\`\`java
String updateSQL = "UPDATE students SET marks = ?, grade = ? WHERE name = ?";
PreparedStatement pstmt = conn.prepareStatement(updateSQL);
pstmt.setDouble(1, 100.0);
pstmt.setString(2, "A+");
pstmt.setString(3, "Rahul Kumar");

int rowsUpdated = pstmt.executeUpdate();
System.out.println(rowsUpdated + " row(s) updated! ✅");
\`\`\`

---

### 🔷 DELETE — Removing Data

\`\`\`java
// Delete specific record
String deleteSQL = "DELETE FROM students WHERE id = ?";
PreparedStatement pstmt = conn.prepareStatement(deleteSQL);
pstmt.setInt(1, 5);

int rowsDeleted = pstmt.executeUpdate();
System.out.println(rowsDeleted + " row(s) deleted! 🗑️");

// ⚠️ DANGER: Delete ALL records (no WHERE clause!)
// stmt.executeUpdate("DELETE FROM students");  // DELETES EVERYTHING! 😱
\`\`\`

---

### 📊 Method Selection Guide:

| SQL Type | JDBC Method | Returns |
|----------|------------|---------|
| SELECT | \`executeQuery()\` | ResultSet (rows of data) |
| INSERT | \`executeUpdate()\` | int (number of rows inserted) |
| UPDATE | \`executeUpdate()\` | int (number of rows updated) |
| DELETE | \`executeUpdate()\` | int (number of rows deleted) |
| CREATE/DROP | \`executeUpdate()\` | 0 (no rows affected) |
| Any SQL | \`execute()\` | boolean (true = ResultSet, false = update count) |

### 🧪 Practice Questions
1. What is the difference between DDL and DML?
2. Write a SQL query to find all students with marks above 90.
3. What aggregate functions are available in SQL?
4. What does LIKE 'R%' mean in SQL?
5. What method do you use for SELECT queries? For INSERT?
6. What does ORDER BY DESC mean?
7. Write JDBC code to update a student's marks.
8. Why should you always use WHERE with DELETE?

💡 **Key Takeaway:** SQL has DDL (structure) and DML (data). Use executeQuery() for SELECT, executeUpdate() for INSERT/UPDATE/DELETE. Always use PreparedStatement with user input. NEVER forget WHERE in UPDATE/DELETE (or you'll affect ALL rows!).`,
    commonQuestions: [
      {
        patterns: ['sql query', 'SELECT', 'INSERT', 'UPDATE', 'DELETE', 'sql commands', 'DDL', 'DML', 'create table', 'aggregate', 'WHERE', 'ORDER BY'],
        answer: `## 💾 SQL Queries with JDBC!

### CRUD Operations:
\`\`\`java
// CREATE (Insert)
pstmt = conn.prepareStatement("INSERT INTO students (name, marks) VALUES (?, ?)");
pstmt.setString(1, "Rahul");
pstmt.setDouble(2, 95.5);
pstmt.executeUpdate();

// READ (Select)
ResultSet rs = stmt.executeQuery("SELECT * FROM students WHERE marks > 80 ORDER BY marks DESC");
while (rs.next()) {
    System.out.println(rs.getString("name") + ": " + rs.getDouble("marks"));
}

// UPDATE
pstmt = conn.prepareStatement("UPDATE students SET marks = ? WHERE name = ?");
pstmt.setDouble(1, 100);
pstmt.setString(2, "Rahul");
pstmt.executeUpdate();

// DELETE
pstmt = conn.prepareStatement("DELETE FROM students WHERE id = ?");
pstmt.setInt(1, 5);
pstmt.executeUpdate();
\`\`\`

### Aggregate Functions:
\`\`\`sql
SELECT COUNT(*), AVG(marks), MAX(marks), MIN(marks), SUM(marks)
FROM students
GROUP BY grade
ORDER BY AVG(marks) DESC
\`\`\`

### Method Guide:
| SQL | Method | Returns |
|-----|--------|---------|
| SELECT | executeQuery() | ResultSet |
| INSERT/UPDATE/DELETE | executeUpdate() | int (row count) |

💡 **executeQuery()** for SELECT, **executeUpdate()** for everything else!`
      }
    ]
  },
  {
    topicId: 'u5t5',
    title: 'ResultSet & Metadata',
    keywords: ['ResultSet', 'ResultSetMetaData', 'DatabaseMetaData', 'cursor', 'next', 'getInt', 'getString', 'getDouble', 'scrollable', 'updatable', 'column count', 'column name', 'metadata'],
    content: `## 📋 ResultSet & Metadata

### 📖 Story Time: Reading an Answer Sheet 📝

When the teacher gives you back your test paper, you read it line by line:
- Line 1: Rahul, 95 marks
- Line 2: Priya, 88 marks  
- Line 3: Amit, 76 marks

A **ResultSet** is exactly like that answer sheet — you read it **row by row** using a cursor (pointer)!

**Metadata** is like the information ABOUT the test paper — how many questions were there? What subjects? What's the maximum mark? Metadata = "data about data."

---

### 🔷 ResultSet — Your Query Results

#### How ResultSet Works — The Cursor 📍

\`\`\`
                 ┌─────────────────────────────────────┐
                 │          ResultSet                    │
                 ├──────┬───────────┬──────┬────────────┤
                 │  id  │   name    │ age  │   marks    │
Cursor starts    ├──────┼───────────┼──────┼────────────┤
BEFORE first  →  │      │           │      │            │  ← Before First Row
row               ├──────┼───────────┼──────┼────────────┤
rs.next() →      │  1   │  Rahul    │  20  │   95.5     │  ← Row 1
                 ├──────┼───────────┼──────┼────────────┤
rs.next() →      │  2   │  Priya    │  19  │   88.0     │  ← Row 2
                 ├──────┼───────────┼──────┼────────────┤
rs.next() →      │  3   │  Amit     │  21  │   76.5     │  ← Row 3
                 ├──────┼───────────┼──────┼────────────┤
rs.next() →      │      │           │      │            │  ← After Last Row
returns false!   └──────┴───────────┴──────┴────────────┘
\`\`\`

#### Reading Data from ResultSet:

\`\`\`java
String sql = "SELECT id, name, age, marks FROM students";
ResultSet rs = stmt.executeQuery(sql);

// rs.next() moves the cursor to the next row
// Returns TRUE if there's a row, FALSE if no more rows
while (rs.next()) {
    // Get values by COLUMN NAME (recommended! ✅)
    int id = rs.getInt("id");
    String name = rs.getString("name");
    int age = rs.getInt("age");
    double marks = rs.getDouble("marks");
    
    // OR get by COLUMN INDEX (1-based!)
    // int id = rs.getInt(1);       // Column 1
    // String name = rs.getString(2); // Column 2
    
    System.out.printf("ID: %d, Name: %s, Age: %d, Marks: %.1f%n",
                      id, name, age, marks);
}
\`\`\`

#### ResultSet getter Methods:

| Method | Returns | For SQL Type |
|--------|---------|-------------|
| \`getInt("col")\` | int | INT, INTEGER |
| \`getLong("col")\` | long | BIGINT |
| \`getDouble("col")\` | double | DOUBLE, FLOAT |
| \`getFloat("col")\` | float | FLOAT |
| \`getString("col")\` | String | VARCHAR, CHAR, TEXT |
| \`getBoolean("col")\` | boolean | BOOLEAN, BIT |
| \`getDate("col")\` | java.sql.Date | DATE |
| \`getTimestamp("col")\` | Timestamp | TIMESTAMP, DATETIME |
| \`getObject("col")\` | Object | Any type |

---

### 🔷 Scrollable ResultSet (Move Forward AND Backward!)

By default, ResultSet only moves **forward** (like a book). But you can make it **scrollable** (like a PDF — jump to any page)!

\`\`\`java
// Create a SCROLLABLE ResultSet
Statement stmt = conn.createStatement(
    ResultSet.TYPE_SCROLL_INSENSITIVE,  // Can scroll!
    ResultSet.CONCUR_READ_ONLY           // Read-only
);

ResultSet rs = stmt.executeQuery("SELECT * FROM students");

// Navigate in any direction!
rs.next();          // Move forward
rs.previous();      // Move backward
rs.first();         // Jump to first row
rs.last();          // Jump to last row
rs.absolute(3);     // Jump to row 3 directly!
rs.relative(-2);    // Move 2 rows backward from current
rs.beforeFirst();   // Back to before first row
rs.afterLast();     // After last row

// Check position
rs.isFirst();       // Am I at the first row?
rs.isLast();        // Am I at the last row?
rs.getRow();        // What row number am I at?
\`\`\`

---

### 🔷 ResultSetMetaData — Information About the Results

**"How many columns are there? What are their names and types?"**

\`\`\`java
ResultSet rs = stmt.executeQuery("SELECT * FROM students");

// Get metadata (info ABOUT the result)
ResultSetMetaData rsmd = rs.getMetaData();

// How many columns?
int columnCount = rsmd.getColumnCount();
System.out.println("Number of columns: " + columnCount);

// Print column details
System.out.println("\\n📊 Table Structure:");
System.out.println("─────────────────────────────────────────");
System.out.printf("%-5s %-15s %-15s %-10s%n", "#", "Name", "Type", "Nullable");
System.out.println("─────────────────────────────────────────");

for (int i = 1; i <= columnCount; i++) {
    String colName = rsmd.getColumnName(i);          // Column name
    String colType = rsmd.getColumnTypeName(i);      // Data type
    int nullable = rsmd.isNullable(i);                // Can be null?
    String nullStr = (nullable == ResultSetMetaData.columnNullable) ? "Yes" : "No";
    
    System.out.printf("%-5d %-15s %-15s %-10s%n", i, colName, colType, nullStr);
}
\`\`\`

**Output example:**
\`\`\`
📊 Table Structure:
─────────────────────────────────────────
#     Name            Type            Nullable  
─────────────────────────────────────────
1     id              INT             No        
2     name            VARCHAR         No        
3     age             INT             Yes       
4     marks           DOUBLE          Yes       
\`\`\`

#### Useful ResultSetMetaData Methods:

| Method | Returns | Purpose |
|--------|---------|---------|
| \`getColumnCount()\` | int | How many columns? |
| \`getColumnName(i)\` | String | What's column i's name? |
| \`getColumnTypeName(i)\` | String | What data type is column i? |
| \`getColumnDisplaySize(i)\` | int | How wide is column i? |
| \`isNullable(i)\` | int | Can column i be null? |
| \`isAutoIncrement(i)\` | boolean | Is column i auto-increment? |
| \`getTableName(i)\` | String | Which table does column i belong to? |

---

### 🔷 DatabaseMetaData — Information About the Database Itself

\`\`\`java
DatabaseMetaData dbmd = conn.getMetaData();

System.out.println("Database: " + dbmd.getDatabaseProductName());
System.out.println("Version: " + dbmd.getDatabaseProductVersion());
System.out.println("Driver: " + dbmd.getDriverName());
System.out.println("URL: " + dbmd.getURL());
System.out.println("User: " + dbmd.getUserName());
System.out.println("Max connections: " + dbmd.getMaxConnections());

// List all tables in the database
ResultSet tables = dbmd.getTables(null, null, "%", new String[]{"TABLE"});
System.out.println("\\nTables in database:");
while (tables.next()) {
    System.out.println("  📁 " + tables.getString("TABLE_NAME"));
}
\`\`\`

---

### 📊 ResultSet Types Summary:

| Feature | Forward-Only (default) | Scrollable |
|---------|----------------------|------------|
| Direction | Forward only → | Forward ↔ Backward |
| Jump to row | ❌ No | ✅ \`absolute(n)\` |
| Performance | Faster | Slightly slower |
| Creation | \`createStatement()\` | \`createStatement(TYPE_SCROLL_INSENSITIVE, ...)\` |

### 🧪 Practice Questions
1. How does the ResultSet cursor work?
2. What does \`rs.next()\` return when there are no more rows?
3. Do ResultSet column indices start at 0 or 1?
4. What is ResultSetMetaData used for?
5. How do you get the number of columns in a ResultSet?
6. What is the difference between scrollable and forward-only ResultSet?
7. Name 3 methods of DatabaseMetaData.
8. What is the difference between \`getInt("name")\` and \`getInt(1)\`?

💡 **Key Takeaway:** ResultSet = query results, read row-by-row with \`next()\`. Use getter methods (getInt, getString, getDouble) by column name (recommended) or index (starts at 1!). ResultSetMetaData gives info about columns. DatabaseMetaData gives info about the database itself. Use scrollable ResultSet only when you need to move backward.`,
    commonQuestions: [
      {
        patterns: ['ResultSet', 'result set', 'cursor', 'metadata', 'ResultSetMetaData', 'DatabaseMetaData', 'getInt getString', 'read result', 'scrollable'],
        answer: `## 📋 ResultSet & Metadata — Complete Guide!

### Reading ResultSet (row by row):
\`\`\`java
ResultSet rs = stmt.executeQuery("SELECT * FROM students");

while (rs.next()) {  // Move cursor to next row (false = no more)
    int id = rs.getInt("id");          // By name ✅ (recommended)
    String name = rs.getString("name");
    double marks = rs.getDouble("marks");
    // OR by index: rs.getInt(1)       // Index starts at 1!
}
\`\`\`

### Scrollable ResultSet (move any direction):
\`\`\`java
Statement stmt = conn.createStatement(
    ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
rs.first();        // Jump to first
rs.last();         // Jump to last
rs.absolute(3);    // Jump to row 3
rs.previous();     // Go back one
\`\`\`

### ResultSetMetaData (info about columns):
\`\`\`java
ResultSetMetaData rsmd = rs.getMetaData();
rsmd.getColumnCount();       // How many columns?
rsmd.getColumnName(1);       // Column 1's name
rsmd.getColumnTypeName(1);   // Column 1's type
\`\`\`

### DatabaseMetaData (info about database):
\`\`\`java
DatabaseMetaData dbmd = conn.getMetaData();
dbmd.getDatabaseProductName();  // "MySQL"
dbmd.getDriverName();           // Driver info
\`\`\`

💡 Column indexes start at **1**, not 0! Use column **names** for clarity.`
      }
    ]
  }
];

export default unit5Knowledge;
